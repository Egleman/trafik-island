const calcScroll = () => {
    let div = document.createElement('div');
    div.style.width = '500px';
    div.style.height = '500px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
}
const blockBody = () => {
    const body = document.body;
    body.style.overflowY = 'hidden';
    body.style.touchAction = 'none';
    const bodyScroll = calcScroll();
    body.style.paddingRight = `${bodyScroll}px`;
}
const unBlockBody = () => {
    const body = document.body;
    body.style.overflowY = 'auto';
    body.style.touchAction = 'auto';
    body.style.paddingRight = `0`;
}


const scrollLinks = document.querySelectorAll('[scroll]');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('href');
        document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })
})

let modalNewsSlider;
const initModalSwiper = (id) => {
    const modal = document.querySelector(id);
    const swiper = modal.querySelector('.modal-news__swiper');
    const nextButton = modal.querySelector('[data-button="modal-news-next"]');
    const prevButton = modal.querySelector('[data-button="modal-news-prev"]')
    if (swiper && nextButton && prevButton) {
        modalNewsSlider = new Swiper(swiper, {
            slidesPerView: 1,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
        });
    }
}
const destroyModalSwiper = (id) => {
    const modal = document.querySelector(id);
    const swiper = modal.querySelector('.modal-news__swiper');
    if (swiper) {
        modalNewsSlider.destroy();
    }
}
const modalLinks = document.querySelectorAll('[toggle]');
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('toggle');
        document.querySelector(blockId).classList.toggle('active');
        if (document.querySelector(blockId).classList.contains('active')) {
            blockBody();
            initModalSwiper(blockId);
        } else {
            unBlockBody();
            destroyModalSwiper(blockId)
        }
    })
})

const phoneInputs = document.querySelectorAll('[data-input="masked"]');
const onlyNumberInputs = document.querySelectorAll('[data-input="only-number"]');
const im = new Inputmask({
    mask: '(+7|8) (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,
    jitMasking: true,
    inputmode: 'tel'
})
phoneInputs.forEach(input => {
    im.mask(input);
})
onlyNumberInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    })
})

const header = () => {
    const headerSearchButton = document.querySelector('.header__list-link_icon');
    const searchModal = document.querySelector('.search');
    const headerBurgerBtn = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.mobile-menu__close');
    const mobileSearchBtn = document.querySelector('[data-button="mobile-search"]');
    const mobileMenuWrapper = document.querySelector('.mobile-menu__wrapper');
    const mobileMenuSearch = document.querySelector('.mobile-menu__search');
    const backSearchBtn = document.querySelector('.mobile-menu__back');

    headerSearchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.classList.add('active');
    })
    const closeActions = (modal) => {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.classList.add('close');
            unBlockBody();
            setTimeout(() => {
                if (modal.classList.contains('close')) {
                    modal.classList.remove('close')
                }
            }, 600)
        }
    }

    searchModal.addEventListener('click', (e) => {
        if (!e.target.closest('.header__search')) {
            closeActions(searchModal);
        }
    })

    headerBurgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        blockBody();
    })

    closeMenuBtn.addEventListener('click', () => {
        closeActions(mobileMenu);
    })
    mobileMenu.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu__body')) {
            closeActions(mobileMenu);
        }
    })

    window.addEventListener('resize', () => {
        if (window.innerWidth < 540) {
            closeActions(searchModal);
        }
        if (window.innerWidth > 1200) {
            closeActions(mobileMenu);
            mobileMenuWrapper.style.display = 'flex';
            mobileMenuSearch.classList.remove('active');
            closeMenuBtn.style.display = 'flex';
            backSearchBtn.style.display = 'none';
        }
    })


    mobileSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenuWrapper.style.display = 'none';
        mobileMenuSearch.classList.add('active');
        closeMenuBtn.style.display = 'none';
        backSearchBtn.style.display = 'flex';
    })
    backSearchBtn.addEventListener('click', () => {
        mobileMenuWrapper.style.display = 'flex';
        mobileMenuSearch.classList.remove('active');
        closeMenuBtn.style.display = 'flex';
        backSearchBtn.style.display = 'none';
    })
}
const checkEndSlider = (swiper, selector) => {
    if (swiper.isEnd) {
        setTimeout(() => {
            if (document.querySelector(selector)) document.querySelector(selector).style.paddingRight = '15px';
        }, 290)
    } else {
        setTimeout(() => {
            if (document.querySelector(selector)) document.querySelector(selector).style.paddingRight = '0px';
        }, 290)
    }
}
const goodSlider = new Swiper('.good__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
        nextEl: '[data-button="good-next"]',
        prevEl: '[data-button="good-prev"]',
    },
    breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 15,
        },
        375: {
            slidesPerView: 1.2,
            spaceBetween: 15,
        },
        606: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1022: {
            slidesPerView: 'auto',
            spaceBetween: 30,
        },
    },
});
const newsSlider = new Swiper('.news__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
        nextEl: '[data-button="news-next"]',
        prevEl: '[data-button="news-prev"]',
    },
    breakpoints: {
        0: {
            slidesPerView: 'auto',
            spaceBetween: 15,
        },
        // 375: {
        //     slidesPerView: 1.2,
        //     spaceBetween: 15,
        // },
        606: {
            slidesPerView: 1.5,
            spaceBetween: 15,
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1150: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});
const gallerySlider = new Swiper('.gallery__swiper', {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 30,
    navigation: {
        nextEl: '[data-button="gallery-next"]',
        prevEl: '[data-button="gallery-prev"]',
    },
    pagination: {
        el: ".gallery__pagination",
        clickable: true,
        bulletActiveClass: 'gallery-bullet-active',
        bulletClass: 'gallery-bullet',
    },
    breakpoints: {
        0: {
            spaceBetween: 15,
        },
        606: {
            spaceBetween: 24,
        },
        1022: {
            spaceBetween: 30,
        },
    },
});
const historySlider = new Swiper('.history__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    allowTouchMove: true,
    navigation: {
        nextEl: '[data-button="history-next"]',
        prevEl: '[data-button="history-prev"]',
    },
    breakpoints: {
        0: {
            slidesPerView: 'auto',
            spaceBetween: 15,
        },
        606: {
            slidesPerView: 'auto',
            spaceBetween: 20,
        },
        1022: {
            slidesPerView: 'auto',
            spaceBetween: 30,
        }
    },
});
header();

