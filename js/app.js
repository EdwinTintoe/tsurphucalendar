// --- Load cached data from localStorage ---
const cached = localStorage.getItem('calendar');
let database = databaseDefault;
let astro = astroDefault;
let astroData = astroDataDefault;
let specials = specialsDefault;
let cachedVersion = 0;

if (cached) {
  try {
    const cachedData = JSON.parse(cached);
    database = cachedData.database || databaseDefault;
    astro = cachedData.astro || astroDefault;
    astroData = cachedData.astroData || astroDataDefault;
    specials = cachedData.specials || specialsDefault;
    cachedVersion = cachedData.version || 0;
  } catch(e) {
    console.warn('Cached JSON parse failed, using defaults');
  }
}
// --- Helper to fetch JSON with cache-busting ---
async function fetchJSON(url) {
  try {
    const res = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
    return await res.json();
  } catch (err) {
    // If network fails, try service worker cache
    const cache = await caches.open("tsurphucalendar-data-v1");
    const cachedRes = await cache.match(url);
    if (cachedRes) return await cachedRes.json();
    throw err;
  }
}

// --- Fetch remote JSON files asynchronously in background ---
async function updateFromWeb() {
  const urls = [
    "/data/database.json",
    "/data/astro.json",
    "/data/astroData.json",
    "/data/specials.json"
  ];

  try {
    const [db, a, aData, sp] = await Promise.all(urls.map(fetchJSON));
    const remoteVersion = db.version || 0;

    if (remoteVersion > cachedVersion) {
      database = db.data || db || database;
      astro = a.data || a || astro;
      astroData = aData.data || aData || astroData;
      specials = sp.data || sp || specials;

      // Update localStorage with version
      localStorage.setItem('calendar', JSON.stringify({
        database,
        astro,
        astroData,
        specials,
        version: remoteVersion
      }));
      console.log(`Updated remote data (version ${remoteVersion})`);
    } else {
      console.log(`Remote version (${remoteVersion}) not newer than cached (${cachedVersion})`);
    }
  } catch (err) {
    console.warn('Remote fetch failed, keeping cached/local version', err);
  }
}

// --- Call background updater ---
updateFromWeb();// Initialize App with parameters

var $ = Dom7;
// /////////////////////////////////////////////make sure to review initialization and translating functions, when called,
var device = Framework7.getDevice();
var app = new Framework7({
  name: 'Tsurphu Calendar', // App name
  theme: 'ios', // Automatic theme detection
  colors: {
    primary: '#fff1e7',
    // f9ecd9
    red: '#570011',
    green: '#2e8160',
    yellow: '#eaceb4',
    blue: '#4185d9'
    // #eeaf5f
    // red: '#570011#5a1f2b' primary: '#f9f0ea',green: '#2e8160'
  },
  el: '#app', // App root element
  store: store,
  // App routes
  routes: routes
    ,
  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  mdTouchRipple: false,
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
    resize: function () {
    }
  },
});

// this proved to be needed for dealing with accordion within swiper with autoheight. triggers resize of the swiper to allow scrolling on collapsed items larger than original height
$(document).on('accordion:opened', '.specials-item', function(){
  monthSwiper.updateAutoHeight(50)
})

  app.on('accordionOpened', (el) => {
    if ($(el).is('.astro-item')){
      scrollToAstroContent(el)
      daySwiper.updateAutoHeight(50)
    }
  })

$(document).on('accordion:beforeopen', '.astro-item', function(){
  const activeSlide = $('.swiper-slide-active')
  if (activeSlide.find('.astro-item').is('.astro-empty')){
    getAstroDetail(activeSlide)
  }
})
$(document).on('click', '.astro-wrapper', function(e){
  const clicked = $(e.target)
  const thisAstro = clicked.parents('.astro-item')
  if (!(thisAstro.hasClass('accordion-item-opened'))){
    app.accordion.open(thisAstro)
  }
  else if (clicked.is('.influence')){
    const clickedName = clicked.data('influenceName') 
    const astroID = astro.find(function(item){
      return (item.enName === clickedName)
    }).astroID
    const matchedID = clicked.parents('.astro').find(`.${astroID}`)
    let headerItem
    if ($(matchedID).is('.astro-header')){
      headerItem = matchedID
    }
    else{
      headerItem = matchedID.find('.astro-header')
    }
    const textItem = headerItem.next('.astro-text')
    const offset = $(headerItem).offset().top;
    const Height = 0.2 * app.height
    const scrollTop = $(clicked).parents('.page-content').scrollTop();
    setTimeout(() => {
      $(clicked).parents('.page-content').scrollTop((offset - Height + scrollTop));
      setTimeout(() => {
        $(headerItem).css('color', 'var(--f7-color-yellow)')
        $(textItem).css('color', 'var(--f7-color-yellow)')
        setTimeout(() => {
          $(headerItem).css('color', 'var(--f7-color-red)')
          $(textItem).css('color', '#210a0a')
        }, 1500);
      }, 600);
    }, 500);      
    }
    
})
let eLordClickTracker = null
//////////////////////  Localization funcitons ///////////////////////////

// get language = from local storage (choice), or if language set in device exists as a key in locales.js, or English as default
window.language = (localStorage.getItem('language') || (window.navigator.language || 'en'))
// function to feed a variable or string into as parameter to produce translation based on locales.js object.replace (/-/g, "_");

function localize(key) {
  var language = window.language
  // this is to sort out formatting of language code
  language = language.replace(/-/g, "_");
  // if language is not present as key in window.locales object , try first two letters of the code, eg en_US or en_UK would both reduce to 'en'
  if(!window.locales[language] && language.length > 2)
      language = language?.substring(0, 2);
  // if no match, revert to english default
  if(!window.locales[language])
      language = 'en'
  // if key is present in locales, return localized, else return original = input parameter
  return window.locales[language][key] ? window.locales[language][key] : key
}
// initialize main view
var mainView = app.views.create($('.view-main'), {
  name: 'main-view',
  main: true,
  iosSwipeBack: false,
  on: {
    init: function(){
      $('.arrow-back').hide()
    }
  }
})

function showMoon(){
  if($('#day-wrapper').children('.swiper-slide-active').find('.s27').length > 0){
    $('.karmapa-moon').css('opacity', 0.7)
  }
  setTimeout(() => {
    if ($('.page-current').is('#day-page')){
      $('.flag').transform(`translate(0, 74px)`)
      setTimeout(() => {
        $('.moon').transform(`translate(0, 0px)`)
      }, 1000);
      setTimeout(() => {
        $('.flag-bg').css('opacity', 0)
        $('.clouds-fm2').css('opacity', 0)
      }, 1500);

    }
  }, 1000);
 
}
function showFlag(){
  if($('#day-wrapper').children('.swiper-slide-active').find('.s27').length > 0){
    $('.karmapa-moon').css('opacity', 0)
  }
  setTimeout(() => {
    if ($('.page-current').is('#month-page')){
      $('.moon').transform(`translate(0, 80px)`)
      setTimeout(() => {
        $('.flag').transform(`translate(0, -74px)`)
      }, 1000);
      setTimeout(() => {
        $('.flag-bg').css('opacity', 1)
        $('.clouds-fm2').css('opacity', 1)
      }, 1500);
    }
  }, 1000);
  
}

