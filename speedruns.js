function ordinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n%100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function swap(arr, firstIndex, secondIndex){
	var temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;
}

function bubbleSortAlgo(arraaytest, arraaydata){
	var len = arraaytest.length,
	i, j, stop;
	for (i=0; i < len; i++){
		for (j=0, stop=len-i; j < stop; j++){
			if (arraaytest[j] > arraaytest[j+1]){
				swap(arraaytest, j, j+1);
				swap(arraaydata, j, j+1);
			}
		}
	}
	return arraaydata;
}

$(document).ready(function(){
	$("button").click(function(){
		let game_name = document.getElementById("gameSelect").value;
		var game_id = "";

		if (game_name == "Portal") {game_id = "4pd0n31e"}
		//else if (game_name == "Portal 2") {game_id = "om1mw4d2"}
		//else if (game_name == "Half-Life") {game_id = "n268nk6p"}
		//else if (game_name == "Super Mario 3D All Stars") {game_id = "m1zj4406"}
		else if (game_name == "Super Mario Odyssey") {game_id = "76r55vd8"}
		else if (game_name == "SMO Category Extensions") {game_id = "m1mxxw46"}
		else if (game_name == "Minecraft") {game_id = "j1npme6p"}
		else if (game_name == "SM64 Randomizer") {game_id = "9d3r20wd"}
		else if (game_name == "Super Mario 64") {game_id = "o1y9wo6q"}
		else if (game_name == "SM64 Online") {game_id = "4d77gld7"}
		else if (game_name == "Super Mario Sunshine") {game_id = "v1pxjz68"}
		else if (game_name == "Multiple Mario Games") {game_id = "9d3kxw1l"}

		if (game_name == "Ocarina of Time Randomizer")
		{
			document.getElementById("pb_list").innerHTML = "<br><iframe class=\"ootr_iframe\" width=\"100%\" height=\"600px\" src=\"https://docs.google.com/spreadsheets/d/1ksAlrZ50XSR4aD5fkJJ4UlWvx9ZY54inlFPqJNDy4tU/htmlview\"></iframe>";
			$('.ootr_iframe').css('height', ($(window).height() / 2)+'px');
			return;
		}

		if (game_id.length == 0) {document.getElementById("pb_list").innerHTML = "<br>Invalid Request"}

		else {
			category_array = [];

			document.getElementById("pb_list").innerHTML = "<br>Please wait for Speedrun.com..."

			$.ajax({
				type: "GET",
				url: "https://www.speedrun.com/api/v1/games/" + game_id + "/categories",
				dataType: "json",
				success: function(result) {
					result["data"].forEach(i => {
						if (i["type"] != "per-level") {
							category_array.push(i["name"]);
						}
					});

    				$.ajax({
	    				type: "GET",
	    				url: "https://www.speedrun.com/api/v1/users/qj2z577j/personal-bests?game=" + game_id + "&embed=platform,category.variables,level,players",
	    				dataType: "json",
	    				success: function(result) {
	    					output_result = "<br>"

	    					category_numbers = [];
	    					category_data = [];

	    					result["data"].forEach(i => {
	    						category_numbers.push(category_array.indexOf(i["category"]["data"]["name"]));
	    						category_data.push(i);
	    					});

	    					bubbleSortAlgo(category_numbers, category_data);

	    					category_data.forEach(i => {
	    						var title = "";
	    						var title_weblink = i["category"]["data"]["weblink"];
	    						var var_array = [];
	    						var place = ordinal(i["place"]);
	    						var player_array = [];


	    						title += i["category"]["data"]["name"];

	    						i["category"]["data"]["variables"]["data"].forEach(j => {
	    							if (j["is-subcategory"] == true && j["id"] in i["run"]["values"]) {
	    								var_array.push(j["id"]);
	    								var_array.push(i["run"]["values"][j["id"]]);

	    								title += " - " + j["values"]["values"][i["run"]["values"][j["id"]]]["label"];
	    							}
	    						});

	    						i["players"]["data"].forEach(p => {
	    							if (p["id"] != "qj2z577j") {
	    								player_array.push(p["names"]["international"]);
	    							}
	    						});

	    						time = i["run"]["times"]["primary_t"];
	    						time_result = time.toString().toHHMMSS();
	    						platform = i["platform"]["data"]["name"];

	    						if (i["run"]["system"]["emulated"]) {platform += " (Emulator)";}

	        					date = i["run"]["date"];

	        					time_weblink = "<a style=\"color: inherit;\" target=\"_blank\" href=" + i["run"]["weblink"] + ">" + time_result + "</a>";
	        					title_weblink = "<a style=\"color: inherit;\" target=\"_blank\" href=" + title_weblink + ">" + title + "</a>";

	        					if (player_array.length > 0) {
		        					players = "w/ ";
		        					player_array.forEach(y => {
		        						players += y + ", ";
		        					});

		        					players = players.substring(0, players.length - 2);

		        					output_result += "<i class=\"gaming\">" + title_weblink + "<span>" + players + "</span></i>";
		        					output_result += " | ";
		        				} else {
		        					output_result += title_weblink + " | ";
		        				}


	    						output_result += time_weblink + " (" + place.toString() + " place) | " + platform + " | " + date + "<br><br>";
	    					});

	    					if (game_id == "m1zj4406") {output_result += "<br><em>Up to date Super Mario 64 Personal Bests are on the SM64 Page, not the 3DAS Page.</em>"}

	    					document.getElementById("pb_list").innerHTML = output_result;

	    				}
    				});
				}
			});
		}
	});
});