const select = document.querySelector('.select');
const selectList = document.querySelector('.select__list');
const selectValue = document.querySelector('.select__value-text');
if (select) {
    select.addEventListener('click', () => {
        select.classList.toggle('active');
    })
    selectList.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.select__list-option')) {
            selectValue.textContent = e.target.closest('.select__list-option').textContent;
            setTimeout(() => {
                if (select.classList.contains('active')) {
                    select.classList.remove('active');
                }
            }, 100)
        }
    })
}

let videoIndex = 0
class Accordion {
    constructor(target, config) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }
    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header');
            if (!elHeader) {
                return;
            }
            this.toggle(elHeader.parentElement);
        });
    }
    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style.display = 'block';
        const height = elBody.offsetHeight;
        elBody.style.height = 0;
        elBody.style.overflow = 'hidden';
        elBody.style.transition = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style.height = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style.display = '';
            elBody.style.height = '';
            elBody.style.transition = '';
            elBody.style.overflow = '';
        }, this._config.duration);
    }
    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style.height = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style.display = 'block';
        elBody.style.height = 0;
        elBody.style.overflow = 'hidden';
        elBody.style.transition = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style.display = '';
            elBody.style.height = '';
            elBody.style.transition = '';
            elBody.style.overflow = '';
        }, this._config.duration);
    }
    toggle(el) {
        const iframe = document.querySelectorAll('.instructions__video > iframe')[videoIndex];
        if (iframe && videoIndex !== 0) {
            iframe.src = '';
            iframe.style.display = 'none';
            document.querySelectorAll('.instructions__video-play')[videoIndex].style.display = 'flex';
        }
        const iframeReserve = document.querySelectorAll('.instructions-reserve__video > iframe')[videoIndex];
        if (iframeReserve && videoIndex !== 0) {
            iframeReserve.src = '';
            iframeReserve.style.display = 'none';
            document.querySelectorAll('.instructions-reserve__video-play')[videoIndex].style.display = 'flex';
        }
        el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
}
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    new Accordion(accordion, {
        alwaysOpen: false
    });
})