// initialize day Swiper with defined parameters
function localizeUI(){
  $('#day-toolbar').text(localize('toolbarDay'))
  $('#month-toolbar').text(localize('toolbarMonth'))
  $('#language-toolbar').text(localize('toolbarLanguage'))
  $('.select-language-header').text(localize('Select language'));
  $('.main-title').text(localize('Tsurphu Calendar'));
  $('.panel-title').text(localize('Tsurphu Calendar'));
  populatePanel()
  populateTibetanYear()
}
// Call Localize User Interface at startup (otherwise via select-language buttons)


function getTibetanYear(){
  let tibYear
  let pageActive = $('.page-current').data('name') || 'day'
  switch (pageActive) {
    case 'day':
      // this could be done via tracking specID "s1" (losar) in database, but for the few years at hand, we'll just manually input range
      let thisID = $('.day-swiper').find('.swiper-slide-active').attr('id') || todayID
      if (0 < thisID && thisID < 100){
        tibYear = 'ty2151'
      }
      else if(99 < thisID && thisID < 454){
        tibYear = 'ty2152'
      }
      else if(453 < thisID && thisID < 808){
        tibYear = 'ty2153'
      }
      break;
      
      case 'month':
        let monthID = $('.month-swiper').find('.swiper-slide-active').data('mID')
        if(0 < monthID && monthID < 4){
          tibYear = 'ty2151'
        }
        else if (3 < monthID && monthID < 16){
          tibYear = 'ty2152'
        }
        else if (15 < monthID && monthID < 28){
          tibYear = 'ty2153'
        }
      break;
  }
  return tibYear
}
function populateTibetanYear(){
  let tibetanYear = getTibetanYear()
  $('.tibetan-year').text(localize(tibetanYear))
}
app.on('panelBreakpoint', function(){
  $('.main-title').hide()
  if ($('.panel').is('.panel-in-breakpoint')){
    $('.main-title').hide()
    $('.wrapper').removeClass('paused') 
  }
  else {
    $('.main-title').show()
    $('.wrapper').addClass('paused')
  }
})
app.on('panelOpened', function(){
  $('.main-title').hide()
  $('.panel-arrow-back').hide()
  
})
app.on('panelOpen', function(){
  $('.wrapper').removeClass('paused')
})
app.on('panelClose', function(){
  $('.main-title').show()
  
  $('.wrapper').addClass('paused')
})
$('#marquee').on('click', function(){
  $('.wrapper').toggleClass('paused')
})

// localizing year by splitting into integers, localizing and joining back (use where applicable)
function localizeYear(yearString){
  let yearSplit = yearString.split('')
  let localizedYear = ''
  for (let i = 0; i < yearSplit.length; i++){
    localizedYear = localizedYear.concat(localize(yearSplit[i]))
  }
  return localizedYear
}

const fullMoonArr = database.filter(function(item){
  return(Object.keys(item).includes('reg') && item.reg.split(', ').includes('fm'))
}).map(item => item = item.id)
fullMoonArr.unshift('-4')
const monthStr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tibMonthStr = ['Magha', 'Phalguna', 'Caitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashvina', 'Ksrttika', 'Margashrisha', 'Pausha'];
// get today's database object to use in calendar functions
const todayDateObj = new Date();
const today = database.find(function (item) {
  return (
    item.year == todayDateObj.getFullYear() &&
    item.month == monthStr[todayDateObj.getMonth()] &&
    item.date == todayDateObj.getDate()
  )
})
const databaseLength = database.length
//set initial ID (used to either get current day slide on init or specific day slide as picked from monthly calendar)
const todayID = today.id
let initialID = todayID;
// variables helping with navigation between month and day and general variables
let newID = initialID
let newBackToday = 0
// an array containing all tib month IDs and max value
const monthIDArr = database.filter((item) => item.monthID).map(item => item.monthID)
const maxID = monthIDArr.reduce(function(prev, current) {
  return (prev && prev.y > current.y) ? prev : current
})
// constants related to day database
const weekdaysString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const regulars = ['mb', 'dk', 'gr', 'fm', 'dp', 'nm', 'so14', 'so15', 'so88']
const eLord = ['baden', 'lu', 'yen', 'zha', 'nyin', 'ul']


// day Swiper parameters object
// swiper exists with 30 slides in dom to start. Slides are created when beginning and end is reached. Swiper is recreated when navigated to from monthly calendar page or when navigating to today from far removed days.
// this should keep the app fresh and avoid having to process too many slides (365 x years in database) with generating and translating functions.

const daySettings = {
  // transition speed
  speed: 300,
  spaceBetween: 100,
  // initial slide corresponds with template structure
  initialSlide: 3,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  observer: false,
  // this should prohibit accidental multiple swipes on last slides messing with slide generating functions
  allowTouchMove: false,
  preventInteractionOnTransition: false,
  followFinger: false,
  autoHeight: true,
    on: {
      // function called when swiper is initialized. Initially only x slides exist, the middle one is in view and all are populated by calling template $(.slide-template), assigning ids to slides, and filling them with database objects
      init: function(){
        // floating action button gets its shape based on whether user is viewing today or not
        
        makeSlides()
        localizeUI()
        setTimeout(() => {
          app.emit('moonChangeEvent')
        }, 100);
      },
      afterInit: function(){
        sortFAB()
        touchSlideDay()
        
      },
      transitionEnd: 
      function () {
        if (stopTransitionEndEvent === 0){
        const newSlide = '<div class="swiper-slide new-slide"></div>'
        const threeNewSlides = ['<div class="swiper-slide new-slide"></div>', '<div class="swiper-slide new-slide"></div>', '<div class="swiper-slide new-slide"></div>']
        $('#day-page').children('.main-page').addClass('smooth-scrolling')
        app.emit('moonChangeEvent')
        populateTibetanYear()
        sortFAB();  
        // create 10 slides when last existing slide is reached either side. Made to avoid manually defining 100s of slides in index.html. Framework7 events reachEnd and reachBeginning did not produce desired result, therefore event is triggered on each slide transition end, but function only called on last slides.
        if (this.isBeginning) {
          let firstID = $('.day-swiper').find('.swiper-slide').eq(0).attr('id')
          if (firstID > 3) {
            daySwiper.prependSlide(threeNewSlides)
          }
          else if ( 1 < firstID && firstID <=3) {
            let xNewSlides = []
            for (let i = 0; i < firstID - 1; i++) {
              xNewSlides.push(newSlide)
            }
            daySwiper.prependSlide(xNewSlides)
          }
          makeSlides()
        }
        else if (this.isEnd) {
          let lastID = $('.day-swiper').find('.swiper-slide').eq(-1).attr('id')
          if ((databaseLength - lastID) > 3){
            daySwiper.appendSlide(threeNewSlides)
          }
          else if ((database.length - lastID) <= 3){
            let xNewSlides = []
            for (let i = 0; i < (database.length - lastID) - 1; i++){
              xNewSlides.push(newSlide)
            }
            daySwiper.appendSlide(xNewSlides)
          }
        makeSlides();
        }
        // else {
        //   stopTransitionEndEvent = 0
        // }
      }
      },
      slideChange: 
        function() {
        $('#day-page').children('.main-page').removeClass('smooth-scrolling')
        $('.main-page').scrollTop(0)
        eLordClickTracker = null
        app.fab.close($('.fab-today'))
      },
    },
  }
  
  var daySwiper = new Swiper('.day-swiper', daySettings)
  

// ////////// Slide creating functions /////////////////////

