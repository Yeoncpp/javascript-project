const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDO";

let toDos = [];
// 초기에 toDo 들이 많아질 수 있으므로 빈 배열로 생성하기.


function deleteTodo(event){
    // 어떤 버튼이 눌린건지에 대한 것을 알아야 한다. 여기서는 id를 알아야한다.
    // button이 눌리는건 아니까 부모가 누군지 알아야 함.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    // 배열의 모든 아이템을 통해 함수를 실행하고, filterFn에 대한 리턴값에 
    // 해당하는 아이템만을 가지고 배열을 만든다.
    const cleanTodos = toDos.filter(function(gamja){
        return gamja.id !== parseInt(li.id);
        // li의 id는 현재 stirng 이기 때문에 parseInt를 통해 숫자로 바꾼다.
    });

    toDos = cleanTodos; // 새로운 배열로 toDos 배열을 바꾸고,
    saveTodo(); // 바꿨으니 저장하자.
}


function saveTodo(){
    // localStorage.setItem(TODO_LS, toDos);
    // 이 상태에선 local에 string으로 저장할 수 없음!
    // 좋은 트릭인 JSON.stringify를 써보자!
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintTodo(text){
    // js 파일에서 html에 엘리먼트를 만드는 방법!
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);

    span.innerText = text;
    span.style.color = "white";
    span.style.fontSize = "25px";
    span.style.fontWeight = "bold";
    li.style.marginLeft = "380px";

    delBtn.style.marginLeft = "5px";
    delBtn.style.border = "none"; 
    delBtn.style.background = "none";
    delBtn.style.fontSize = "25px";
    li.style.zIndex = "10";

    // 해당하는 span, delbtn 등을 li에 넣는다 :)
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId

    };

    toDos.push(toDoObj);
    saveTodo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value ="";
}

function loadTodo(){
    const loadTodos = localStorage.getItem(TODO_LS);
    if(loadTodos !== null){
        // JSON은 데이터를 전달할 때에, 자바스크립트가 그걸 다룰 수 있도록
        // object로 바꿔주는 기능!
        const parsedTodos = JSON.parse(loadTodos);

        // forEach는 기본적으로 함수를 실행하는데, 배열에 담긴 것들 각각 한번씩 실행해줌!
        parsedTodos.forEach(function(potato){
            paintTodo(potato.text);
        })
        // 이 부분 왜 안에 potato로 해야만 하는지!!!! 궁금
    };
}

function init(){

    loadTodo();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();