var CURRENT_LOTTERY_NUMBER;
var CURRENT_GUESSES_ARRAY = new Array();

function startCountdown(){
targetElementId = document.getElementById("countdown");

var timeLeft = 10;

var timerId = setInterval(countdown, 1000);

function countdown() {
if (timeLeft === 0) {
	timeLeft = 10;
	/*let xhr = new XMLHttpRequest();
      xhr.open("GET", "fetch.php", true);
      xhr.onload = function() {
        document.getElementById("lotteryNumber") = xhr.response;
      }
      xhr.send();*/
	  fetch("/widget/fetch.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        //body: `x=${x}&y=${y}`,
      })
      .then((response) => response.text())
      .then((res) => (document.getElementById("lotteryNumber").innerHTML = JSON.parse(res).lotteryNumber + " won previous round", CURRENT_LOTTERY_NUMBER = JSON.parse(res).lotteryNumber));
	  var winners_arr = new Array();
	  var winners_string = "";
	  for (var i = 0; i < CURRENT_GUESSES_ARRAY.length; i++) {
		//console.log(CURRENT_GUESSES_ARRAY[i]); 
		if (CURRENT_GUESSES_ARRAY[i].number != CURRENT_LOTTERY_NUMBER ){			
			winners_arr.push(CURRENT_GUESSES_ARRAY[i]);
			winners_string += CURRENT_GUESSES_ARRAY[i].name;
			if (i+1 < CURRENT_GUESSES_ARRAY.length){
				winners_string += ", ";
			}
		}
		document.getElementById("winners").innerHTML = winners_string;
	  }
	  console.log(winners_string);
	  console.log(winners_arr);
	  countdown();
	//doSomething();
} else {
	targetElementId.innerHTML = "New winner in " + timeLeft + "s..";
	timeLeft--;
}
}
};

function submit(){
	var guess = new Array();
	guess["name"] = document.getElementById("name").value;;
	guess["number"] = document.getElementById("number").value;;
	CURRENT_GUESSES_ARRAY.push(guess);

}

/*function getLotteryNumber(){

}*/