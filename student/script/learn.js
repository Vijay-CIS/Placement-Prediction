var API_KEY = "AIzaSyCQ0r7qt7AVCeOz71Hkpnxc9VgWzaUtpNo";
var video = "";
var videos = $("#videos");

$(document).ready(function () {
  document.getElementById("videos");
});

function videoSearch() {
  var search = $("#input").val();
  callAPI(API_KEY, search, 12);
}

function callAPI(key, search, maxResults) {
  $("#videos").empty();
  $.get(
    "https://www.googleapis.com/youtube/v3/search?key=" +
      key +
      "&type=video&part=snippet&maxResults=" +
      maxResults +
      "&q=" +
      search,
    function (data) {
      data.items.forEach((item) => {
        video = `
          <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}"  frameborder="0" allowscreen></iframe>
             `;
        $("#videos").append(video);
      });
    }
  );
}