// function to give ID to slides based on their position relative to initial slide (of which we know the properties). Called when slides are created
// and used to link calendar database data with a given slide
function labelSlides(){
  let initialIndex = $('#day-wrapper').children('.initial-slide').index()
  $('#day-wrapper').children().each(function (item, index){
    if ($(item).attr('id') === null) {
    let targetID = initialID - (initialIndex - index);
    $(item).attr('id', targetID)}
  })
}

// get day object from database based on element id. To be used for day data.
function getDayObject (element) {
  const elementID = element.attr('id')
  return database[elementID]
}

function makeSlides (){
  // stamp slides with IDs
  labelSlides();
  // structure them from a template
  $('#day-wrapper').children('.swiper-slide.new-slide').each(function () {
   $(this).html(daySlideTemplate);
  // pair them with day object from database as data, so that we can use it in future
  $(this).data('detail', getDayObject($(this)))
  // fill them with content
  getDaySpecials($(this))
  populateSlide($(this), $(this).data('detail'))
  getAstroArray($(this))
  getAstroFullText($(this));
  // remove new-slide class to assure we only do this with new slides
  $(this).removeClass('new-slide');
  findTodaySlide();
})
}

// function to populate a slide with content from day object based on language
function populateSlide(slide, object){
  const lang = window.language?.slice(0,2)
  const tMonth = object.tMonth;
  const tDay = object.tDay;
  const weekDay = object.day;
  const westDate = object.date;
  const westMonth = object.month;
  const tMonthLocal = localize(tMonth);
  const tDayLocal = localize(tDay);
  const weekDayLocal = localize(weekDay);
  const westDateLocal = localize(westDate);
  const westMonthLocal = localize(westMonth);
  const Month = localize('Month');
  const Day = localize('Day');
  switch (lang) {
    case 'bo':
      // preffered format is different than English
      slide.find('.day-card-main-date').addClass('reverse-format')
      slide.find('.tMonth').text(Month + tMonthLocal);
      slide.find('.tDay').text(Day + tDayLocal);
      slide.find('.day').text(weekDayLocal);
      slide.find('.date').text(westMonthLocal + '། ' + Day + westDateLocal);
      break;
      
    default:
      slide.find('.day-card-main-date').removeClass('reverse-format')
      slide.find('.tMonth').text(`Month ${tMonth}`);
      slide.find('.tDay').text(`Day ${tDay}`);
      slide.find('.day').text(weekDay);
      slide.find('.date').text(westDate + ' ' + westMonth);
      break;
  }
  $('.astrology-header').text(localize('Astrology'))
}

// function to obtain and display special days. 
function getDaySpecials(slide){
  let dayObject = $(slide).data('detail')
  // check if a day has anniversaries(special), moon days (regulars), or baden/luthep (eLord), make an array out of them
  let compiledSpecials = []
  if (Object.keys(dayObject).includes('reg')) {
    const individualEntries = dayObject.reg.split(', ')
    individualEntries.forEach((regular) => {
      compiledSpecials.push(regular)
    })
  }
  if (Object.keys(dayObject).includes('specID')) {
    const individualEntries = dayObject.specID.split(', ')
    individualEntries.forEach((special) => {
      compiledSpecials.push(special)
    })
  }
  if (Object.keys(dayObject).includes('eLord')) {
    const individualEntries = dayObject.eLord.split(', ')
    individualEntries.forEach((eLord) => {
      compiledSpecials.push(eLord)
    })
  }
$(slide).data('compiledSpecials', compiledSpecials)
structureDaySpecials(slide, compiledSpecials)

}

function structureDaySpecials(slide, compiledSpecials) {
  // const compiledSpecials = $(slide).data('compiledSpecials') || null
  if (compiledSpecials !== null){
    compiledSpecials.forEach((specialID)=>{
      const thisSpecialObject = specials.find(item => item.specID == specialID)
      if (regulars.includes(specialID.toString())){
        $(slide).find('.top-icons').prepend(`<div class="reg-icon"><img id="${specialID}" onerror='this.style.display = "none"' src="./assets/${thisSpecialObject.img}" height="40px"></div>`)
        $('.reg-icon').off('click').on('click', function(e){
          showToast(e)
        })
      }
      else if (eLord.includes(specialID)){
        if (specialID === 'baden' || specialID === 'lu'){
          $(slide).find('.bottom-icons').append(`<div class="e-lord-icon"><img onclick=showELord() onerror='this.style.display = "none"' src="./assets/${specialID}.svg" height="42px"></div>`)
        }
        else if (specialID === 'zha' || specialID === 'yen' || specialID === 'ul' || specialID === 'nyin'){
          $(slide).find('.bottom-icons').append(`<div class="e-lord-icon warning"><img onclick=showELord() onerror='this.style.display = "none"' src="./assets/warning.svg" height="42px"></div>`)
        }
      }
      else {
        const specialCardTemplate = `<div class="specials-card wheel-bg content-card ${specialID}">
        <div class="specials-card-header margin-left margin-right margin-top-half text-align-center no-padding-left"></div>
        <div class="specials-card-content">
        </div>
        </div>`
        $(slide).find('.specials').append(specialCardTemplate)
        if (Object.keys(thisSpecialObject).includes('img')){
          $(slide).find(`.${specialID}`).find('.specials-card-content').prepend(`<img onerror='this.style.display = "none"' src="./assets/specials/${thisSpecialObject.img}">`)
        }
        if (hasSpecialText(thisSpecialObject)){
          $(slide).find(`.${specialID}`).find('.specials-card-content').append(`<div class="specials-card-text"></div>`)
        }
        if (specialID === 's2'){
          $(slide).find(`.${specialID}`).addClass('nine-bad-omens')
        }
      }
      const lang = window.language?.slice(0,2)
      $(slide).find(`.${specialID}`).find('.specials-card-header').text(thisSpecialObject[`${lang}Name`])
      $(slide).find(`.${specialID}`).find('.specials-card-text').text(thisSpecialObject[`${lang}Text`])
    })
  }
}

function populateDaySpecials(slide){
  const lang = window.language?.slice(0,2)
  const compiledSpecials = $(slide).data('compiledSpecials') || null
  if (compiledSpecials !== null){
    compiledSpecials.forEach(function(specialID) {
    const thisSpecialObject = specials.find(function(item){
      return item.specID == specialID
    })
    $(slide).find(`.${specialID}`).find('.specials-card-header').text(thisSpecialObject[`${lang}Name`])
    $(slide).find(`.${specialID}`).find('.specials-card-text').text(thisSpecialObject[`${lang}Text`])  
  });
}
}

function showToast(e) {
  let clickedIcon = $(e.target)
  if (clickedIcon.is('.reg-icon')){
    clickedIcon = clickedIcon.children('img')
  }
  const specID = clickedIcon.attr('id')
  const specObj = specials.find(function(item){
    return (item.specID == specID)
  })
  const lang = language.slice(0,2)
  const text = specObj[`${lang}Name`]
  const toast = app.toast.create({
    text: text,
    closeTimeout: 2000,
    destroyOnClose: true,
    containerEl: '.view-main',
    position: 'center',
  });
  toast.open();
}


// changing language in UI
$('.language-icon').on('click', function () {
  app.popover.open
  })
  
