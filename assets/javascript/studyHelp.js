var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var videoList = [];
var playerInfoList = [];

function infoList(file){
  for (var j = 0; j < file.length; j ++){
    playerInfoList[j] = {
      id: 'video' + j,
      height: '300',
      width: '350',
      videoId: file[j]
    };
    console.log("player info inside: " + playerInfoList[j]);
  }
  console.log("player info: " + playerInfoList);
}

function onYouTubeIframeAPIReady() {
    if (typeof playerInfoList === 'undefined') return;
    
    for (var i = 0; i < playerInfoList.length; i++) {
        var curplayer = createPlayer(playerInfoList[i]);
        players[i] = curplayer;
    }
}

var players = new Array();

function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
        height: playerInfo.height,
        width: playerInfo.width,
        videoId: playerInfo.videoId,
    });
}

function getVideoId(search){
  $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyAhV50luQmfnhbcgUdl5iApAY6bqT8EEVE',
            q: search + "help", //will use the subject and add help to help user look for tutorials
            part: 'snippet',
            maxResults: 5, //returns only 5 videos
            type: 'video',
            videoEmbeddable: true,
        },
        success: function(response){
          // console.log(data);
          var list = response.items;
          if(list){
              list.forEach(item=>{
              videoList.push(item.id.videoId);
            });
           }
          infoList(videoList);
          onYouTubeIframeAPIReady();
         },
        error: function(response){
            console.log("Request Failed");
        }
      });
}

$(document).ready(function () {
        //loop players array to stop them all
  getVideoId("math");
  $(players).each(function (i) {
    this.stopVideo();
  });
})