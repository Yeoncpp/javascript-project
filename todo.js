const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const finishList = document.querySelector(".js-finishList");

const TODO_LS = "toDO";
const FINISH_LS = "finish";
// 지금 까지 한 것
/* 1. 체크 표시 추가
2. delete하면 해당 요소 TODO LS에서 지우고 FINISH LS에 저장


해야될 일
1. FINISH LS에 저장된 요소 버튼 바꿔서 보여주기
2. FINISH에서 복귀 버튼 누르면 다시 TODO LS에 저장하기
3. 새로고침 해도 FINISH LS 유지하기


*/

let toDos = [];
// 초기에 toDo 들이 많아질 수 있으므로 빈 배열로 생성하기.
let finished = [];
// finish로 처리된 데이터가 들어갈 배열.

function saveTodo(){
    // 로컬 스토리지에 객체를 갖는 배열을 저장하는데, 스트링으로 저장해야 하므로 JSON!
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
    // finish 배열에 있는것도 따로 LS에 저장!
}

function saveFinish(){
    localStorage.setItem(FINISH_LS, JSON.stringify(finished));
}

// 버튼을 누르면 TODO리스트에서 사라지는 함수
function deleteTodo(event){
    // 어떤 버튼이 눌린건지에 대한 것을 알아야 한다. 여기서는 id를 알아야한다.
    // button이 눌리는건 아니까 부모가 누군지 알아야 함.
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    // 배열의 모든 아이템을 통해 함수를 실행하고, filterFn에 대한 리턴값에 
    // 해당하는 아이템만을 가지고 배열을 만든다.
    const cleanTodos = toDos.filter(function(gamja){
        return gamja.id !== parseInt(li.id); // 타임스탬프로 고유 ID를 만들었는데 String이므로 Int로 형변환
        // li의 id는 현재 stirng 이기 때문에 parseInt를 통해 숫자로 바꾼다.
    });


    toDos = cleanTodos; // 새로운 배열로 toDos 배열을 바꾸고,
       
    saveTodo(); // 바꿨으니 저장하자.
}

function deleteFinish(event){
    // 어떤 버튼이 눌린건지에 대한 것을 알아야 한다. 여기서는 id를 알아야한다.
    // button이 눌리는건 아니까 부모가 누군지 알아야 함.
    const btn = event.target;
    const li = btn.parentNode;

    finishList.removeChild(li);

    // 배열의 모든 아이템을 통해 함수를 실행하고, filterFn에 대한 리턴값에 
    // 해당하는 아이템만을 가지고 배열을 만든다.
    const cleanFinish = finished.filter(function(gamja){
        return gamja.id !== li.id;
        // li의 id는 현재 stirng 이기 때문에 parseInt를 통해 숫자로 바꾼다.
    });


    finished = cleanFinish; // 새로운 배열로 toDos 배열을 바꾸고,
       
    saveFinish(); // 바꿨으니 저장하자.
}


// finish로 옮기면서 HTML을 새로 그려주는 함수
function paintFinish(text){

    const li_finish = document.createElement("li");
    const delBtn_finish = document.createElement("button");
    const span_finish = document.createElement("span");
    const id = `0${text}`; // finish 배열의 몇 번째 element인지를 위한 ID


    const moveBtns = document.createElement("button");

    delBtn_finish.innerText = "🧡"; // 제거 버튼은 X 이모지로!
    delBtn_finish.addEventListener("click", deleteFinish); // 버튼이 눌리면 제거


    span_finish.innerText = text;

    li_finish.appendChild(span_finish);
    li_finish.appendChild(delBtn_finish);
    li_finish.appendChild(moveBtns);
    li_finish.text = text;
    li_finish.id = id;
    finishList.appendChild(li_finish);

    const finishObj = {
        text: text,
        id: id
    };

    moveBtns.innerText = "💨";
    moveBtns.addEventListener("click", moveBtn);

    finished.push(finishObj);
    saveFinish();
}

// 다시 pending으로 옮겨주는 함수,
function moveBtn(event){

    // 이벤트에 해당하는 버튼에 해당하는 li를 본다.
   const btn = event.target;
   const li = btn.parentNode;

   finishList.removeChild(li); // 우선 finish 리스트의 HTMl은 삭제

   const idx = finished.findIndex(function(target){
       return target.id === li.id;
   });


   const newfinish = finished.splice(idx, 1); // toDo 배열에서 찾아서 지운다.

   saveFinish(); // 바꿨으니 저장하자.
   paintReturn(li.text); // pending 리스트에 다시 새로 그리면서 추가
  
}

