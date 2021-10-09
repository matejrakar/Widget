var CURRENT_LOTTERY_NUMBER;
var CURRENT_LOT_NUM_TIME;
var CURRENT_GUESSES_ARRAY = new Array();

function startCountdown(){
targetElementId = document.getElementById("countdown");

var timeLeft = 10;

var timerId = setInterval(countdown, 1000);

async function countdown() {
if (timeLeft === 0) {
	timeLeft = 10;
	  const result = await this.getLotteryNumber();
	  document.getElementById("lotteryNumber").innerHTML = JSON.parse(result).lotteryNumber + " won previous round";
	  CURRENT_LOTTERY_NUMBER = JSON.parse(result).lotteryNumber;
	  CURRENT_LOT_NUM_TIME = JSON.parse(result).createdAt;
	  console.log(CURRENT_LOTTERY_NUMBER);
	  var winners_string = "";
	  for (var i = 0; i < CURRENT_GUESSES_ARRAY.length; i++) {
		if (CURRENT_GUESSES_ARRAY[i].number != CURRENT_LOTTERY_NUMBER ){			
			winners_string += CURRENT_GUESSES_ARRAY[i].name;
			if (i+1 < CURRENT_GUESSES_ARRAY.length){
				winners_string += ", ";
			}
		}
	  }
	  var data = new Object();
	  /*if(winners_string === ""){
		winners_string = "No lucky contestants.";
	  }*/
	  //document.getElementById("winners").innerHTML = winners_string;
	  data.winners = winners_string;
	  data.number = CURRENT_LOTTERY_NUMBER;
	  data.lot_num_time = CURRENT_LOT_NUM_TIME;
	  console.log("data.number ", data.number);
	  /*fetch("/widget/insertWinnersInDB.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
	  .then((response) => response.text())
      .then((res) => (console.log(res)));*/
	  const status = await this.insertWinnersInDB(data);
	  console.log(status);
	  setTimeout(1500); 
	  var all_winners = await this.getLastFiveWinnersFromDB(data);
	  console.log("all winners: ", all_winners);
	  document.getElementById("winners").innerHTML = all_winners;
	  all_winners = "";
	  CURRENT_GUESSES_ARRAY = [];
	  winners_string = "";
	  data = {};
	  countdown();
} else {
	targetElementId.innerHTML = "New winner in " + timeLeft + "s..";
	timeLeft--;
}
}
};

function submit(){
	var guess = new Array();
	guess["name"] = document.getElementById("name").value;
	guess["number"] = document.getElementById("number").value;
	CURRENT_GUESSES_ARRAY.push(guess);
	document.getElementById("name").value = "";
	document.getElementById("number").value = "";
}

async function getLotteryNumber(){
	return  fetch("/widget/getLotteryNumber.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
      .then((response) => response.text())
      .then((res) => {return res;});

}

async function insertWinnersInDB(data){
	return fetch("/widget/insertWinnersInDB.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
	  .then((response) => response.text())
      .then((res) => {return res;});
}

async function getLastFiveWinnersFromDB(data){
	return fetch("/widget/getLastFiveWinnersFromDB.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
	  .then((response) => response.text())
      .then((res) => {return res;});
}