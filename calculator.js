const calculator = document.querySelector(".mainbox");
const clearBtn = document.querySelector(".clear_icon");
const equalBtn = document.querySelector(".operation_icon_equal");
const numberBtn = document.querySelector("button");
const operationBtn = document.querySelector("operation_icon");
const resultText = document.querySelector(".top_result_text");
const resultTextField = document.querySelector(".top_column_text");

let total_str = '';
let total_int = 0;

let firstInput = false; // 첫 번째 연산인지 판단하는 함수

let input_num = 0;
let old_num = 0;
let result_num = 0;

let equalActive = false;
let plusActive = false;
let minusActive = false;
let multiActive = false;
let divisActive = false;

// 새로고침하면 0으로 자동 초기화
function clear(){
    resultText.innerText = "0";
    input_num = 0;
    old_num = 0;
    result_num = 0;
    total_str = '';
    total_int = 0;
    firstInput = false;
    equalActive = false;
    plusActive = false;
    minusActive = false;
    multiActive = false;
    divisActive = false;
}

function calculateNum(something){
    
    switch(something) {
        case '+':
            if(firstInput === false){ // 이 연산이 첫 번째 연산인 경우
                doFirstPlus();
            } else {
                doMorePlus();
            }
            break;
        case '-':
            if(firstInput === false){ // 이 연산이 첫 번째 연산인 경우
                doFirstMinus();
            } else {
                doMoreMinus();
            }
            break;
        case '*':
            if(firstInput === false){ // 이 연산이 첫 번째 연산인 경우
                doFirstMulti();
            } else {
                doMoreMulti();
            }
            break;
        case '/':
            if(firstInput === false){ // 이 연산이 첫 번째 연산인 경우
                doFirstDivis();
            } else {
                doMoreDivis();
            }
            break;
    }

}

function doFirstDivis(){

    old_num =  input_num; // /를 누르기 전 수를 예전 수로 저장해두고, / 연산을 하기 위한 active를 켜준다.

    if(divisActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = false;
    multiActive = false;
    divisActive = true;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doMoreDivis(){

    if(divisActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = false;
    multiActive = false;
    divisActive = true;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doFirstMulti(){

    old_num =  input_num; // *를 누르기 전 수를 예전 수로 저장해두고, * 연산을 하기 위한 active를 켜준다.

    if(multiActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = false;
    multiActive = true;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doMoreMulti(){

    if(multiActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = false;
    multiActive = true;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doMorePlus(){

    if(plusActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = true;
    minusActive = false;
    multiActive = false;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doFirstPlus(){    

    old_num =  input_num; // +를 누르기 전 수를 예전 수로 저장해두고, + 연산을 하기 위한 active를 켜준다.

    if(plusActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = true;
    minusActive = false;
    multiActive = false;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doMoreMinus(){

    resultText.innerText = result_num;

    if(minusActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = true;
    multiActive = false;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doFirstMinus(){    

    old_num =  input_num; // -를 누르기 전 수를 예전 수로 저장해두고, - 연산을 하기 위한 active를 켜준다.

    if(minusActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = true;
    multiActive = false;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;

}

function doMinus(){    

    if(minusActive === true){ 
        resultText.innerText = result_num;
    }

    plusActive = false;
    minusActive = true;
    multiActive = false;
    divisActive = false;

    total_str = ''; // +를 누른 다음으로, 스트링을 초기화 해줌.
    total_int = 0;
}

// 눌리는 버튼에 따라 연산 시작
function getNumber(event){

    event.preventDefault();

    if(equalActive === true){
        clear();
        equalActive = false;
    } // = 버튼을 눌러서 equalActive가 활성화 되어있다면 새로운 수가 들어왔을 때는 새로운 연산을 시작하므로
    // 모두 초기화 해주면서 active도 끈다.
    
    const whatBtn = event.target;
    const num = whatBtn.innerText;
    // 누른 버튼의 값을 알아오기 위함 현재 string
    if(whatBtn === calculator || whatBtn === resultTextField ||  whatBtn === resultText){
        alert('This is body!');
    } // 계산기 몸통, 숫자 부분 등을 잘못 눌렀을 때 발생하는 예외 오류를 방지하기 위함.

    // 모든 연산자가 아닐 경우 숫자
    if(num !== '+' && num !== '-' && num !== '*' && num !== '/' && num !== '=' && num !== 'C'){
        continueNum(num); 
    } else if(num === 'C'){  
        clear();
    } else if(num === '='){
        equalActive = true; // equal을 누름에 따라 active가 활성화
        if(plusActive === true){
            resultText.innerText = result_num;
        } else if (minusActive === true){
            resultText.innerText = result_num;
        } else if (multiActive === true){
            resultText.innerText = result_num;
        } else if (divisActive === true){
            resultText.innerText = result_num;
        }
        // 최종 결과 함수
    }
     else { // 초기화도, 숫자도, 결과도 아니라면 계산 시작
        calculateNum(num); // 어떤 연산인지 인자로 넘김
    }   
}

function continueNum(number){
   
    // 수가 들어올때마다 스트링을 더해서 이어줌.
        total_str += number;   

    // 스트링인 숫자를 int로 형변환 해준다.
        total_int = parseInt(total_str);

    // 결과 창에 누적된 숫자를 보여주고,
        resultText.innerText = total_str;   

        input_num = total_int; // 현재 입력한 수는 input인 숫자.
    

    if(plusActive === true &&  firstInput === false){
        result_num = old_num + input_num; // 더하기 연산이 준비되어있었기에, 기존 수에 입력된 수를 더해서 결과값을 만들어주고,
        firstInput = true; // 그리고 첫번째 연산도 더이상 아님.
    } else if(plusActive === true &&  firstInput === true){
        result_num = result_num + input_num;

    } else if(minusActive === true && firstInput === false){
        result_num = old_num - input_num; 
        firstInput = true; // 그리고 첫번째 연산도 더이상 아님

    } else if(minusActive === true && firstInput === true){
        result_num = result_num - input_num; 

    } else if(multiActive === true && firstInput === false){
        result_num = old_num * input_num; 
        firstInput = true;

    } else if(multiActive === true && firstInput === true){
        result_num = result_num * input_num; 

    } else if(divisActive === true && firstInput === false){
        result_num = old_num / input_num; 
        firstInput = true;

    } else if(divisActive === true && firstInput === true){
        result_num = result_num / input_num; 
    } 

}


function init(){

    clear();
    calculator.addEventListener("click", getNumber);

}

init();