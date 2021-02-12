const clockContainer = document.querySelector(".js-clock");
const clockNow = clockContainer.querySelector(".js-now");

// 크리스마스는 정적인 시간으로 전역변수로 선언

    function getTime() {
        // Don't delete this.
        const xmasDay = new Date("2021-12-24:00:00:00+0900");
      
        const date = new Date();
        const dDays = xmasDay.getTime() - date.getTime();
        const daysResult = Math.floor(dDays / (1000 * 60 * 60 * 24));
        // 밀리초를 일로 환산
        const hoursResult = Math.floor(
          (dDays % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        // 남은 밀리초를 일로 환산하고 남은 것(%)을 다시 시간으로 환산
        const minutesResult = Math.floor((dDays % (1000 * 60 * 60)) / (1000 * 60));
        // 남은 밀리초를 시간으로 환산하고 남은 것(%)을 다시 분으로 환산
        const secondsResult = Math.floor((dDays % (1000 * 60)) / 1000);
        // 남은 밀리초를 분으로 환산하고 남은 것(%)을 다시 초로 환산
      
        clockNow.innerText = `${daysResult}d ${
          hoursResult < 10 ? `0${hoursResult}` : hoursResult
        }h ${minutesResult < 10 ? `0${minutesResult}` : minutesResult}m ${
          secondsResult < 10 ? `0${secondsResult}` : secondsResult
        }s`;
      }
      
      function init() {
        getTime();
        setInterval(getTime, 1000);
      }

init();

