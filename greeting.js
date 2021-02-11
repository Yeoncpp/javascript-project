const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CL = "showing";

// 사용자의 이름을 로컬 저장소에 저장하는 방법의 함수
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    // 엔터를 누르면 사라지는 기본동작을 막는 1단계
    event.preventDefault();
    const currentValue = input.value;
    paingGreeting(currentValue);
    saveName(currentValue);
}

function asfForName(){
    form.classList.add(SHOWING_CL);
    form.addEventListener("submit", handleSubmit);
}

function paingGreeting(text){
    form.classList.remove(SHOWING_CL);
    greeting.classList.add(SHOWING_CL);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        asfForName();
    } else {
        paingGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();