// finish에서 다시 pending으로 복귀해서 새로 그려주는 함수
function paintReturn(text){

    const li_return = document.createElement("li");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");

    const span = document.createElement("span");
    const id = `0${text}`; // 배열의 몇 번째 element인지를 위한 ID


    // 여기는 누르기 전까진 실행이 아님!!!
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);

   
    span.innerText = text; // Form으로 입력받은 텍스트를 span으로 저장하는거!

    // 해당하는 span, delbtn 등을 li에 넣는다 :)
    li_return.appendChild(span);
    li_return.appendChild(delBtn);
    li_return.appendChild(returnBtn);
    li_return.text = text;
    li_return.id = id;

    // html 작업
    toDoList.appendChild(li_return); // todolist ul에 li들을 넣는 작업

    const toDoObj = {
        text: text,
        id: id

    }; // todo 객체는 텍스트와 아이디를 갖는다. 왜? 나중에 타겟으로 지우거나 옮겨야 함.

    returnBtn.innerText = "✅"
    
   // returnBtn.addEventListener("click", paintFinish(text));
    returnBtn.addEventListener("click", finishTodo);
    // 체크 버튼을 누르면 finishTodo 실행

    toDos.push(toDoObj); // 텍스트와 아이디를 갖는 객체를 todo 배열에 집어 넣는다.

    saveTodo(); // 그리고선 로컬 스토리지에 저장!

}

function finishTodo(event) {

    // 이벤트에 해당하는 버튼에 해당하는 li를 본다.
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li); // 우선 Todo 리스트의 HTMl은 삭제

    const idx = toDos.findIndex(function(target){
        return target.id === parseInt(li.id);
    });


    const newTodo = toDos.splice(idx, 1); // toDo 배열에서 찾아서 지운다.

    saveTodo(); // 바꿨으니 저장하자.
    paintFinish(li.text); // finish 리스트에 새로 그리면서 추가
   
}



function paintTodo(text){
    // js 파일에서 html에 엘리먼트를 만드는 방법!
    const stamp = new Date(); // 고유 id, 타임 스탬프를 위함.
    const plus = Math.floor(Math.random() * 100); // 타임 스탬프의 중복을 추가로 방지할 랜덤 정수 생성을 위함.

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finishBtn = document.createElement("button");

    const span = document.createElement("span");
    // const id = `0${text}`; // 배열의 몇 번째 element인지를 위한 ID
    const id = plus + stamp.getTime();

    // 여기는 누르기 전까진 실행이 아님!!!
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);

   
    span.innerText = text; // Form으로 입력받은 텍스트를 span으로 저장하는거!

    // 해당하는 span, delbtn 등을 li에 넣는다 :)
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    li.text = text;
    li.id = id;

    // html 작업
    toDoList.appendChild(li); // todolist ul에 li들을 넣는 작업

    const toDoObj = {
        text: text,
        id: id

    }; // todo 객체는 텍스트와 아이디를 갖는다. 왜? 나중에 타겟으로 지우거나 옮겨야 함.

    finishBtn.innerText = "✅"
    
   // finishBtn.addEventListener("click", paintFinish(text));
    finishBtn.addEventListener("click", finishTodo);
    // 체크 버튼을 누르면 finishTodo 실행

    toDos.push(toDoObj); // 텍스트와 아이디를 갖는 객체를 todo 배열에 집어 넣는다.

    saveTodo(); // 그리고선 로컬 스토리지에 저장!
}



function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;

    paintTodo(currentValue);

    toDoInput.value ="";
}

function loadTodo(){

    const loadTodos = localStorage.getItem(TODO_LS);
    const loadFinish = localStorage.getItem(FINISH_LS);

    if(loadTodos !== null){
        // JSON은 데이터를 전달할 때에, 자바스크립트가 그걸 다룰 수 있도록
        // object로 바꿔주는 기능!
        const parsedTodos = JSON.parse(loadTodos);

        // forEach는 기본적으로 함수를 실행하는데, 배열에 담긴 것들 각각 한번씩 실행해줌!
        parsedTodos.forEach(function(potato){
            paintTodo(potato.text);
        })
        // 이 부분 왜 안에 potato로 해야만 하는지!!!! 궁금
    }

    if(loadFinish !== null){
        // JSON은 데이터를 전달할 때에, 자바스크립트가 그걸 다룰 수 있도록
        // object로 바꿔주는 기능!
        const parsedfinish = JSON.parse(loadFinish);
        // forEach는 기본적으로 함수를 실행하는데, 배열에 담긴 것들 각각 한번씩 실행해줌!
        parsedfinish.forEach(function(goguma){
            paintFinish(goguma.text);
        }) 
    }

}

function init(){

    loadTodo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();