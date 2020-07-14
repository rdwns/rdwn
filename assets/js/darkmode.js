


let moon = '<img src="/assets/moon.png" width="40px"></img>';
let sun = '<img src="/assets/sun.png" width="40px"></img>';


const hand = document.getElementById('hand');


// function waveOnLoad() {
//   hand.classList.add('wave');
//   setTimeout(function() {
//     hand.classList.remove('wave');
//   }, 2000);
// }

// setTimeout(function() {
//   waveOnLoad();
// }, 1000);

hand.addEventListener('mouseover', function() {
  hand.classList.add('wave');
});

hand.addEventListener('mouseout', function() {
  hand.classList.remove('wave');
});


let toggle = document.getElementById('theme-toggle');
toggle.innerHTML=moon;
const theme = localStorage.getItem('theme');

    if (theme === "dark") {
      document.body.setAttribute('data-theme', 'dark');
      toggle.innerHTML=sun;
      }

    const userPrefers = getComputedStyle(document.documentElement).getPropertyValue('content');

    if (theme === "dark") {
      toggle.innerHTML = sun;
    } else if (theme === "light") {
      toggle.innerHTML = moon;
    } else if  (userPrefers === "dark") {
      document.body.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
      toggle.innerHTML = sun;
    } else {
      document.body.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
      toggle.innerHTML = moon;
    }

    function modeSwitcher() {
      let currentMode = document.body.getAttribute('data-theme');
      if (currentMode === "dark") {
        document.body.setAttribute('data-theme', 'light');
        window.localStorage.setItem('theme', 'light');
        toggle.innerHTML = moon;
      } else {
        document.body.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
        toggle.innerHTML = sun;
      }
    }
