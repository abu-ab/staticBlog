(function () {
    let headerMenu = document.querySelector('.header-menu');
    let headerNav = document.querySelector('.header-nav');
    headerMenu.onclick = function () {
        if (headerNav.classList.contains('block')) {
            headerNav.classList.remove('block');
            headerNav.classList.add('none');
        } else {
            headerNav.classList.remove('none');
            headerNav.classList.add('block');
        }
    }
})()