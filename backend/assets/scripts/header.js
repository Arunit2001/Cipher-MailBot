let openNav = document.getElementById("openNav");
let horizonNav = document.getElementById("horizonNav");
let verticalNav = document.getElementById("verticalNav");
let closeNav = document.getElementById("close-button");

openNav.addEventListener("click", function(){
    horizonNav.style.visibility = "none";
    verticalNav.style.width = "250px";
})

closeNav.addEventListener("click", function(){
    verticalNav.style.width="0";
    horizonNav.style.display="flex";
})