$('.select-language-btn').on('click', function(e){
  if (e.target.id !== window.language){
    app.preloader.show('green')
    localStorage.setItem('language', e.target.id);
    window.language = e.target.id;
    app.popover.close()
    setTimeout(translateAll, 1)
  }
})
var monthTranslationPending = 0
function translateAll(){
  localizeUI();
  $('#day-wrapper').children().each(function() {          
    populateSlide($(this), getDayObject($(this)));
    populateDaySpecials($(this))
    populateAstroFullText($(this))
    if (!$(this).find('.astro-item').is('.astro-empty')){
      populateAstroDetail($(this))
    }
  })
  if ($('.page-current').is('#day-page')){
    monthTranslationPending = 1
    daySwiper.updateAutoHeight()
  }
  else if ($('.page-current').is('#month-page')){
    $('#month-wrapper').children().each(function(){
      populateMonth($(this))
    })
    monthSwiper.updateAutoHeight()
  }
  app.preloader.hide()
}
// function to populate panel
function populatePanel(){
  $('.panel-toolbar').text(localize('KSL'))
  $('.about-text').text(localize('about-text'))
  $('.semchen').html(localize('semchen'))
}

// Fab - floating action button
// find if today's slide exists (relevant when navigating from month calendar), if so, label it, return it, if not, return null.
function findTodaySlide(){
 $('#day-wrapper').children().each(function() {
  if ($(this).attr('id') == todayID) {
    $(this).addClass('today-slide')
  }})
}

// floating action button shows differently on today's slide and others as today does not need goBackToday function
function sortFAB(){
  if ($('.day-swiper').find('.swiper-slide-active').hasClass('today-slide')){
    $('.fab-today').hide()
  }
  else {
    $('.fab-today').show()
  }
}
var stopTransitionEndEvent = 0
// slide back to today's slide. If it doesn't exist (user is browsing somewhere far in calendar), reload page with today as initial slide
function goBackToday() {
  if ($('#day-wrapper').children('.today-slide').length === 0){
    stopTransitionEndEvent = 1
    const firstSlideID = $('#day-wrapper').children().eq(0).attr('id')
    $('#day-wrapper').children('.initial-slide').removeClass('initial-slide')
    initialID = todayID
    $('#day-wrapper').prepend(dayTemplate)
    makeSlides()
    daySwiper.update()
    if (todayID < firstSlideID){
      daySwiper.slideTo(5, 0, false)
    }
    else{
      daySwiper.slideTo(1, 0, false)
    }
    stopTransitionEndEvent = 0
    app.emit('goBackNew')
  }
  const todayIndex = $('.today-slide').index();
  daySwiper.slideTo(todayIndex, 400);
}
app.on('goBackNew', function () {
  setTimeout(() => {
    $('#day-wrapper').children().each(function(){
      let thisSlideID = $(this).attr('id')
      if ((thisSlideID < (todayID - 3)) || (thisSlideID > (todayID + 3))){
        $(this).remove()
      }
    })
    daySwiper.update()
  }, 600); 
})
//////// ////////swiper custom swiping functions //////////////
const swipeThreshold = 100
function touchSlideDay(){
  let touchArrX = []
  let touchArrY = []
  $('.day-swiper').touchmove(function(e){
      touchArrX.push(e.touches[0].clientX)
      touchArrY.push(e.touches[0].clientY)
  })
  $('.day-swiper').touchend(function (e){
    let tHeight = Math.abs(touchArrY[touchArrY.length - 1] - touchArrY[0])
    if (tHeight < 80){
      let tLength = (touchArrX[touchArrX.length - 1] - touchArrX[0])
      if(tLength < -swipeThreshold){
        daySwiper.slideNext()
      }
      else if(tLength > swipeThreshold){
        daySwiper.slidePrev()
      }
    }
    touchArrX = []
    touchArrY = []
  })
}
function touchSlideMonth(){
  let touchArrX = []
  let touchArrY = []
  $('.month-swiper').touchmove(function(e){
      touchArrX.push(e.touches[0].clientX)
      touchArrY.push(e.touches[0].clientY)
  })
  $('.month-swiper').touchend(function (e){
    let tHeight = Math.abs(touchArrY[touchArrY.length - 1] - touchArrY[0])
    if (tHeight < 80){
      let tLength = (touchArrX[touchArrX.length - 1] - touchArrX[0])
      if(tLength < -swipeThreshold){
        monthSwiper.slideNext()
      }
      else if(tLength > swipeThreshold){
        monthSwiper.slidePrev()
      }
    }
    touchArrX = []
    touchArrY = []
  })
}



// when navigating to day swiper page from calendar and chosen day does not exist in current swiper content.
// first clear out and recreate dom elements, then update swiper instance, then refill with content, last check FAB is correct
function remakeDaySwiper(slides, pos) {
  slidesLeft = slides;
  daySwiper.slideTo(3, 0, false)
  $('.day-swiper').find('.swiper-wrapper').empty()
  $('.day-swiper').find('.swiper-wrapper').append(dayTemplate)
  if (slidesLeft < 3){
    position = pos;
    switch (pos) {
      case 'beginning':
        for (let i = 0; i < (3 - slidesLeft); i++) {
          $('.day-swiper').find('.swiper-wrapper').children().eq(0).remove();
        }
        break;
    
      case 'end':
        for (let i = 0; i < (3 - slidesLeft); i++) {
          $('.day-swiper').find('.swiper-wrapper').children().eq(-1).remove();
        }
        break;
    }
  }
  makeSlides()
  daySwiper.update()
  sortFAB()
}

// navigate to day slide by clicking on calendar date. Double conditional deals with nested elements(id sits on day-slot only). newID is fed into routing functions

$(document).on('click', '.month-specials-item-content, .month-regular, .day-slot', function(e){
  newID = parseInt(e.target.title)
  let oneUpNode = e.target.parentNode
  while (Number.isNaN(newID)){
    newID = parseInt(oneUpNode.title)
    oneUpNode = oneUpNode.parentNode
  }
  mainView.router.back()
})

function navBack(){
  mainView.router.back()
}

$('.navigate-month').on('click', function(){
  if ($('.page-current').is('#day-page')){
  $('.day-link').removeClass('back')
  mainView.router.navigate({name: 'month'})
  }
})

// ////////////////////// Monthly calendar ///////////////////////////////

// initialize  month Swiper
var monthSwiper
const monthSettings = {
  speed: 300,
  spaceBetween: 100,
  initialSlide: 1,
  slidesPerView: 1,
  preventInteractionOnTransition: true,
  allowTouchMove: false,
  autoHeight: true,
  on: {
    init: function(){
      touchSlideMonth()
      makeMonths()
      sortMonthFAB()
      populateTibetanYear()
    },
    slideChange: function(){
      $('.main-page').scrollTop(0)
    },
    transitionEnd:
    // same functions as with day swiper - add months 5 at a time as user swipes
      function () {
        
        if (this.isBeginning) {
          let firstID = $('.month-swiper').find('.swiper-slide').eq(0).data('mID')
            if (firstID > 3) {
             for (let i = 0; i < 3; i++){
              monthSwiper.prependSlide(`<div class="swiper-slide new-slide"></div>`);
            }
            makeMonths()
            }
            else if ( 1 < firstID <= 3) {
             for (let i = 0; i < firstID - 1; i++) {
              monthSwiper.prependSlide(`<div class="swiper-slide new-slide"></div>`);
            }
            makeMonths()
            }
            
        }
        else if (this.isEnd) {
          let lastID = parseInt($('.month-swiper').find('.swiper-slide').eq(-1).data('mID'))
            if ((maxID - lastID) > 3){
              for (let i = 0; i < 3; i++) {
                monthSwiper.appendSlide(`<div class="swiper-slide new-slide"></div>`);
            }
            makeMonths()
            }
            else if ((maxID - lastID) <= 3){
              for (let i = 0; i < (maxID - lastID); i++){
                monthSwiper.appendSlide(`<div class="swiper-slide new-slide"></div>`);
              }
              makeMonths()
            }
            
        }
        sortMonthFAB()
        populateTibetanYear()
      },
    
  }
}
$(document).on('click', '.month-navigation-next', function(){
  monthSwiper.slideNext(300)
  })