const tabPanel = document.querySelector('.instructions__tabs');
const tabs = document.querySelectorAll('.instructions__tabs-tab');
const tabsContent = document.querySelectorAll('.instructions__content');
if (tabPanel) {
    tabPanel.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.instructions__tabs-tab')) {
            const btn = e.target.closest('.instructions__tabs-tab');
            tabs.forEach((tab, index) => {
                if (tab === btn) {
                    tab.classList.add('active');
                    tabsContent[index].classList.add('active');
                } else {
                    if (tab.classList.contains('active')) {
                        tab.classList.remove('active');
                    }
                    if (tabsContent[index].classList.contains('active')) {
                        tabsContent[index].classList.remove('active');
                    }
                }
            })
        }
    })
}
const tabPanelReserve = document.querySelector('.instructions-reserve__tabs');
const tabsReserve = document.querySelectorAll('.instructions-reserve__tabs-tab');
const tabsContentReserve = document.querySelectorAll('.instructions-reserve__content');
if (tabPanelReserve) {
    tabPanelReserve.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.instructions-reserve__tabs-tab')) {
            const btn = e.target.closest('.instructions-reserve__tabs-tab');
            tabsReserve.forEach((tab, index) => {
                if (tab === btn) {
                    tab.classList.add('active');
                    tabsContentReserve[index].classList.add('active');
                } else {
                    if (tab.classList.contains('active')) {
                        tab.classList.remove('active');
                    }
                    if (tabsContentReserve[index].classList.contains('active')) {
                        tabsContentReserve[index].classList.remove('active');
                    }
                }
            })
        }
    })
}
const videos = document.querySelectorAll('.instructions__video');
if (videos) {
    videos.forEach((video, index) => {
        const playButton = video.querySelector('.instructions__video-play');
        const iframe = video.querySelector('iframe');
        playButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.instructions__video > iframe').forEach((otherVideo, i) => {
                otherVideo.src = '';
                otherVideo.style.display = 'none';
                document.querySelectorAll('.instructions__video-play')[i].style.display = 'flex';
            })
            iframe.src = iframe.dataset.src;
            playButton.style.display = 'none';
            iframe.style.display = 'block';
            videoIndex = index;
        })
    })
}
const videosReserve = document.querySelectorAll('.instructions-reserve__video');
if (videosReserve) {
    videosReserve.forEach((video, index) => {
        const playButton = video.querySelector('.instructions-reserve__video-play');
        const iframe = video.querySelector('iframe');
        playButton.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.instructions-reserve__video > iframe').forEach((otherVideo, i) => {
                otherVideo.src = '';
                otherVideo.style.display = 'none';
                document.querySelectorAll('.instructions-reserve__video-play')[i].style.display = 'flex';
            })
            iframe.src = iframe.dataset.src;
            playButton.style.display = 'none';
            iframe.style.display = 'block';
            videoIndex = index;
        })
    })
}
const formInputs = document.querySelectorAll('[data-input="requried"]');
formInputs.forEach(inp => {
    inp.addEventListener('focus', () => {
        if (inp.classList.contains('error')) {
            inp.classList.remove('error')
        }
    })
})
const contactsForm = document.querySelector('.contacts__form');
if (contactsForm) {
    contactsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactsForm);
        const formBody = {};
        for (const pair of formData.entries()) {
            formBody[pair[0]] = pair[1]
        }
        formBody.file = '1';
        if (Object.values(formBody).every(item => item !== '')) {
            console.log('Отправлено')
            contactsForm.reset();
        } else {
            Object.values(formBody).forEach((item, index) => {
                if (item === '') {
                    formInputs[index].classList.add('error');
                }
            })
        }
    })
}

const contactsMiddleList = document.querySelector('.contacts__middle-list');
if (contactsMiddleList) {
    const links = document.querySelectorAll('.contacts__middle-link');
    contactsMiddleList.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.contacts__middle-link')) {
            const btn = e.target.closest('.contacts__middle-link');
            links.forEach(link => {
                if (link === btn) {
                    link.classList.add('active')
                } else {
                    if (link.classList.contains('active')) {
                        link.classList.remove('active')
                    }
                }
            })
        }
    })
}

const inputFile = document.querySelector('.file-input');
if (inputFile) {
    const fileLabel = document.querySelector('.contacts__form-label > p');
    inputFile.addEventListener('change', (e) => {
        fileLabel.style.display = 'block';
        fileLabel.textContent = e.target.files[0].name;
    })
}