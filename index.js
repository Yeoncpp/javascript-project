/* yeonho's challenge! */

//  hoho = document.querySelector("#yeonho");
const body = document.querySelector(".background");

const ScreenSize = window.screen.width;

console.dir(body);

function handleScreenSize(){

    const getScreenSize = window.screen.width;

    if (getScreenSize >= 350 && getScreenSize < 750) {
        body.className = "med__screen";

    } else if(getScreenSize >= 750) {
        body.className = "max__screen";
    } else {
        body.className = "bass_screen";
    }
}

// 새로고침 했을 때에 색상을 창 크기에 맞게 초기화
function initScreenColor(){

    if(ScreenSize >= 350 && ScreenSize < 750) {
        body.className = "med__screen";
    } else if(ScreenSize >= 750) {
        body.className = "max__screen";
    } else {
        body.className = "bass_screen";
    }
}

initScreenColor();
window.addEventListener("resize", handleScreenSize);

/* 2.5 - 2.7 
const CLICKED_CLASS = "clicked";

function handleClick() {
    const hasClass = hoho.classList.contains(CLICKED_CLASS);
    if(hasClass) {
        hoho.classList.remove(CLICKED_CLASS);
    } else {
        hoho.classList.add(CLICKED_CLASS);
    }

    // 클래스가 있는지 체크해서 있으면 remove 없으면 add
    hoho,classList.toggle(CLICKED_CLASS);
}

function init(){
    hoho.addEventListener("click", handleClick);
}

init();
*/



// challenge 3
 /* const superEventHandler = {
    handleResize: function () {
        hoho.innerHTML = "You just Resized!"
        hoho.style.color = colors[0];
    },

    mouseHover: function () {
        hoho.innerHTML = "The Mouse is here!";
        hoho.style.color = colors[1];
    },

    mouseLeave: function () {
        hoho.innerHTML = "The Mouse is gone :(";
        hoho.style.color = colors[2];
    },

    mouseRightClick: function () {
        hoho.innerHTML = "That was a right click!";
        hoho.style.color = colors[3];
    }
}

hoho.addEventListener("mouseenter", superEventHandler.mouseHover);
hoho.addEventListener("mouseleave", superEventHandler.mouseLeave);
window.addEventListener("contextmenu", superEventHandler.mouseRightClick)
window.addEventListener("resize", superEventHandler.handleResize);
*/

