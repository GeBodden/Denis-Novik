// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());

// active links

const sections = document.querySelectorAll("section");
const footer = document.querySelector("footer");
const links = document.querySelectorAll(".header__link");
let areas = [...sections, footer];
const activeLinkClass = "header__link_active";
const browserHeight = window.innerHeight;

function changeActiveLink(target) {
  clearLinks();
  target.classList.add(activeLinkClass);
};

function clearLinks() {
  links.forEach(link => {
    link.classList.remove(activeLinkClass);
  });
}

window.addEventListener("scroll", () => {
  areas.forEach((area, index) => {
    if (window.pageYOffset > area.offsetTop - browserHeight / 2 && window.pageYOffset < area.offsetTop + area.offsetHeight + browserHeight / 2) {
      changeActiveLink(links[index]);
    }
  });
});

// Burger handler

(function () {
  const burgerItem = document.querySelector('.burger');
  const menu = document.querySelector('.header__nav')
  const menuCloseItem = document.querySelector('.header__nav-close')
  const menuLinks = document.querySelectorAll('.header__link')
  burgerItem.addEventListener('click', () => {
      menu.classList.add('header__nav_active')
  });
  menuCloseItem.addEventListener('click', () => {
      menu.classList.remove('header__nav_active')
  });
  if (window.innerWidth <= 767) {
      for (let i = 0; i < menuLinks.length; i += 1) {
          menuLinks[i].addEventListener('click', () => {
              menu.classList.remove('header__nav_active')
          });
      }
  }
}());