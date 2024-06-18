console.log("CONNECTED");
document.getElementById("lightDarkToggle").addEventListener("click", function(){
    if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.getElementById("srcIcon").setAttribute("src","./source/data/icons/search.svg");
        document.getElementById("filterIcon").setAttribute("src","./source/data/icons/filter.svg");
        document.getElementById("lightDarkToggle").setAttribute("src","./source/data/icons/brightness-high-fill.svg");
        document.getElementById("navAccIcon").setAttribute("class", "btn btn-dark");
        document.getElementById("dropdownMenuButton").setAttribute("style", "background-color: white; border: 0; color: black;")

    } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.getElementById("srcIcon").setAttribute("src","./source/data/icons/searchWhite.svg");
        document.getElementById("filterIcon").setAttribute("src","./source/data/icons/filterWhite.svg");
        document.getElementById("lightDarkToggle").setAttribute("src","./source/data/icons/moon.svg");
        document.getElementById("navAccIcon").setAttribute("class", "btn btn-light");
        document.getElementById("dropdownMenuButton").setAttribute("style", "background-color: black; border: 0; color: white;")
    }
})  
