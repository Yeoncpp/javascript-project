const body = document.querySelector("body");

const IMG_COUNT = 3;

function handleImgLoad(){

}

function paintImage(imgnumber){
    const img = new Image();
    img.src = `imgs/${imgnumber + 1}.jpg`;

    img.classList.add("bgImage");

    body.prepend(img);
    // img.addEventListener("loadend", handleImgLoad);
    // api에서 이용한다면 필요하지만 지금은 아닌듯
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_COUNT);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();