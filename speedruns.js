$(document).ready(function(){
	$("#gameSelect").change(function(){
		let game_id = document.getElementById("gameSelect").value;

		if (game_id == "OoTR")
		{
			document.getElementById("pb_list").innerHTML = "<br><iframe class=\"ootr_iframe\" width=\"100%\" height=\"600px\" src=\"https://docs.google.com/spreadsheets/d/1ksAlrZ50XSR4aD5fkJJ4UlWvx9ZY54inlFPqJNDy4tU/htmlview\"></iframe>";
			$('.ootr_iframe').css('height', ($(window).height() / 2.5)+'px');
			return;
		}

		if (game_id.length == 0) {document.getElementById("pb_list").innerHTML = "<br>Invalid Request"}

		else {
			$.ajax({
				type: "GET",
				url: "https://minibeast.me/speedruns/index.json",
				dataType: "json",
				success: function(result) {
					var output_result = "<br>"
					result[game_id].forEach(i => {
						var game_link = "https://minibeast.me/speedruns/" + i["url"];

						var time_weblink = "<a style=\"color: inherit;\" target=\"_blank\" href=" + i["video"] + ">" + i["time"] + "</a>";
	        			var title_weblink = "<a style=\"color: inherit;\" target=\"_blank\" href=" + game_link + ">" + i["category"] + "</a>";

	        			output_result += title_weblink + " | " + time_weblink + " | " + i["platform"] + " | " + i["date"] + "<br><br>";
					});
					document.getElementById("pb_list").innerHTML = output_result;
				}
			});
		}
	});
	$("#gameSelect").trigger("change");
});