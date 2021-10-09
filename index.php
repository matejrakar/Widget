<!DOCTYPE html>
<html>
<head>
	<title>Widget</title>
	<meta charset="utf-8" />
</head>
<body>
	<script src = "./js/widget.js" type = "text/javascript" ></script>
	<script>
		window.onload = function() {
			startCountdown();
   		}
	</script>
	<!--<script >startCountdown();</script>-->

	<h2 id = "countdown">neki</h2>
	<h3 id = "lotteryNumber">lotterynumber</h3><br>	
	<h3 id = "winners">winners</h3><br>	

	<!--<div id = "table"></div>-->
		
	<!--<form id = "form">-->
		<input type = "Name" id="name" placeholder = "Name"> 
		<input type = "Number" id="number" placeholder="# number"> <br>
		<button onclick="submit()">Submit</button>
	<!--</form>-->

	
</body>
</html>