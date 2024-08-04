//Navigation bar for mobile version
document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menu-btn');
  var navMenu = document.querySelector('.navmenu');

  menuBtn.addEventListener('click', function () {
    if (navMenu.style.right === '0px') {
      navMenu.style.right = '-100%'; // Hide menu
    } else {
      navMenu.style.right = '0'; // Show menu
    }
  });
});