$(document).on('click', '.month-navigation-prev', function(){
  monthSwiper.slidePrev(300)
  })
// build month calendar (based in tibetan months, with western mapped into them)
// function to help link database to sliding
function findFirstThisMonth() {
  let firstOfMonth = database.filter((item) => {
    // the conditioning below deals with the instance of having two 12th months (eg last two months in this year)
    return item.tMonth === today.tMonth &&
          (0 <= (todayID - item.id) && (todayID - item.id) < 31)
    })
  if (firstOfMonth.length > 1 &&  (todayID - firstOfMonth[0].id) >=29) { 
    return firstOfMonth[1]
  }
  else {
    return firstOfMonth[0]
  }
}

// give months their IDs
function labelMonths (){
  let thisMonthID = findFirstThisMonth().monthID
  let thisMonthIndex = $('.month-swiper').find('.this-month').index()
  $('.month-swiper').find('.swiper-slide').each(function(slide, index) {
    if ($(slide).attr('id') === null){
    let targetID = thisMonthID - (thisMonthIndex - index)
    $(slide).attr('id', `m${targetID}`)
    $(slide).data('mID', targetID)
    }
  })
}

function structureMonth(slide) {
  const mID = $(slide).data('mID')
  // find first day of any given month slide
  const thisMonthDays = database.filter(function(item){
    return (item.monthID == mID)
  })
  // determine length of month (needs to account for last month in database)
  const monthLength = thisMonthDays.length
  const firstTibetanDay = thisMonthDays[0]
  const thisTibetanMonth = firstTibetanDay.tMonth
  // assign tibetan month to slide via data
  $(slide).data('tMonth', thisTibetanMonth)
  // get position of first day (mon - sun)
  const firstDayIndex = weekdaysString.indexOf(firstTibetanDay.day) 
  // add a row if month starts on sunday and is 30 days long
  if (firstDayIndex === 6 && (monthLength > 29)) {
    $(slide).find('.month-card').append('<div class="grid grid-cols-7"><div class="day-slot"><div class="e-slot"></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></div></div><div></div><div></div><div></div><div></div><div></div><div></div>')
    }
  // iterate over the tibetan month and give each day an id and its database object into data 'detail'
  // get data about the months specials and regular special days, store in an array as object, where key is specID and value is database day object (to help when filling data and translating)
  // get info about western months for header and store them in an array
  let spannedWesternMonths = []
  
  let compiledMonthSpecials = []
  const firstDayID = firstTibetanDay.id
  const daySlots = $(slide).find('.day-slot')
  thisMonthDays.forEach(function(dayObject, index){
    
    const thisDayID = firstDayID + index
    const thisDayIndex = firstDayIndex + index
    const thisDaySlot = daySlots.eq(thisDayIndex)
    const thisTibetanDay = dayObject.tDay
    const thisWesternDate = dayObject.date
    const thisDayData = {tDay: thisTibetanDay, date: thisWesternDate}
    thisDaySlot.attr('id', `d${thisDayID}`).attr('title', `${thisDayID}`).data('detail', thisDayData)
    if (thisWesternDate === 1 && index > 0){
      thisDaySlot.addClass('first-west-day')
    }
    if (thisDayID === todayID){
      thisDaySlot.addClass('today-slot')
    }
    const thisDayObjectKeys = Object.keys(dayObject)
    if (thisDayObjectKeys.includes('specID')){
      // display icons in month calendar
      const individualSpecials = dayObject.specID.split(', ')
      thisDaySlot.find('.s-slot').append(`<img onerror='this.style.display = "none"' src="./assets/special.svg" width="20px"/>`)
      individualSpecials.forEach(function(special){
        const thisSpecialDayObject = {[special]: dayObject}
        compiledMonthSpecials.push(thisSpecialDayObject)
      })
    }
    if (thisDayObjectKeys.includes('reg')){
      // save to object for use in month specials list
      const individualRegulars = dayObject.reg.split(', ')
      individualRegulars.forEach(function(regular){
        const thisRegularDayObject = {[regular]: dayObject}
        compiledMonthSpecials.push(thisRegularDayObject)
        switch (regular) {
          case 'fm':
          case 'nm':
            thisDaySlot.find('.r-slot').append(`<img onerror='this.style.display = "none"' src="./assets/${regular}.svg" width="22px"/>`)
            break;
          case 'so14':
          case 'so15':
            break;
          case 'so88':
            thisDaySlot.find('.s-slot').append(`<img onerror='this.style.display = "none"' src="./assets/sojong.svg" width="22px"/>`)
            break;
          default:
            thisDaySlot.find('.r-slot').append(`<img onerror='this.style.display = "none"' src="./assets/${regular}.svg" height="26px"/>`)
            break;
        }
      })
    }
    if (thisDayObjectKeys.includes('eLord') && dayObject.eLord === 'baden'){
          thisDaySlot.find('.s-slot').append(`<img onerror='this.style.display = "none"' src="./assets/baden.svg" width="22px"/>`)
    }
    const westMonthAndYear = `${dayObject.month} ${dayObject.year}`
    if (!spannedWesternMonths.includes(westMonthAndYear)){
      spannedWesternMonths.push(westMonthAndYear)
    }
  })
  // if (Object.keys(dayObj).includes('eLord') && dayObj.eLord.split(', ').includes('baden')){
  //   $(slide).find('.day-slot').eq(firstDayIndex + i).find('.s-slot').append(`<img onerror='this.style.display = "none"' src="./assets/baden.svg" width="22px"/>`)
  // }
  // get info about western months for header and store them in an array
  $(slide).data('spannedWesternMonths', spannedWesternMonths)
  $(slide).data('compiledMonthSpecials', compiledMonthSpecials)
}
// store the arrays in slide data to access during slide populating


// display western months in the month header - translate month and year separately, join and add line break
// need to account for possibility of up to 3 western months in one tibetan
function getWestMonths(slide){
  let westMonthHeader = ''
  let workingArray = ($(slide).data('spannedWesternMonths')).slice(0)
  workingArray.forEach(function(westernMonth){
    const westernMonthSplit = westernMonth.split(' ')
    westernMonthSplit[0] = localize(westernMonthSplit[0])
    westernMonthSplit[1] = localizeYear(westernMonthSplit[1])
    westernMonth = westernMonthSplit.join(' ')
    westMonthHeader = westMonthHeader.concat(westernMonth).concat('</br>')

  })
  $(slide).find('.west-month-header').html(westMonthHeader) 
}

