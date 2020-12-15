from flask import Flask, request
from flask_cors import CORS
from json import loads
import requests
from datetime import timedelta

app = Flask(__name__)
cors = CORS(app)

name_to_ids = [
    {
        "name": "Portal",
        "id": "4pd0n31e"
    },
    {
        "name": "Portal 2",
        "id": "om1mw4d2"
    },
    {
        "name": "Half-Life",
        "id": "n268nk6p"
    },
    {
        "name": "Super Mario 64",
        "id": "m1zj4406"
    },
    {
        "name": "Super Mario Odyssey",
        "id": "76r55vd8"
    },
    {
        "name": "SMO Category Extensions",
        "id": "m1mxxw46"
    }
]


def get_personal_bests(game_name):
    game_id = None
    for x in name_to_ids:
        if x["name"] == game_name:
            game_id = x["id"]

    if game_id is None:
        return "<br>Invalid Request"

    r = requests.get(f"https://www.speedrun.com/api/v1/users/qj2z577j/personal-bests?game={game_id}&embed=platform,"
                    f"category.variables,level")

    pb_info = loads(r.text)

    result = "<br>"

    for i in pb_info["data"]:
        is_level = False
        title = ""
        title_weblink = ""
        var_array = []
        place = i["place"]
        ordinal = lambda n: "%d%s" % (n, "tsnrhtdd"[(n // 10 % 10 != 1) * (n % 10 < 4) * n % 10::4])
        place = ordinal(place)

        if not isinstance(i["level"]["data"], list):
            is_level = True
            title_weblink = i["level"]["data"]["weblink"]
            title = i["level"]["data"]["name"] + ": "
        if game_id != "m1zj4406":
            title += i["category"]["data"]["name"]

        for j in i["category"]["data"]["variables"]["data"]:
            if j["is-subcategory"] and j["id"] in i["run"]["values"]:
                var_array.append(j["id"])
                var_array.append(i["run"]["values"][j["id"]])
                if game_id != "m1zj4406":
                    title += " - "
                title += j["values"]["values"][i["run"]["values"][j["id"]]]["label"]
        if not is_level:
            title_weblink = i["category"]["data"]["weblink"]

        time = i["run"]["times"]["primary_t"]
        time_result = str(timedelta(seconds=int(time)))
        platform = i["platform"]["data"]["name"]
        date = i["run"]["date"]

        time_weblink = "<a style=\"color: inherit;\" target=\"_blank\" href=" + i["run"]["weblink"] + ">" + time_result + "</a>"
        title_weblink = "<a style=\"color: inherit;\" target=\"_blank\" href=" + title_weblink + ">" + title + "</a>"

        result += f"{title_weblink} | {time_weblink} ({str(place)} place) | {platform} | {date}<br>"

    return result


@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "GET":
        return "Faulty Request"
    elif request.method == "POST":
        form_data = request.json
        return get_personal_bests(form_data["game"])


if __name__ == '__main__':
    app.run(host="167.71.107.25", port=7045)
