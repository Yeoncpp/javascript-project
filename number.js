const game_form = document.querySelector(".game_form");
const range = document.querySelector("#number_range");
const howtoplay_random_number = document.querySelector(".howtoplay_random_num");
const game_btn = document.querySelector(".game_btn");
const input_num = document.querySelector(".game_start");
const result = document.querySelector(".result_view");
const feedback = document.querySelector(".result_feedback");

const min_value = 0;


range.oninput = function() {

    howtoplay_random_number.innerText = range.value;
    
}

function genRandom(){
    const random = Math.floor(Math.random() * range.value);
    return random;
}

function draw_result(input){

    const randomNumber = genRandom();
    result.innerText = `You chose: ${input}, the machine chose: ${randomNumber}`;

    if(parseInt(input) === randomNumber){
        feedback.innerText = `You Won!`;
    } else { feedback.innerText = `You Lost!`;}
}

function compare(input){


    if(parseInt(input) > parseInt(range.value)) {
        alert("Your num must under the max range!"); // 최대 범위 초과일 때
    } else if(parseInt(input) < min_value) {
        alert("Your num must over the min range!"); // 최소 범위 미만일 때
    } else { // 그게 아닌 범위 내의 input이라면
        draw_result(input);        
    }
        
}

// play 버튼을 누르면 사용자가 입력한 값을 가져오고 비교 함수를 실행.
function handleSubmit(event) {
    event.preventDefault();

    const currentValue = input_num.value;


    if(currentValue === ''){
        alert("Put the numbers in first!");
        return;
    }

    if( howtoplay_random_number.innerText === "-"){
        alert("Set a range!");
        return;
    }
    
    compare(currentValue);
}

function init(){
    game_btn.addEventListener("click", handleSubmit);
}

init();