function hasContent(object){
  let result = false
  Object.keys(object).forEach(key => {
    if(key === 'img'){
      result = true
    }
    else if (key.slice(2) == 'Text'){
      result = true
    }
  })
  return result
}
function hasSpecialText(object){
  let result = false
  Object.keys(object).forEach(key => {
    if (key.slice(2) == 'Text'){
      result = true
    }
  })
  return result
}
// make a list of special days for a given month slide = out of array created during month structuring
function getMonthSpecials(slide) {
  let compiledMonthSpecials = $(slide).data('compiledMonthSpecials')
  compiledMonthSpecials.forEach((special, index) => {
    // three types of template for list items
    const itemWithContent = `<li class="accordion-item specials-item special${index}">
        <a class="item-link item-content padding-left-half display-flex">
          <div class="item-inner margin-right-half">
            <div class="item-title">
            <div class=" month-specials-toggle">
              <div class="month-specials-date-slot">
                <div class="month-specials-tDay"></div>
                <div class="month-specials-day"></div>
              </div>
              <div class="month-specials-header"></div>
            </div>
            </div>
          </div>
        </a>
        <div class="accordion-item-content month-specials-item-content">
          <div class="month-specials-content">
          <div class="month-specials-text block"></div>
          </div>
        </div>
        </li>
        `
    const itemNoContent = `<li>
          <a href="#" class="item-link item-content specials-item padding-left-half month-regular special${index}">
            <div class="item-inner margin-right-half">
              <div class="item-title">
              <div class=" month-specials-toggle">
                <div class="month-specials-date-slot">
                  <div class="month-specials-tDay"></div>
                  <div class="month-specials-day"></div>
                </div>
                <div class="month-specials-header"></div>
              </div>
              </div>
            </div>
          </a>
        </li>
        `
    
    // get the specID out of object in array
    let thisSpecialID = Object.keys(special)[0]
    // get the corresponding object
    let thisDayObj = special[thisSpecialID]
    // get the object from specials database
    let itemSpecObj = specials.find((item) => {
      return item.specID == thisSpecialID})
    const isRegular = regulars.includes(thisSpecialID.toString())
    if (!isRegular && hasContent(itemSpecObj)) {
      $(slide).find('ul').append(itemWithContent)
      const thisItem = $(slide).find(`.special${index}`)
        thisItem.find('.month-specials-content').prepend(`<img onerror='this.style.display = "none"' src="./assets/specials/${itemSpecObj.img}"/>`)
        thisItem.find('.month-specials-item-content').attr('title', thisDayObj.id)
        thisItem.data('dayObj', thisDayObj).data('itemSpecObj', itemSpecObj)
    }
    else if (isRegular || !hasContent(itemSpecObj)){
      if (thisSpecialID === 'nm' || thisSpecialID === 'fm'){
        $(slide).find('ul').append(itemNoContent)
        const thisItem = $(slide).find(`.special${index}`)
        thisItem.find('.item-inner').attr('title', thisDayObj.id)
        thisItem.data('dayObj', thisDayObj).data('itemSpecObj', itemSpecObj)
        thisItem.find('.month-specials-header').remove()
        thisItem.find('.month-specials-toggle').append(`<div class="month-specials-header"><div class="month-specials-subheader"></div></div>`)
        thisItem.find('.month-specials-subheader').data('headerObj', itemSpecObj)
      }

      else if (thisSpecialID === 'so14' || thisSpecialID === 'so15'){
        let moonIndex = index - 1
        const thisItem = $(slide).find(`.special${moonIndex}`)
        thisItem.find('.month-specials-header').append(`<div class="month-specials-subheader"></div>`)
        thisItem.find('.month-specials-subheader').eq(1).data('headerObj', itemSpecObj)
      }

      else {
        $(slide).find('ul').append(itemNoContent)
        const thisItem = $(slide).find(`.special${index}`)
        thisItem.find('.item-inner').attr('title', thisDayObj.id)
        thisItem.data('dayObj', thisDayObj).data('itemSpecObj', itemSpecObj)
      }
    }
    
})
}

function populateMonthSpecials(slide, lang){
  $(slide).find('.specials-item').each(function() {
    const itemDayObj = $(this).data('dayObj')
    const itemSpecObj = $(this).data('itemSpecObj')
    const itemTibDay = localize(itemDayObj.tDay)
    const itemDay = localize(itemDayObj.day.slice(0,3))

    $(this).find('.month-specials-tDay').text(itemTibDay)
    $(this).find('.month-specials-day').text(itemDay)
    $(this).find('.month-specials-text').text(itemSpecObj[`${lang}Text`])
    if ($(this).find('.month-specials-header').children('.month-specials-subheader').length > 1){
      $(this).find('.month-specials-subheader').each(function(){
        const headerObj = $(this).data('headerObj')
        $(this).text(headerObj[`${lang}Name`])
      })
    }
    else{
      $(this).find('.month-specials-header').text(itemSpecObj[`${lang}Name`])
    }
    
  })
}

// main function to populate content of a month slide, used to change UI language aswell
function populateMonth(slide){
  // determine language
  let lang = window.language?.slice(0,2)
  // fill in west month slot
  getWestMonths(slide)
  // fill main header slot, taking into account variations in presentation of ordinals
  let tMonthNum = $(slide).data('tMonth')
  let tMonthOrdinal = function(tMonthNum){
    switch (tMonthNum) {
      case 1:
        return '1st';
        break;
      case 2:
        return '2nd';
        break;
      case 3:
        return '3rd';
        break;
      default:
        return `${tMonthNum}th`;
        break;
    }
  }
  // Assign name of month (ed Sagadawa)
  let tMonthName = tibMonthStr[tMonthNum - 1];
  switch (lang) {
    case 'bo':
      $(slide).find('.tib-month-header').text(`བོད་ཟླ་${localize(tMonthOrdinal(tMonthNum))}།`)
      $(slide).find('.tib-month-name').text(localize(tMonthName))
      break;
    default:
      $(slide).find('.tib-month-header').text(`${tMonthOrdinal(tMonthNum)} Month`)
      $(slide).find('.tib-month-name').text(tMonthName)
      break;
  }

  // translation of weekdays should be done in locales.js, as it is easiest to do for 7 day abbreviations
  $(slide).find('.week-day-slot').each(function(){
    let weekDay = weekdaysString[$(this).index()].slice(0,3)
    $(this).text(localize(weekDay))
  })

  // translate day slot numerals
  $(slide).find('.day-slot').each(function() {
    if ($(this).attr('id') === null){
      $(this).removeClass('day-slot').empty()
    }
    else {
      $(this).find('.t-slot').text(localize($(this).data('detail').tDay))
      $(this).find('.w-slot').text(localize($(this).data('detail').date))
    }
  })
  populateMonthSpecials(slide, lang)
}

// master month slide making function, uses the logic of day slide creation, operating with new-slide class to avoid remaking every slide every time
function makeMonths(){
    // stamp month slides with IDs
    labelMonths();
    // structure them
    $('.month-swiper').find('.swiper-slide.new-slide').each(function () {
      if ($(this).children('.main-content').length === 0){
        $(this).html(monthTemplate)
      }
      structureMonth($(this));
      getMonthSpecials($(this))
      // fill them with content
      populateMonth($(this));
      // remove new-slide class to assure we only do this with new slides
      $(this).removeClass('new-slide');
      monthTranslationPending = 0
    })
  }

// function hiding and action button when current month slide is viewed
function sortMonthFAB(){
    if ($('.month-swiper').find('.swiper-slide-active').hasClass('this-month')){
      $('.fab-this-month').hide()
    }
    else {
      $('.fab-this-month').show()
    }
}
  
