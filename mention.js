const mention = document.querySelector(".js-mention");

function getMention(){
    fetch("https://api.adviceslip.com/advice")
    .then(function(response){
        return response.json();
    }).then(function(json){
        const ment = json.slip.advice;
        mention.innerText = ment;
    })
    //then은 데이터가 완전히 들어온 다음 함수를 호출한다
}

function init(){
    getMention();

}

init();