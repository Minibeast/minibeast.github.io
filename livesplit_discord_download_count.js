var totalDownloads = 0;

var handleApiResponse = function() {
  if (xmlHttp.readyState === 4) {
    var releasesData = JSON.parse(xmlHttp.responseText);
    totalDownloads += releasesData.reduce(
      function (total, current) {
        return total + current.assets[2].download_count;
      },
      0
    );
      document.getElementById("download_count").innerText = totalDownloads + " downloads";
  }
};

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = handleApiResponse;
xmlHttp.open("GET", "https://api.github.com/repos/Minibeast/LiveSplit.Discord/releases");
xmlHttp.send();