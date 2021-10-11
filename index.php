<!DOCTYPE html>
<html>
<head>
	<title>Widget</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<link rel="stylesheet" href="css/style.css"/>
</head>
<body>
	<script src = "./js/widget.js" type = "text/javascript" ></script>
	<script>
		window.onload = function() {
			startCountdown();
		}
	</script>

	<h2 id = "countdown" class = "center-text"></h2>

	<table id = "table" class="table">
		<thead>
			<tr>
				<th>Winners</th>
			</tr>
		</thead>
		<tbody>
			<tr id = "trid0">
				<td id = "tdid0" data-label="No data.">-</td>
			</tr>
		</tbody>
    </table>

	<input class = "float-child" type = "Name" id = "name" placeholder = "Name"> 
	<input class = "float-child" type = "Number" id = "number" placeholder = "# number"> <br>
	<p class = "center-text"><button class = "button" onclick="submit()">Submit</button></p>
</body>
</html>