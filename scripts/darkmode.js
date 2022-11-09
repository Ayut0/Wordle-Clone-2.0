import { tiles, keyBtn } from "./keyboardInput.js";

const body = document.querySelector("body");
const heading = document.querySelector("h1");

//Save the theme to session storage
const applyTheme = (themeName) =>{
    sessionStorage.setItem("theme", themeName);
    body.classList.add = themeName;
    heading.classList.add = themeName;
}

//Check if it's a first visit
const applyVisited = (status) =>{
    status = '';
    sessionStorage.setItem('status', status)
}

//Check if user's OS theme is dark mode
const preferColorSchemeDark = matchMedia(
    "(prefers-color-scheme: dark)"
).matches;

const initialTheme = ()=>{
    const preferColorSchemeDark = matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    (preferColorSchemeDark) ? applyTheme("darkMode") : applyTheme("lightMode");

}

//Get theme from storage

const getStorageTheme = () =>{
    const storageTheme = sessionStorage.getItem("theme");

    if(storageTheme === "darkMode"){
        applyTheme("darkMode");
    }else if(storageTheme === "lightMode"){
        applyTheme("lightMode")
    }
}

//Switch theme by button
const themeSwitchBtn = document.querySelector("#switchBtn");
const switchTheme = () =>{
    const storageTheme = sessionStorage.getItem("theme");
    if(storageTheme !== "is-theme-dark"){
        applyTheme("darkMode");
    }
}

themeSwitchBtn.addEventListener("click", ()=>{
    themeSwitchBtn.classList.toggle("fa-sun");

    if(themeSwitchBtn.classList.contains("fa-sun")){
        body.classList.add("darkMode");
        heading.classList.add("darkMode");
        keyBtn.forEach(keyBtn =>{
            keyBtn.classList.add("darkMode");
        })
        tiles.forEach(tile=>{
            tile.classList.add("darkMode");
        });
    }else{
        body.classList.remove("darkMode");
        heading.classList.remove("darkMode");
        keyBtn.forEach((keyBtn) => {
          keyBtn.classList.remove("darkMode");
        });
        tiles.forEach((tile) => {
          tile.classList.remove("darkMode");
        });
    }
})
