
var routes = [
  // index page, day page
  {
    path: '/home/',
    url: '/index.html',
    pageName: 'day',
    keepAlive: true,
    // force: true,
    on: {
      pageBeforeOut: function(){
        app.fab.close($('.fab-not-today'))
      }
    }
  },
  // month page
  {
    path: '/month/',
    name: 'month',
    url: './pages/month.html',
    keepAlive: true,
    // function which assures that when navigating back to day swiper via toolbar icon lands back on slide from which month was entered
    beforeLeave: function({resolve}) {
      // variable to indicate to event listener on page reinit whether to slide to a target slide
      const daySlides = $('#day-wrapper').children()
      let firstSlideID = daySlides.eq(0).attr('id')
      let lastSlideID = daySlides.eq(-1).attr('id')
      let targetSlide = null
      daySlides.each(function() {
          if ($(this).attr('id') == newID){
            targetSlide = $(this)
          }
        })
      if (targetSlide !== null){
        if(targetSlide.is('.swiper-slide-active')){
         resolve()
        $('.arrow-back, .arrow-back-panel').hide() 
        }
      }
      else if (targetSlide === null || (lastSlideID - newID) < 1 || (newID - firstSlideID) < 1){
        stopTransitionEndEvent = 1
        initialID = newID
        if (newID < 3){
          slides = newID
          remakeDaySwiper(slides, 'beginning')
        }
        else if (newID > (database.length - 4)){
          slides = (database.length - 1) - newID
          remakeDaySwiper(slides, 'end')
        }
        else {remakeDaySwiper()}
        // remake swiper if it's too far
        
        if (newID < firstSlideID){
          daySwiper.slideTo(4,0,false)
        }
        else{
          daySwiper.slideTo(2,0,false)
        }
        stopTransitionEndEvent = 0
        targetSlide = $('#day-wrapper').children('.initial-slide')
      }
      
        let targetIndex = targetSlide.index();
        setTimeout(() => {
          daySwiper.slideTo(targetIndex, 300)
        }, 10);
        
        $('.arrow-back, .arrow-back-panel').hide()
        resolve()
      
      
    },
    on: {
      pageAfterIn: function(){
        $('.day-link').addClass('back')
        if($('.panel-in-breakpoint').length > 0){
          $('.arrow-back-panel').show()
        }
        else{
        $('.arrow-back').show()
        }
       showFlag()
      },
      pageBeforeIn: function(){
        if(monthTranslationPending === 1){
          $('#month-wrapper').children().each(function(){
            populateMonth($(this))
          })
          monthTranslationPending = 0
        }
        
        const activeDaySlide = $('#day-wrapper').children('.swiper-slide-active')
        newID = parseInt(activeDaySlide.attr('id'))
        const newMonthID = activeDaySlide.data('detail').monthID
        if(!($('#month-wrapper').children('.swiper-slide-active').attr('id').slice(1) === newMonthID)){
          let targetIndex
          $('#month-wrapper').children().each(function(){
            if ($(this).attr('id').slice(1) == newMonthID){
              targetIndex = $(this).index()
            }
          })
          monthSwiper.slideTo(targetIndex, 0)
        }
      
      },
      pageAfterOut: function(){
        showMoon()
      },
    },
    once: {
      pageInit: function () {
        monthSwiper = new Swiper('.month-swiper', monthSettings)
      }
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
