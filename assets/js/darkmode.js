let sun = '<img src="/assets/sun.svg" width="20"></img>';
console.log(sun);
let moon = '<img src="/assets/moon.svg" width="20"></img>';

let toggle = document.getElementById('theme-toggle');
const theme = localStorage.getItem('theme');

    if (theme === "dark") {
      document.body.setAttribute('data-theme', 'dark');
    }

    if (theme === "dark") {
      document.getElementById("theme-toggle").innerHTML = moon;
    } else if (theme === "light") {
      document.getElementById("theme-toggle").innerHTML = sun;
    } else if  (userPrefers === "dark") {
      document.body.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
      document.getElementById("theme-toggle").innerHTML = moon;
    } else {
      document.body.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
      document.getElementById("theme-toggle").innerHTML = sun;
    }

    function modeSwitcher() {
      let currentMode = document.body.getAttribute('data-theme');
      if (currentMode === "dark") {
        document.body.setAttribute('data-theme', 'light');
        window.localStorage.setItem('theme', 'light');
        document.getElementById("theme-toggle").innerHTML = moon;
      } else {
        document.body.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
        document.getElementById("theme-toggle").innerHTML = sun;
      }
    }
