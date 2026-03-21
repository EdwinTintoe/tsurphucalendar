
let database = databaseDefault;
let yearsData = yearsDataDefault;
let astro = astroDefault;
let astroData = astroDataDefault;
let specials = specialsDefault;
let locales = localesDefault;
let cachedVersion = '1.0.0';
let activeVersion = cachedVersion;
// Initialize App
var $ = Dom7;
var device = Framework7.getDevice();
var app = new Framework7({
  name: 'Tsurphu Calendar',
  theme: 'ios',
  colors: {
    primary: '#fcf8f5',
    red: '#4d0414',
    green: '#2a7868',
    yellow: '#d4a45c',
    black: '#32000b',
    blue: '#1e5280',
  },
  el: '#app',
  store: store,
  routes: routes,
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: true,
    style: 'white',
  },
  mdTouchRipple: false,
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      if (Framework7.device.android) {
          document.documentElement.style.setProperty('--f7-safe-area-top', '0px');
          document.documentElement.style.setProperty('--f7-safe-area-bottom', '0px');
      }
    },
  },
});

////////////////////// Localization functions ///////////////////////////

// get language = from local storage (choice), or if language set in device exists as a key in locales.js, or English as default
window.language = (localStorage.getItem('language') || 'en_GB')
var daySwiper
const fullMoonArr = database.filter(function(item){
  return(Object.keys(item).includes('reg') && item.reg.split(', ').includes('fm'))
}).map(item => item = item.id)
fullMoonArr.unshift('-4')
const newMoonArr = database.filter(function(item){
  return Object.keys(item).includes('reg') && item.reg.split(', ').includes('nm')
}).map(item => item.id)
const monthStr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tibMonthStr = ['Magha', 'Phalguna', 'Caitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashvina', 'Karttika', 'Margashirsha', 'Pausha'];
// get today's database object to use in calendar functions
const todayDateObj = new Date();
const today = database.find(function (item) {
  return (
    item.year == todayDateObj.getFullYear() &&
    item.month == monthStr[todayDateObj.getMonth()] &&
    item.date == todayDateObj.getDate()
  )
}) || database.at(-1);
const databaseLength = database.length
// set initial ID (today's ID is also the array index in the virtual slides setup)
const todayID = today.id
let newID = todayID
// an array containing all tib month IDs and max value
const monthIDArr = database.filter((item) => item.monthID).map(item => item.monthID)
const maxID = monthIDArr.reduce(function(prev, current) {
  return (prev && prev.y > current.y) ? prev : current
})
// constants related to day database
const weekdaysString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const regulars = ['mb', 'dk', 'gr', 'fm', 'dp', 'nm', 'so14', 'so15', 'so88']
const eLord = ['baden', 'lu', 'yen', 'zha', 'nyin', 'ul']

// Day swiper — uses virtual slides. Only 7 slides exist in the DOM at any time
// (active + 3 either side), Swiper manages creation/destruction automatically.
const daySettings = {
  speed: 300,
  spaceBetween: 100,
  initialSlide: todayID,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  virtual: {
    slides: database,
    addSlidesBefore: 3,
    addSlidesAfter: 3,
    cache: true,
    renderSlide(slide, index) {
      return `<div class="swiper-slide" data-id="${slide.id}">${daySlideTemplate}</div>`
    }
  },
  observer: false,
  allowTouchMove: false,
  preventInteractionOnTransition: false,
  followFinger: false,
  autoHeight: true,
  runCallbacksOnInit: false,
  on: {
    init: function () {
      populateVirtualSlides()
      localizeUI()
      setTimeout(() => app.emit('moonChangeEvent'), 100)
    },
    afterInit: function () {
      sortFAB()
      touchSlideDay()
    },
    virtualUpdate() {
      populateVirtualSlides()
    },
    transitionEnd: function () {
      $('#day-page').children('.main-page').addClass('smooth-scrolling')
      app.emit('moonChangeEvent')
      populateTibetanYear()
      sortFAB()
    },
    slideChange: function () {
      $('#day-page').children('.main-page').removeClass('smooth-scrolling')
      $('.main-page').scrollTop(0)
      sessionStorage.removeItem('eLordClicked')
      app.fab.close($('.fab-today'))
    },
  },
}

