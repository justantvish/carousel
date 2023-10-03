const initSlider = (slider, zoom = false) => {
  if(document.getElementsByClassName(slider).length === 0) {
    return console.error('Please, use proper name of your slider in slider init function');
  }
  const SLIDER = document.getElementsByClassName(slider)[0];
  const sliderBtnNext = document.querySelector('.slider-btn--next');
  const sliderBtnPrev = document.querySelector('.slider-btn--prev');
  const SLIDER_INNER = SLIDER.children[0];
  // const slogan = document.querySelector('.hero-slogan');
  const slides = Array.from(SLIDER_INNER.children);
  let slideWidth = SLIDER.offsetWidth;
  let zoomOpener;
  let curSlide = 0;
  let maxSlide = slides.length - 1;
  let initSlide = slides[0];

  const ro = new ResizeObserver((entries) => {
    slideWidth = entries[0].contentRect.width;
    slides.forEach(s => {
      s.style.minWidth = `${slideWidth}px`;
    });
  });

  ro.observe(SLIDER);

  const sliderBtnsHandler = () => {
    SLIDER_INNER.style.transform = `translateX(${0 - 100 * (curSlide)}%)`;

    slides.forEach((el, i) => {
      if(curSlide === i) {
        el.classList.add('active');
        // const img = el.querySelector('img').src;
        // slogan.style.backgroundImage = `url(${img})`;
      } else {
        el.classList.remove('active');
      }
    });
  };

  initSlide.classList.add('active');

  sliderBtnNext.addEventListener('click', () => {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    sliderBtnsHandler();
  });

  sliderBtnPrev.addEventListener('click', () => {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    sliderBtnsHandler();
  });

  if(zoom) {
    const zoomModalHTMLInit = () => {
      const zoomModalHTML = `
        <div class="slider-zoom_overlay">
          <div class="slider-zoom_modal-holder">
            <button class="slider-zoom_modal-close">x</button>
            <div class="slider-zoom_modal"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', zoomModalHTML);
    }
    zoomModalHTMLInit();

    const zoomModalEl = document.querySelector('.slider-zoom_modal');
    const zoomOverlayEl = document.querySelector('.slider-zoom_overlay');
    const zoomModalClose = document.querySelector('.slider-zoom_modal-close');

    const closeModal = () => {
      if (zoomModalEl.classList.contains('active') && zoomOverlayEl.classList.contains('active')) {
        zoomModalEl.classList.remove('active');
        zoomOverlayEl.classList.remove('active');
      }
    };

    slides.forEach((el, i) => {
      const slideHTML = el.innerHTML;
      const zoomHTML = `<div class="slider-zoom">${slideHTML}</div>`;
      el.innerHTML = zoomHTML;
      zoomOpener = el.children[0];

      zoomOpener.addEventListener('click', function(e) {
        if(curSlide === i) {
          console.log(e.target);
          zoomModalEl.innerHTML = '';
          zoomModalEl.classList.add('active');
          zoomOverlayEl.classList.add('active');
          zoomModalEl.appendChild(e.target.cloneNode(true));
        }
      });
    });

    zoomModalClose.addEventListener('click', closeModal);
    zoomOverlayEl.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if(e.key === 'Escape' && zoomModalEl.classList.contains('active')) {
        closeModal();
      }
    });
  }
};

initSlider('slider', true);