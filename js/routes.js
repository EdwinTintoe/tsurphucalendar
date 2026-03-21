var routes = [

  // Day page
  {
    path: '/home/',
    url: '/index.html',
    keepAlive: true,
    on: {
      pageBeforeOut() {
        app.fab.close($('.fab-not-today'))
      }
    }
  },

  // Month page
  {
    path: '/month/',
    name: 'month',
    url: './pages/month.html',
    keepAlive: true,

    // On back navigation, slide day swiper to the last viewed or selected day
    beforeLeave({ resolve }) {
      if (daySwiper) daySwiper.slideTo(newID, 0, false)
      $('.arrow-back, .arrow-back-panel').hide()
      resolve()
    },

    // Manual keepAlive — pageMounted fires every visit with url: routing,
    // so we guard with the monthSwiper instance check instead
    on: {
      pageMounted() {
        if (monthSwiper) {
          setTimeout(() => monthSwiper.update(), 350)
          return
        }
        monthSwiper = new Swiper('.month-swiper', monthSettings)
        // Populate only the initial slide synchronously — rest deferred to pageBeforeIn
        const activeSlide = $('.month-swiper .swiper-slide-active')
        if (activeSlide.hasClass('new-slide')) {
          activeSlide.html(monthTemplate)
          structureMonth(activeSlide)
          getMonthSpecials(activeSlide)
          populateMonth(activeSlide)
          activeSlide.removeClass('new-slide')
        }
      },

      pageBeforeIn() {
        // Flush any pending language translation from day swiper
        if (sessionStorage.getItem('monthTransPending')) {
          $('#month-wrapper').children().each(function () {
            populateMonth($(this))
          })
          sessionStorage.removeItem('monthTransPending')
        }

        // Populate any new slides added since last visit
        requestAnimationFrame(() => makeMonths())

        // Sync month swiper to match the active day slide
        const activeDaySlide = $('#day-wrapper').children('.swiper-slide-active')
        newID = parseInt(activeDaySlide.data('id') ?? activeDaySlide.attr('id'))

        const newMonthID = database[newID]?.monthID
        if (!newMonthID) return

        const activeMonthSlideID = $('#month-wrapper').children('.swiper-slide-active').attr('id')
        if (!activeMonthSlideID) return

        if (activeMonthSlideID.slice(1) != newMonthID) {
          let targetIndex
          $('#month-wrapper').children().each(function () {
            if ($(this).attr('id').slice(1) == newMonthID) targetIndex = $(this).index()
          })
          if (targetIndex !== undefined) monthSwiper.slideTo(targetIndex, 0)
        }
      },

      pageAfterIn() {
        $('.day-link').addClass('back')
        $('.panel-in-breakpoint').length > 0
          ? $('.arrow-back-panel').show()
          : $('.arrow-back').show()
        showFlag()
        sortMonthFAB()
        populateTibetanYear()
        monthSwiper.updateAutoHeight()
      },

      pageAfterOut() {
        showMoon()
      }
    }
  },

  // 404
  {
    path: '(.*)',
    url: './pages/404.html',
  }

]