// slide back to current month
function goBackThisMonth() {
  let thisMonthIndex = $('.this-month').index();
  monthSwiper.slideTo(thisMonthIndex, 400);
}

// //////////////////////////////////  astro //////////////////////////////////////

// function to obtain array of astro items from object saved as data of a slide. this can be changed to obtain array in a more suitable way, eg to accommodate time zone shifts
function getAstroArray(slide){
  // let astroObject = $(slide).data('astro')
  const astroObject = astroData.find((item) => {
    return item.id == $(slide).attr('id')
  })
  const astroArr = Object.values(astroObject).slice(1)
  $(slide).data('astroArray', astroArr)
}
function getAstroFullText(slide){
  const astroArray = $(slide).data('astroArray')
  const astroFull = $(slide).find('.astro-wrapper')
  let line = 1
    astroArray.forEach(function(entry, index){
      const skyDoors = ['Guest', 'Business', 'Baby', 'Battle', 'Relative', 'Castle', 'Bride', 'Funeral', 'Deceased', 'General']
      const splitEntry = entry.split(' ')
      if (skyDoors.includes(splitEntry.toString())){
        astroFull.find(`.lineLast`).append(`<span class="astro-full-item influence ${entry}"></span>`)
        astroFull.find(`.${entry}`).data('influenceName', entry)
      }
      else if (splitEntry.length === 1){
        astroFull.find(`.line${line}`).append(`<span class="astro-full-item influence ${entry}"></span>`)
        astroFull.find(`.${entry}`).data('influenceName', entry)
      }
      else{
        line++
        astroFull.find(`.line${line}`).append(`<span class="astro-full-item time-item ts${index}"></span>`)
        astroFull.find(`.ts${index}`).data('time', entry)
      }
    })
    $(slide).find('.astro-full').each(function(){
    if ($(this).children().length === 0){
      $(this).remove()
    }
  })
  populateAstroFullText(slide)
}
// function to sort and display daily astro influences. Called when astro accordion is to be opened
function getAstroDetail(slide){
  // obtain array of influences (and discard items containing times, which are not relevant for this part)
  // const thisSlide = $('.day-swiper').find('.swiper-slide-active')
  const astroArr = (slide).data('astroArray')
  let infoArr = astroArr.filter(function(item) {
    return (item.split(' ').length < 2)
  })
  // check for eLord and add corresponding full enName to array for details
  if (Object.keys($(slide).data('detail')).includes('eLord')){
    const thisEarthLordArr = $(slide).data('detail').eLord.split(', ')
    thisEarthLordArr.forEach(function(eLord){
      let eLordDetail = astro.find(function(item){
      return (item.group == eLord)
    })
      infoArr.push(eLordDetail.enName)
    })
  }
  // array to track duplicates
  let trackingArray = []
  // iterate over resultant array
  infoArr.forEach((item) => {
    // get the corresponding object with detail about astro influence
    let infoObject = astro.find((entry) => {
      return entry.enName == item
    })
    // sort by category, create entries in appropriate categories to display info
    let astroID = infoObject.astroID
    // check for duplicates (lunar mansions description is common for 4-6 mansions = more complicated conditioning for duplicates)
    if (!(trackingArray.includes(astroID))){
      if (infoObject.category === 'lunar') {
        let groupNum = infoObject.group
        if (trackingArray.includes(groupNum)){
          $(slide).find(`.lunar${groupNum}`).prepend(`<div class="astro-header lunar-header ${astroID}"></div>`)
        }
        else {
          $(slide).find('.lunar').append(`<div class="astro-entry lunar-entry lunar${groupNum}"><div class="astro-header lunar-header ${astroID}"></div><div class="astro-text"></div></div>`)
          $(slide).find(`.lunar${groupNum}`).data('groupInfo', `group${groupNum}`)
        }
        $(slide).find(`.${astroID}`).data('astroInfo', infoObject)

        trackingArray.push(astroID, groupNum)  
      }
      else if (infoObject.category === 'earthLord' && (infoObject.group === 'lu' || infoObject.group === 'baden')){
        $(slide).find('.earthLord').append(`<div class="astro-entry ${astroID}"><div class="astro-header"></div><img onerror='this.style.display = "none"' src="./assets/${infoObject.group}.svg" height="36px"><div class="astro-text"></div></div>`)
        $(slide).find(`.${astroID}`).data('astroInfo', infoObject)
        trackingArray.push(astroID)
      }
      else if (infoObject.category === 'earthLord' && (item === 'Bistii' || item === 'Segtse')){
        $(slide).find('.earthLord').append(`<div class="astro-entry ${astroID}"><div class="astro-header"></div><div class="astro-text"></div></div>`)
        $(slide).find(`.${astroID}`).data('astroInfo', infoObject)
        trackingArray.push(astroID)
      }
      else if (infoObject.category === 'earthLord'){
        $(slide).find('.earthLord').append(`<div class="astro-entry ${astroID}"><div class="astro-header"></div><img onerror='this.style.display = "none"' src="./assets/warning.svg" height="36px" width="36px"><div class="astro-text"></div></div>`)
        $(slide).find(`.${astroID}`).data('astroInfo', infoObject)
        trackingArray.push(astroID)
      }
      else{
        $(slide).find(`.${infoObject.category}`).append(`<div class="astro-entry ${astroID}"><div class="astro-header"></div><div class="astro-text"></div></div>`)
        $(slide).find(`.${astroID}`).data('astroInfo', infoObject)
        trackingArray.push(astroID)
      }
    }
  })
  $(slide).find('.astro-explain').each(function(){
    if ($(this).children().length === 0){
      $(this).hide().prev('.astro-category-header').hide()
    }
  })
  populateAstroDetail(slide)
  $(slide).find('.astro-item').removeClass('astro-empty')
}

function populateAstroFullText(slide){
  const lang = window.language?.slice(0,2);
  $(slide).find('.astro-full-item').each(function(item){

    if($(item).hasClass('time-item')){
      const entry = $(item).data('time')
      let splitTime = entry.split(' ')
      let digits = splitTime[1].split('')
      let localizedTime = digits.map((digit) => localize(digit)).join('')
      let localizedTimeInterval
      switch (lang) {
        case 'bo':
            if (splitTime[0] == 'from'){
              localizedTimeInterval = `ཆུ་ཚོད ${localizedTime} ནས་`
            }
            else if(splitTime[0] == 'till'){
              localizedTimeInterval = `ཆུ་ཚོད ${localizedTime} བར་`
            }
          break;
      
        default:
          localizedTimeInterval = `${entry}`
          break;
      }
      $(item).text(localizedTimeInterval)
    }
    else{
      const entry = $(item).data('influenceName')
      const astroDetail = astro.find(function(object){
        return(object.enName === entry)
      })
      const localizedName = astroDetail[`${lang}Name`]
      $(item).text(localizedName)
    }
  })
}
function populateAstroDetail(slide){
  const lang = window.language?.slice(0,2);
  // populate full text

  // localize headers
  const astroHeaders = ['planets', 'lunar', 'elemental', 'astro28', 'skyDoors', 'earthLord']
  let i = 0
  $(slide).find('.astro-category-header').each(function() {
    if ($(this).next('.astro-explain').children().length > 0){
    $(this).text(localize(astroHeaders[i]))
    }
    i++
  })
  i = 0
  // populate info entries
  $(slide).find('.astro-entry').each(function() {
    if ($(this).hasClass('lunar-entry')){
      const groupName = $(this).data('groupInfo')
      const groupObject = astro.find(function(item){
        return (item.astroID === groupName)
      })
      $(this).find('.astro-text').text(groupObject[`${lang}Text`]) 
      $(this).find('.astro-header').each(function(){
        let thisHeaderObject = $(this).data('astroInfo')
        switch (lang) {
          case 'bo':
            $(this).text(`${thisHeaderObject[`${lang}Name`]}།`)
            break;
        
          default:
            $(this).text(thisHeaderObject[`${lang}Name`])
            break;
        }
        
      })
    }
    else{
      let thisInfoObject = $(this).data('astroInfo')
      switch (lang) {
        case 'bo':
          $(this).find('.astro-header').text(`${thisInfoObject[`${lang}Name`]}།`)
          break;
      
        default:
          $(this).find('.astro-header').text(thisInfoObject[`${lang}Name`])
          break;
      }
      // $(this).find('.astro-header').text(thisInfoObject[`${lang}Name`])
      $(this).find('.astro-text').text(thisInfoObject[`${lang}Text`]) 
    }
  })
}

