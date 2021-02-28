var lastClicked = "";

var hackathon = document.getElementById("hackathon_desc");

var codeday_nov2019 = document.getElementById("codeday_nov2019");
codeday_nov2019.onclick = function() {
	var output = '<h2 style="text-align: center;"><a style="color: inherit;" href="https://www.codeday.org/" target="_blank">CodeDay DC</a></h2><h3 style="text-align: center;">November 9th - November 10th, 2019</h3><h2 style="text-align: center;">WON - Best in Class (Website)</h2><br><h3 style="text-align: center;">Team:</h3><p style="text-align: center;">Ian<br>Gandhar<br>Anthony<br>Kyle</p>'

	console.log(hackathon.style.display);

	if (lastClicked == "codeday_nov2019" && hackathon.style.display != "none")
	{
		hackathon.style.display = "none";
	}
	else
	{
		hackathon.style.display = "block";
		lastClicked = "codeday_nov2019";
	}

	hackathon.innerHTML = output;

}

var codeday_feb2020 = document.getElementById("codeday_feb2020");
codeday_feb2020.onclick = function() {
	var output = '<h2 style="text-align: center"><a style="color: inherit;" href="https://www.codeday.org/" target="_blank">CodeDay DC</a></h2><h3 style="text-align: center;">February 15th - February 16th, 2020</h3><h2 style="text-align: center;">WON - Best in Class (Application)</h2><br><h3 style="text-align: center;">Team:</h3><p style="text-align: center;">Ian<br>Kyle<br>Adam<br>Matthew N<br>Matthew C</p>'

	if (lastClicked == "codeday_feb2020" && hackathon.style.display != "none")
	{
		hackathon.style.display = "none";
	}
	else
	{
		hackathon.style.display = "block";
		lastClicked = "codeday_feb2020";
	}

	hackathon.innerHTML = output;

}

var hackmit_2020 = document.getElementById("hackmit_2020");
hackmit_2020.onclick = function() {
	var output = '<h2 style="text-align: center"><a style="color: inherit;" href="https://hackmit.org/" target="_blank">Hack MIT</a></h2><h3 style="text-align: center;">September 18th - September 20th, 2020</h3><h2 style="text-align: center;">LOST (No Prize)</h2><br><h3 style="text-align: center;">Team:</h3><p style="text-align: center;">Ian<br>Adam<br>Matthew<br>Rohit</p><br><h3 style="text-align: center"><a style="color: inherit;" href="https://github.com/MatthewNanas/SecAI" target="_blank">Code Link</a></h3>'

	if (lastClicked == "hackmit_2020" && hackathon.style.display != "none")
	{
		hackathon.style.display = "none";
	}
	else
	{
		hackathon.style.display = "block";
		lastClicked = "hackmit_2020";
	}

	hackathon.innerHTML = output;

}

var teenhacks_2020 = document.getElementById("teenhacks_2020");
teenhacks_2020.onclick = function() {
	var output = '<h2 style="text-align: center"><a style="color: inherit;" href="https://teenhacksli.com/" target="_blank">TeenHacks LI</a></h2><h3 style="text-align: center;">November 14th, 21st, 2020</h3><h2 style="text-align: center;">WON - Health Technology Track</h2><br><h3 style="text-align: center;">Team:</h3><p style="text-align: center;">Ian<br>Nicholas<br>Matthew<br>Rohit</p><br><h3 style="text-align: center"><a style="color: inherit;" href="https://devpost.com/software/pandemic-assistant" target="_blank">Devpost</a></h3>'

	if (lastClicked == "teenhacks_2020" && hackathon.style.display != "none")
	{
		hackathon.style.display = "none";
	}
	else
	{
		hackathon.style.display = "block";
		lastClicked = "teenhacks_2020";
	}

	hackathon.innerHTML = output;
}
