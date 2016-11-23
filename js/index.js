var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

for (var i = 0; i < streamers.length; i++) {
  (function(i) { //protects the i, otherwise it keeps looping before the getJSON
    var streamersArrayName = streamers[i];
    $.getJSON("https://wind-bow.hyperdev.space/twitch-api/channels/" + streamersArrayName + "?callback=?", function(channels) {
      $.getJSON("https://wind-bow.hyperdev.space/twitch-api/streams/" + channels.display_name + "?callback=?", function(streams) {
        var displayName = channels.display_name;
        var url = channels.url;
        var id = channels._id;
        var logo = channels.logo;
        var streamOn = true;
        var game;
        var status;
        if (streams.stream == null) {
          streamOn = false;
        } else{
          game = streams.stream.game;
          status = streams.stream.channel.status;
        }
        $.fn.addChannelData(displayName, url, logo, streamOn, game, streamersArrayName, status);

      });
    });
  })(i);
};

$.fn.addChannelData = function(displayName, url, logo, streaming, game, arrayName, status) {
  if (displayName === undefined) {
    $("#streamersList").append("<div class='doesNotExist text-center'>" + arrayName + " does not exist </div>");
  } else if (!streaming) {
    $("#streamersList").append("<a href='" + url + "' target='_blank'><div class='falseStream'><img class='logo' src='" + logo + "'/> " + displayName + "</div></a>");
  } else {
    $("#streamersList").append("<a href='" + url + "' target='_blank'><div class='trueStream'><img class='logo' src='" + logo + "'/>" + displayName + " is streaming " + game + ": " + status + " </div></a>");
  }
}