function showELord(){
  eLordClickTracker = 1
  const thisAstro = $('.day-swiper').find('.swiper-slide-active').find('.astro-item')
  if (thisAstro.is('.accordion-item-opened')){
    scrollToAstroContent($('.accordion-item-opened'))
  }
  else{
    app.accordion.open(thisAstro)
  }
}


function scrollToAstroContent(el){
  if (eLordClickTracker === 1){
    const astroEntries = $(el).find('.astro-entry')
    const lastItem = astroEntries.eq(-1)
    const headerItem = lastItem.children('.astro-header')
    const textItem = lastItem.children('.astro-text')
    setTimeout(() => {
      $('.main-page').scrollTop($('.day-swiper').height())
    }, 200);
    setTimeout(() => {
      $(headerItem).css('color', 'var(--f7-color-yellow)')
      $(textItem).css('color', 'var(--f7-color-yellow)')
      setTimeout(() => {
        $(headerItem).css('color', 'var(--f7-color-red)')
        $(textItem).css('color', '#210a0a')
      }, 1500);
    }, 400);
    eLordClickTracker = 0
  }
  else{
    const openedItem = el;
    const offset = $(openedItem).offset().top;
    const navHeight = 98;
    const scrollTop = $(el).parents('.page-content').scrollTop();
    setTimeout(() => {
      $(el).parents('.page-content').scrollTop((offset - navHeight + scrollTop));
    }, 50);
  }
}

if (app.width > 759){
  $('.main-title').hide()
  $('.wrapper').removeClass('paused')
}
app.on('moonChangeEvent', function() {

  setMoonPhase()
})
function setMoonPhase(){
  let deg = getMoonPhaseRotation()
  const activeSlide = $('.day-swiper').find('.swiper-slide-active')
  
  const pi = Math.PI
  const rad = deg * (pi / 180)
  const adjustOne = (60 - (60 * Math.abs(Math.sin(0.5 * rad))))
  const adjustTwo = (80 - (30 * Math.abs(Math.sin(0.5 * rad))))
  let bgColor = `rgba(0, 0, 0, 0) radial-gradient(var(--f7-color-primary) ${adjustOne}%, #57001165 ${adjustTwo}%, #57001102 100%) repeat scroll 0% 0% / auto padding-box border-box`
  if (activeSlide.find('.s27').length > 0){
    setTimeout(() => {
      $('.clouds-fm').css('opacity', 0)
      $('.sphere').css('opacity', 0)
      $('.karmapa-moon').css('opacity', 0.7)
    }, 2000);
  }
  else{
    $('.karmapa-moon').css('opacity', 0)
    $('.sphere').css('opacity', 1)
  if (activeSlide.find('#nm').length > 0){
    deg = 180
    bgColor = `rgba(0, 0, 0, 0) radial-gradient(rgb(41, 41, 41) 10%, #57001165 60%, #57001102 100%) repeat scroll 0% 0% / auto padding-box border-box`
    $('.clouds-nm').css('opacity', 1)
    setTimeout(() => {
      $('.clouds-fm').css('opacity', 0)
      $('.clouds-m').css('opacity', 0)
    }, 200);
  }
  else if (activeSlide.find('#fm').length > 0){
    $('.clouds-fm').css('opacity', 1)
      deg = 1
    }
  else if(deg < 260 && deg > 100){
    $('.clouds-m').css('opacity', 1)
    setTimeout(() => {
    $('.clouds-fm').css('opacity', 0)
    $('.clouds-nm').css('opacity', 0)
    }, 200);
  }
  else {
    $('.clouds-fm').css('opacity', 1)
    setTimeout(() => {
    $('.clouds-nm').css('opacity', 0)
    $('.clouds-m').css('opacity', 0)
    }, 200);
  }
}
  if ($('.moon-bg').css('opacity') == 1){
    $('.moon-bg2').css('background', bgColor)
    $('.moon-bg2').css('opacity', 1)
    setTimeout(() => {
      $('.moon-bg').css('opacity', 0)
    }, 125);
    
  }
  else {
    $('.moon-bg').css('background', bgColor)
    $('.moon-bg').css('opacity', 1)
    setTimeout(() => {
      $('.moon-bg2').css('opacity', 0)
    }, 125);
  }
  setTimeout(() => {
    $('.divider').transform(`rotate3d(0, 1, 0, ${deg}deg)`)
  }, 200)
  
    if (deg < 180) {
      // Left
      $('.hemisphere').eq(0).removeClass('light')
      $('.hemisphere').eq(0).addClass('dark')
      
      // Right
      $('.hemisphere').eq(1).addClass('light')
      $('.hemisphere').eq(1).removeClass('dark')
    } 
    else {
      // Left
      $('.hemisphere').eq(0).removeClass('dark')
      $('.hemisphere').eq(0).addClass('light')
      
      // Right
      $('.hemisphere').eq(1).addClass('dark')
      $('.hemisphere').eq(1).removeClass('light')
    }
  }
function getMoonPhaseRotation () {
  const currentID = getDayObject($('.swiper-slide-active')).id
  let cycleLength
  let daysSinceLast
  fullMoonArr.forEach(function(itemID, index){
    if (currentID >= itemID && currentID <= fullMoonArr[index + 1]){
      cycleLength = fullMoonArr[index + 1] - itemID
      daysSinceLast = currentID - itemID
    }
  })
  const currentMoonPhasePercentage = daysSinceLast / cycleLength
  return 360 - Math.floor(currentMoonPhasePercentage * 360)
}



// this function can test discrepancies between input data and astro information, to avoid mismatching
function testAstroData(){
let testingArr = []
let correctArr = astro.map((i) => i.enName)
astroData.forEach(function(item) {
  let filteredValues = Object.values(item).filter((value) => {
    return (typeof value !== 'number' && value.split(' ').length < 2)
  })
  filteredValues.forEach((value) => {
    if (!(correctArr.includes(value))){
      testingArr.push(value, item.id)
    }
  })
})
console.log(testingArr)
}
// astroData.forEach((entry)=>{
//   let entryString = Object.values(entry).slice(1).join(' ')
//   $('#tester').append(`<p>${entryString}</p>`)
// })