// Initialize main view
var mainView = app.views.create($('.view-main'), {
  name: 'main-view',
  main: true,
  iosSwipeBack: false,
  on: {
    init: function(){
      // Initialize day swiper
      daySwiper = new Swiper('.day-swiper', daySettings)
      $('.arrow-back').hide()
      sessionStorage.removeItem('monthTransPending')
      setTimeout(() => {
        updateFromWeb(app);
      }, 1000);
      updateToolbarHighlight();
      document.getElementById('copyright-year').textContent = todayDateObj.getFullYear();
      document.getElementById('db-version').textContent = activeVersion;

      // -------------Event handlers---------------------

      // triggers resize of the swiper to allow scrolling on collapsed items larger than original height
      $(document).on('accordion:opened', '.specials-item', function(){
        monthSwiper.updateAutoHeight(50)
      })
      if (app.width > 759){
        $('.main-title').hide()
        $('.wrapper').removeClass('paused')
      }
      app.on('moonChangeEvent', function() {
        setMoonPhase()
        if (!$('#app-curtain').hasClass('hidden')) {
          requestAnimationFrame(() => {
            $('#app-curtain').addClass('hidden')
          })
        }
      })
      app.on('accordionOpened', (el) => {
        if ($(el).is('.astro-item')){
          scrollToAstroContent(el)
          daySwiper.updateAutoHeight(50)
        }
      })

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
      app.on('pageAfterIn', updateToolbarHighlight);

      $('#marquee').on('click', function(){
        $('.wrapper').toggleClass('paused')
      })
      $(document).on('click', '.month-specials-item-content, .month-regular, .day-slot', function(e){
        newID = parseInt(e.target.title)
        let oneUpNode = e.target.parentNode
        while (Number.isNaN(newID)){
          newID = parseInt(oneUpNode.title)
          oneUpNode = oneUpNode.parentNode
        }
        mainView.router.back()
      })
      $('.navigate-month').on('click', function(){
        mainView.router.navigate({name: 'month'})
      })
      $(document).on('click', '.month-navigation-next', function(){
        monthSwiper.slideNext(300)
      })
      $(document).on('click', '.month-navigation-prev', function(){
        monthSwiper.slidePrev(300)
      })
    }
  }
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

// Feed a variable or string into as parameter to produce translation based on locales object
function localize(key) {
  var language = window.language.replace(/-/g, "_");
  var match = locales.find(l => l.code === language)
    ?? locales.find(l => l.code === language.substring(0, 2))
    ?? locales.find(l => l.code === 'en');
  return match?.[key] ?? key;
}

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

function getTibetanYear() {
  let tibYear
  let pageActive = $('.page-current').data('name') || 'day'
  switch (pageActive) {
    case 'day':
      let thisID = parseInt($('.day-swiper .swiper-slide-active').data('id')) || todayID
      yearsData.forEach(year => {
        if (year.fDay <= thisID && thisID <= year.lDay) tibYear = year.yearID
      })
      break
    case 'month':
      let monthID = $('.month-swiper .swiper-slide-active').data('mID')
      yearsData.forEach(year => {
        if (year.fMonth <= monthID && monthID <= year.lMonth) tibYear = year.yearID
      })
      break
  }
  return tibYear
}
function populateTibetanYear(){
  let tibetanYear = getTibetanYear()
  $('.tibetan-year').text(localize(tibetanYear))
}  

////////// Slide creating functions /////////////////////

// get day object from database based on element data-id
function getDayObject(element) {
  const id = parseInt($(element).data('id') ?? $(element).attr('id'))
  if (isNaN(id)) return undefined
  return database[id]
}

function checkEnoughSlides(mode) {
  switch (mode) {
    case 'month':
      let lastMonthID = database.at(-1).monthID;
      $('.month-swiper .swiper-wrapper .swiper-slide').each(function () {
        if (parseInt($(this).data('mID')) > lastMonthID) {
          $(this).remove();
        }
      });
      sessionStorage.setItem('deletedMonths', 'true');
      break;
  }
}

function populateVirtualSlides() {
  $('#day-wrapper').children('.swiper-slide').each(function () {
    const dayID = parseInt($(this).data('id'))
    const dayObj = database[dayID]

    if (!dayObj) {
      $(this).addClass('populated').hide()
      return
    }

    // Structure — run once only
    if (!$(this).hasClass('populated')) {
      if (dayID === todayID) $(this).addClass('today-slide')
      $(this).data('detail', dayObj)
      getDaySpecials($(this))
      getAstroArray($(this))
      getAstroFullText($(this))
      $(this).addClass('populated')
    }

    // Text — always re-run, language may have changed since last render
    populateSlide($(this), dayObj)
    populateDaySpecials($(this))
    populateAstroFullText($(this))
    // If astro detail has been populated, re-translate it too
    if (!$(this).find('.astro-item').is('.astro-empty')) {
      populateAstroDetail($(this))
    }
  })
  
}

// populate a slide with content from day object based on language
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

// obtain and display special days
function getDaySpecials(slide){
  let dayObject = $(slide).data('detail')
  if (!dayObject) return
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
          $(slide).find('.bottom-icons').append(`<div class="e-lord-icon"><img onclick=showELord(event) onerror='this.style.display = "none"' src="./assets/${specialID}.svg" height="42px"></div>`)
        }
        else if (specialID === 'zha' || specialID === 'yen' || specialID === 'ul' || specialID === 'nyin'){
          $(slide).find('.bottom-icons').append(`<div class="e-lord-icon warning"><img onclick=showELord(event) onerror='this.style.display = "none"' src="./assets/warning.svg" height="42px"></div>`)
        }
      }
      else {
        const specialCardTemplate = `<div class="specials-card wheel-bg content-card ${specialID}"><div class="specials-card-header margin-left margin-right margin-top-half text-align-center no-padding-left"></div><div class="specials-card-content"></div></div>`
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

function translateAll() {
  localizeUI()
  $('#day-wrapper').children('.swiper-slide.populated').each(function () {
    const dayObj = getDayObject($(this))
    if (!dayObj) return

    populateSlide($(this), dayObj)
    populateDaySpecials($(this))
    populateAstroFullText($(this))
    if (!$(this).find('.astro-item').is('.astro-empty')) {
      populateAstroDetail($(this))
    }
  })
  if ($('.page-current').is('#day-page')) {
    sessionStorage.setItem('monthTransPending', 'true')
    daySwiper.updateAutoHeight()
  } else if ($('.page-current').is('#month-page')) {
    $('#month-wrapper').children().each(function () {
      populateMonth($(this))
    })
    monthSwiper.updateAutoHeight()
  }
  app.preloader.hide()
}

// populate panel
function populatePanel(){
  $('.panel-toolbar').text(localize('KSL'))
  $('.about-text').text(localize('about-text'))
  $('.semchen').html(localize('semchen'))
  $('.about-title').html(localize('About'))
  $('.share-title').html(localize('Share App'))
  $('.website-title').html(localize('Website'))
  $('.fb-title').html(localize('Facebook'))
}

// floating action button shows differently on today's slide and others
function sortFAB(){
  if ($('.day-swiper').find('.swiper-slide-active').hasClass('today-slide')){
    $('.fab-today').hide()
  }
  else {
    $('.fab-today').show()
  }
}

// slide back to today's slide
function goBackToday(event) {
  event.preventDefault()
  const distance = Math.abs(daySwiper.activeIndex - todayID)
  const duration = distance > 5 ? 0 : 400
  daySwiper.slideTo(todayID, duration)
  sortFAB()
}

//////// swiper custom swiping functions //////////////
const swipeThreshold = 30;

function touchSlideDay() {
  let touchArrX = [];
  let touchArrY = [];

  $('.day-swiper').touchmove(function(e) {
    touchArrX.push(e.touches[0].clientX);
    touchArrY.push(e.touches[0].clientY);
  });

  $('.day-swiper').touchend(function(e) {
    const dx = touchArrX[touchArrX.length - 1] - touchArrX[0];
    const dy = touchArrY[touchArrY.length - 1] - touchArrY[0];
    const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.5;
    if (isHorizontal && Math.abs(dx) > swipeThreshold) {
      dx < 0 ? daySwiper.slideNext() : daySwiper.slidePrev();
    }
    touchArrX = [];
    touchArrY = [];
  });
}
function touchSlideMonth(){
  let touchArrX = [];
  let touchArrY = [];

  $('.month-swiper').touchmove(function(e) {
    touchArrX.push(e.touches[0].clientX);
    touchArrY.push(e.touches[0].clientY);
  });

  $('.month-swiper').touchend(function(e) {
    const dx = touchArrX[touchArrX.length - 1] - touchArrX[0];
    const dy = touchArrY[touchArrY.length - 1] - touchArrY[0];
    const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.5;
    if (isHorizontal && Math.abs(dx) > swipeThreshold) {
      dx < 0 ? monthSwiper.slideNext() : monthSwiper.slidePrev();
    }
    touchArrX = [];
    touchArrY = [];
  });
}

function navBack(){
  mainView.router.back()
}

////////////////////// Monthly calendar ///////////////////////////////

// initialize month swiper
var monthSwiper
var monthSettings = {
  speed: 300,
  spaceBetween: 100,
  initialSlide: 1,
  slidesPerView: 1,
  preventInteractionOnTransition: true,
  allowTouchMove: false,
  autoHeight: true,
  observer: false,
  runCallbacksOnInit: false,
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
    transitionEnd: function () {
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

// give months their IDs
function labelMonths (){
  let thisMonthID = today.monthID
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
  $(slide).data('tMonth', thisTibetanMonth)
  // get position of first day (mon - sun)
  const firstDayIndex = weekdaysString.indexOf(firstTibetanDay.day) 
  // add a row if month starts on sunday and is 30 days long
  if (firstDayIndex === 6 && monthLength > 29) {
    const extraRow = 
      '<div class="grid grid-cols-7">' +
        '<div class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></div>' +
        '<div></div><div></div><div></div><div></div><div></div><div></div>' +
      '</div>'
    $(extraRow).insertBefore($(slide).find('.month-navigation'))
  }
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
      const individualSpecials = dayObject.specID.split(', ')
      thisDaySlot.find('.s-slot').append(`<img onerror='this.style.display = "none"' src="./assets/special.svg" width="20px"/>`)
      individualSpecials.forEach(function(special){
        const thisSpecialDayObject = {[special]: dayObject}
        compiledMonthSpecials.push(thisSpecialDayObject)
      })
    }
    if (thisDayObjectKeys.includes('reg')){
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
  $(slide).data('spannedWesternMonths', spannedWesternMonths)
  $(slide).data('compiledMonthSpecials', compiledMonthSpecials)
}

// display western months in the month header
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

// make a list of special days for a given month slide
function getMonthSpecials(slide) {
  let compiledMonthSpecials = $(slide).data('compiledMonthSpecials')
  compiledMonthSpecials.forEach((special, index) => {
    const itemWithContent = `<li class="accordion-item specials-item special${index}"><a class="item-link item-content padding-left-half display-flex"><div class="item-inner margin-right-half"><div class="item-title"><div class="month-specials-toggle"><div class="month-specials-date-slot"><div class="month-specials-tDay"></div><div class="month-specials-day"></div></div><div class="month-specials-header"></div></div></div></div></a><div class="accordion-item-content month-specials-item-content"><div class="month-specials-content"><div class="month-specials-text block"></div></div></div></li>`;
    const itemNoContent = `<li><a href="#" class="item-link item-content specials-item padding-left-half month-regular special${index}"><div class="item-inner margin-right-half"><div class="item-title"><div class="month-specials-toggle"><div class="month-specials-date-slot"><div class="month-specials-tDay"></div><div class="month-specials-day"></div></div><div class="month-specials-header"></div></div></div></div></a></li>`;
    
    let thisSpecialID = Object.keys(special)[0]
    let thisDayObj = special[thisSpecialID]
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

// main function to populate content of a month slide, used to change UI language as well
function populateMonth(slide){
  let lang = window.language?.slice(0,2)
  getWestMonths(slide)
  let tMonthNum = $(slide).data('tMonth')
  let tMonthOrdinal = function(tMonthNum){
    switch (tMonthNum) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
      default: return `${tMonthNum}th`;
    }
  }
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
  $(slide).find('.week-day-slot').each(function(){
    let weekDay = weekdaysString[$(this).index()].slice(0,3)
    $(this).text(localize(weekDay))
  })
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

// master month slide making function
function makeMonths(){
  labelMonths();
  if (!(sessionStorage.getItem('deletedMonths'))){
    checkEnoughSlides('month')
  }
  $('.month-swiper').find('.swiper-slide.new-slide').each(function () {
    if ($(this).children('.main-content').length === 0){
      $(this).html(monthTemplate)
    }
    structureMonth($(this));
    getMonthSpecials($(this))
    populateMonth($(this));
    $(this).removeClass('new-slide');
    sessionStorage.removeItem('monthTransPending')
  })
}

// hide FAB when current month slide is viewed
function sortMonthFAB(){
  if ($('.month-swiper').find('.swiper-slide-active').hasClass('this-month')){
    $('.fab-this-month').hide()
  }
  else {
    $('.fab-this-month').show()
  }
}

// slide back to current month
function goBackThisMonth(event) {
  event.preventDefault();
  let thisMonthIndex = $('.this-month').index();
  monthSwiper.slideTo(thisMonthIndex, 400);
}

//////////////////////////////////  Astro //////////////////////////////////////

// obtain array of astro items from astroData for a given slide
function getAstroArray(slide) {
  const dayID = parseInt($(slide).data('id') ?? $(slide).attr('id'))
  const astroObject = astroData.find(item => item.id == dayID)
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

// sort and display daily astro influences — called when astro accordion is to be opened
function getAstroDetail(slide){
  const astroArr = (slide).data('astroArray')
  let infoArr = astroArr.filter(function(item) {
    return (item.split(' ').length < 2)
  })
  if (Object.keys($(slide).data('detail')).includes('eLord')){
    const thisEarthLordArr = $(slide).data('detail').eLord.split(', ')
    thisEarthLordArr.forEach(function(eLord){
      let eLordDetail = astro.find(function(item){
        return (item.group == eLord)
      })
      infoArr.push(eLordDetail.enName)
    })
  }
  let trackingArray = []
  infoArr.forEach((item) => {
    let infoObject = astro.find((entry) => {
      return entry.enName == item
    })
    let astroID = infoObject.astroID
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
  const astroHeaders = ['planets', 'lunar', 'elemental', 'astro28', 'skyDoors', 'earthLord']
  let i = 0
  $(slide).find('.astro-category-header').each(function() {
    if ($(this).next('.astro-explain').children().length > 0){
      $(this).text(localize(astroHeaders[i]))
    }
    i++
  })
  i = 0
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
      $(this).find('.astro-text').text(thisInfoObject[`${lang}Text`]) 
    }
  })
}

function showELord(event){
  event.preventDefault();
  sessionStorage.setItem('eLordClicked', 'true')
  const thisAstro = $('.day-swiper').find('.swiper-slide-active').find('.astro-item')
  if (thisAstro.is('.accordion-item-opened')){
    scrollToAstroContent($('.accordion-item-opened'))
  }
  else{
    app.accordion.open(thisAstro)
  }
}

function scrollToAstroContent(el){
  if (sessionStorage.getItem('eLordClicked')){
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
    sessionStorage.removeItem('eLordClicked')
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

var s27CloudTimeout = null

function setMoonPhase(){
  if (s27CloudTimeout) {
    clearTimeout(s27CloudTimeout)
    s27CloudTimeout = null
  }

  let deg = getMoonPhaseRotation()
  const activeSlide = $('.day-swiper').find('.swiper-slide-active')
  
  const pi = Math.PI
  const rad = deg * (pi / 180)
  const adjustOne = (60 - (60 * Math.abs(Math.sin(0.5 * rad))))
  const adjustTwo = (80 - (30 * Math.abs(Math.sin(0.5 * rad))))
  let bgColor = `rgba(0, 0, 0, 0) radial-gradient(var(--f7-color-primary) ${adjustOne}%, #4d041465 ${adjustTwo}%, #4d041402 100%) repeat scroll 0% 0% / auto padding-box border-box`

  if (activeSlide.find('.s27').length > 0){
    $('.clouds-fm').css('opacity', 0)
    $('.clouds-nm').css('opacity', 0)
    $('.clouds-m').css('opacity', 0)
    $('.sphere').css('opacity', 0)
    $('.karmapa-moon').css('opacity', 0)
    s27CloudTimeout = setTimeout(() => {
      $('.karmapa-moon').css('opacity', 0.7)
      s27CloudTimeout = null
    }, 2000)
  }
  else {
    $('.karmapa-moon').css('opacity', 0)
    $('.sphere').css('opacity', 1)

    if (activeSlide.find('#nm').length > 0){
      deg = 180
      bgColor = `rgba(0, 0, 0, 0) radial-gradient(rgb(41, 41, 41) 10%, #4d041465 60%, #4d041402 100%) repeat scroll 0% 0% / auto padding-box border-box`
      $('.clouds-nm').css('opacity', 1)
      setTimeout(() => {
        $('.clouds-fm').css('opacity', 0)
        $('.clouds-m').css('opacity', 0)
      }, 200)
    }
    else if (activeSlide.find('#fm').length > 0){
      $('.clouds-fm').css('opacity', 1)
      deg = 1
    }
    else if (deg < 260 && deg > 100){
      $('.clouds-m').css('opacity', 1)
      setTimeout(() => {
        $('.clouds-fm').css('opacity', 0)
        $('.clouds-nm').css('opacity', 0)
      }, 200)
    }
    else {
      $('.clouds-fm').css('opacity', 1)
      setTimeout(() => {
        $('.clouds-nm').css('opacity', 0)
        $('.clouds-m').css('opacity', 0)
      }, 200)
    }
  }

  if ($('.moon-bg').css('opacity') == 1){
    $('.moon-bg2').css('background', bgColor)
    $('.moon-bg2').css('opacity', 1)
    setTimeout(() => {
      $('.moon-bg').css('opacity', 0)
    }, 125)
  }
  else {
    $('.moon-bg').css('background', bgColor)
    $('.moon-bg').css('opacity', 1)
    setTimeout(() => {
      $('.moon-bg2').css('opacity', 0)
    }, 125)
  }

  setTimeout(() => {
    $('.divider').transform(`rotate3d(0, 1, 0, ${deg}deg)`)
  }, 200)

  if (deg < 180) {
    $('.hemisphere').eq(0).removeClass('light').addClass('dark')
    $('.hemisphere').eq(1).addClass('light').removeClass('dark')
  } 
  else {
    $('.hemisphere').eq(0).removeClass('dark').addClass('light')
    $('.hemisphere').eq(1).addClass('dark').removeClass('light')
  }
}
function getMoonPhaseRotation() {
  const currentID = getDayObject($('.swiper-slide-active')).id
  const moonEvents = [
    ...fullMoonArr.map(id => ({ id, type: 'fm' })),
    ...newMoonArr.map(id => ({ id, type: 'nm' }))
  ].sort((a, b) => a.id - b.id)

  let prev, next
  for (let i = 0; i < moonEvents.length - 1; i++) {
    if (currentID >= moonEvents[i].id && currentID <= moonEvents[i + 1].id) {
      prev = moonEvents[i]
      next = moonEvents[i + 1]
      break
    }
  }
  if (!prev) {
    prev = moonEvents.at(-1)
    const avgHalfCycle = 14.75
    const progress = (currentID - prev.id) / avgHalfCycle
    const startDeg = prev.type === 'fm' ? 0 : 180
    return 360 - Math.floor((startDeg + progress * 180) % 360)
  }
  const progress = (currentID - prev.id) / (next.id - prev.id)
  const startDeg = prev.type === 'fm' ? 0 : 180
  const deg = startDeg + (progress * 180)
  return 360 - Math.floor(deg)
}

function shareApp() {
  var message = "Check out this app!";
  var url;
  if (device.ios || device.platform === "iOS") {
    url = "https://apps.apple.com/app/id333903271";
  } else {
    url = "https://play.google.com/store/apps/details?id=com.twitter.android";
  }
  if (window.plugins && window.plugins.socialsharing) {
    window.plugins.socialsharing.share(message, null, null, url);
  } else {
    window.open(url, "_system");
  }
}
function updateToolbarHighlight() {
  const onDayPage = $('.page-current').is('#day-page');
  if (onDayPage) {
    $('.day-link').addClass('active-nav');
    $('.navigate-month').removeClass('active-nav');
  } else {
    $('.day-link').removeClass('active-nav');
    $('.navigate-month').addClass('active-nav');
  }
}
function openExternalLink(event, url) {
  event.preventDefault();
  if (typeof cordova !== 'undefined' && cordova.InAppBrowser) {
    cordova.InAppBrowser.open(url, "_system");
  } else {
    window.open(url, "_blank");
  }
}
function openLicenses(event) {
  event.preventDefault();
  app.sheet.open('#licenses-sheet');
}
