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

const modalLinks = document.querySelectorAll('[toggle]');
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('toggle');
        document.querySelector(blockId).classList.toggle('active');
        if (document.querySelector(blockId).classList.contains('active')) {
            blockBody();
        } else {
            unBlockBody();
        }
    })
})

const phoneInputs = document.querySelectorAll('[data-input="masked"]');
const im = new Inputmask({
    mask: '+375 (99) 99-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,
    jitMasking: true,
    inputmode: 'tel'
})
phoneInputs.forEach(input => {
    im.mask(input);
})

const headerSearchButton = document.querySelector('.header__list-link_icon');
const searchModal = document.querySelector('.search');
headerSearchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.classList.add('active');
})
searchModal.addEventListener('click', (e) => {
    if (!e.target.closest('.header__search')) {
        if (searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
            searchModal.classList.add('close');
            setTimeout(() => {
                if (searchModal.classList.contains('close')) {
                    searchModal.classList.remove('close')
                }
            }, 600)
        }
    }
})
const headerBurgerBtn = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.mobile-menu__close');
headerBurgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
})
const closeMobileMenu = () => {
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('close');
        setTimeout(() => {
            if (mobileMenu.classList.contains('close')) {
                mobileMenu.classList.remove('close')
            }
        }, 600)
    }
}
closeMenuBtn.addEventListener('click', () => {
    closeMobileMenu();
})
mobileMenu.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu__body')) {
        closeMobileMenu();
    }
})

const mobileSearchBtn = document.querySelector('[data-button="mobile-search"]');
const mobileMenuWrapper = document.querySelector('.mobile-menu__wrapper');
const mobileMenuSearch = document.querySelector('.mobile-menu__search');
const backSearchBtn = document.querySelector('.mobile-menu__back');
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