let initSwiper = function(dayObj){
    initialID = dayObj.ID
var swiper = new Swiper('.swiper', {
    speed: 800,
    spaceBetween: 100,
    initialSlide: 10,
    preventInteractionOnTransition: true,
    on: {
      // function called when swiper is initialized. Initially only 5 slides exist, the middle one is in view and all are populated by calling template $(.slide-template), assigning ids to slides, and filling them with database objects
      init:
          makeSlides(),
       
      // function adding slides when end of swiper reached
      transitionEnd: 
        function () {
          // create 10 slides when last existing slide is reached either side. Made to avoid manually defining 100s of slides in index.html. Framework7 events reachEnd and reachBeginning did not produce desired result, therefore event is triggered on each slide transition end, but function only called on last slides.
          if (this.isBeginning) {
            let firstID = $('.swiper-slide').eq(0).attr('id')
              if (firstID > 10) {
               for (let i = 0; i < 10; i++){
                swiper.prependSlide(`<div class="swiper-slide new-slide"></div>`);
              }}
              else if ( 1 < firstID <=10) {
               for (let i = 0; i < firstID - 1; i++) {
                swiper.prependSlide(`<div class="swiper-slide new-slide"></div>`);
              }}
            makeSlides()
          }
          else if (this.isEnd) {
            let lastID = $('.swiper-slide').eq(-1).attr('id')
              if ((database.length - lastID) > 10){
                for (let i = 0; i < 10; i++) {
                  swiper.appendSlide(`<div class="swiper-slide new-slide"></div>`);
              }}
              else if ((database.length - lastID) <= 10){
                for (let i = 0; i < (database.length - lastID) - 1; i++){
                  swiper.appendSlide(`<div class="swiper-slide new-slide"></div>`);
                }
              }
            makeSlides();
          }
        },
    },
  });
}