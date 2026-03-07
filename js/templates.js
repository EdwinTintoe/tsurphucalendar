const daySlideTemplate = `
      <div class="main-content">
        <div class="day-card content-card display-flex flex-direction-column">
          <div class="day-card-main-events"><div class="top-icons"></div></div>
          <div class="day-card-main display-flex">
            <div class="day-card-main-filler"></div>
            <div class="day-card-main-date display-flex">
              <div class="tDay"></div>
              <div class="tMonth"></div>
            </div>
            <div class="day-card-main-filler"></div>
          </div>
          <div class="day-card-bottom">
            <div class="day-card-bottom-content">
              <div class="day"></div><div class="date"></div>
              <div class="bottom-content-filler"></div>
            </div>
            <div class="bottom-icons"></div>
          </div>
        </div>
        <div class="specials"></div>
        <div class="astro content-card padding-left-half padding-right-half">
          <div class="list accordion-list">
            <ul>
                <li class="accordion-item astro-item astro-empty">
                    <a href="" class="item-link item-content">
                      <div class="item-inner no-padding-right margin-right padding-left-half padding-top">
                        <div class="card-icon astro text-color-red"><i class="f7-icons">moon_stars</i></div>
                        <div class="specials-card-header astrology-header">Astrology</div>
                      </div>
                    </a>
                    <div class="astro-wrapper">
                      <div class="astro-full line1"></div>
                      <div class="astro-full line2"></div>
                      <div class="astro-full line3"></div>
                      <div class="astro-full line4"></div>
                      <div class="astro-full lineLast"></div>
                      </div>
                    <div class="accordion-item-content">
                      <div class="specials-card-text astro">
                        
                        <div class="astro-category-header"></div>
                        <div class="astro-explain planets">
                        </div>
                        <div class="astro-category-header"></div>
                        <div class="astro-explain lunar">
                        </div>
                        <div class="astro-category-header"></div>
                        <div class="astro-explain elemental">
                        </div>
                        <div class="astro-category-header"></div>
                        <div class="astro-explain astro28">
                        </div>
                        <div class="astro-category-header"></div>
                        <div class="astro-explain skyDoors">
                        </div>
                        <div class="astro-category-header"></div>
                        <div class="astro-explain earthLord">
                        </div>
                      </div>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </div>`

const dayTemplate = `<div class="swiper-slide new-slide"></div><div class="swiper-slide new-slide"></div><div class="swiper-slide new-slide"></div><div class="swiper-slide initial-slide new-slide"></div><div class="swiper-slide new-slide"></div><div class="swiper-slide new-slide"></div><div class="swiper-slide new-slide"></div>`
// html string - month template. Crude, but functional.
const monthTemplate = `<div class="main-content"><div class="month-card content-card month-card">
            <div class="month-header">
              <div class="header-left-container">
                <div class="header-left-top">
                  <div class="tib-month-header"></div>
                </div>
                <div class="tib-month-name"></div>
              </div>
              <div class="header-right-container">
                <div class="west-month-header"></div>
              </div>  
            </div>
            <div class="month-navigation">
                  <a class="month-navigation-prev"><i class="icon icon-back"></i></a>
                  <a class="month-navigation-next"><i class="icon icon-forward"></i></a>
                </div> 
            <div class="grid grid-cols-7">
              <div class="week-day-slot"></div><div class="week-day-slot"></div><div class="week-day-slot"></div><div class="week-day-slot"></div><div class="week-day-slot"></div><div class="week-day-slot"></div><div class="week-day-slot"></div>
            </div>
            <div class="grid grid-cols-7 first-week">
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
            </div>
            <div class="grid grid-cols-7">
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
            </div>
            <div class="grid grid-cols-7">
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
            </div>
            <div class="grid grid-cols-7">
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
            </div>
            <div class="grid grid-cols-7">
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
              <a class="day-slot"><div class="e-slot"><div class="r-slot"></div><div class="s-slot"></div></div><div class="date-slot"><div class="t-slot"></div><div class="w-slot"></div></div></a>
            </div>
          </div>
          <div class="month-specials-card content-card month-card">
          <div class="list color-primary margin-half accordion-list list-dividers inset month-specials-list">
          <ul>
          </ul>
          </div>
          </div>
          </div>
          `