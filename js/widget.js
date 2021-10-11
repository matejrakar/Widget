var CURRENT_GUESSES_ARRAY = new Array();

/**
 * @description Function calls another function to fill a table at page load
 * and then proceeds to set a countdown and starts it by calling countdown();
 */
async function startCountdown(){
	timeLeft = 30;
	await this.addLastFiveWinnersInTable();
	var timerId = setInterval(countdown, 1000);
};

/**
 * @description This function is always active; it counts down to the next lottery number, 
 * keeps track of current guesses by user and updates table based on raffle winners.
 */
async function countdown() {
	if (timeLeft === 0) {
		timeLeft = 30;
		var data = new Object();
		const result = await this.getLotteryNumber();
		data.lot_num = JSON.parse(result).lotteryNumber;
		data.lot_num_time = JSON.parse(result).createdAt;
		var winnersString = "";
		for (var i = 0; i < CURRENT_GUESSES_ARRAY.length; i++) {
			if (CURRENT_GUESSES_ARRAY[i].number === data.lot_num){			
				winnersString += CURRENT_GUESSES_ARRAY[i].name;
				if (i+1 < CURRENT_GUESSES_ARRAY.length){
					winnersString += ", ";
				}
			}
		}
		data.winners = winnersString;

		const status = await this.insertWinnersInDB(data);
		//setTimeout(1500); 

		await this.addLastFiveWinnersInTable();

		CURRENT_GUESSES_ARRAY = [];
		countdown();
	} else {
		document.getElementById("countdown").innerHTML = "New winner in " + timeLeft + "s..";
		timeLeft--;
	}
}

/**
 * @description Function fires when a button is pressed. It saves an entered guess
 * and clears entry fields.
 */
function submit(){
	var guess = new Array();
	guess["name"] = document.getElementById("name").value;
	guess["number"] = document.getElementById("number").value;
	CURRENT_GUESSES_ARRAY.push(guess);
	document.getElementById("name").value = "";
	document.getElementById("number").value = "";
}

/**
 * 
 * @returns Returns stringified JSON, containing a lottery number and lottery number generation time, 
 * recieved from getLotteryNumber.php.
 */
async function getLotteryNumber(){
	return  fetch("/widget/getLotteryNumber.php", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
      .then((response) => response.text())
      .then((res) => {return res;});

}

/**
 * 
 * @param {*} data is a JSON object, which contains string of winners, a generated lottery number and a lottery number time.
 * @returns Returns "success" if inserting in DB was successful.
 * @description Calls insertWinnersInDB.php, which inserts winners in database.
 */
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

/**
 * Function fetches data from getLastFiveWinnersFromDB.php and parses it to JSON. 
 * Then it sends this data as parameter to function setRowsAndTableData(allWinners).
 */
async function addLastFiveWinnersInTable(){
	fetch("/widget/getLastFiveWinnersFromDB.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
	  .then((response) => response.text())
      .then((allWinners) => {setRowsAndTableData(JSON.parse(allWinners))});
}

/**
 * 
 * @param allWinners JSON Array containing an object of two keys WINNERS and LOTTERY_NUMBER at each numbered key.  
 * @description Function gets JSON Array as a parameter and then proceeds to set table values based on that parameter. 
 * If needed, it creates <tr> and <td> elements for table and indexes them.
 */
function setRowsAndTableData(allWinners){
	var table = document.getElementById("table");
	for(var i = 0; i < Object.keys(allWinners).length; i++){
		if(document.getElementById("trid"+i) == null){
			var row = table.insertRow(i+1);
			row.id = "trid" + i.toString();
			cell = row.insertCell(0);
			cell.id = "tdid" + i.toString();
		}
		if(allWinners[i]["WINNERS"] == null){
			document.getElementById("tdid"+i).dataset.label = "No contestants."
		}
		else{
			document.getElementById("tdid"+i).dataset.label = allWinners[i]["WINNERS"];
		}
		document.getElementById("tdid"+i).innerHTML = "#" + allWinners[i]["LOTTERY_NUMBER"];
	}
}
