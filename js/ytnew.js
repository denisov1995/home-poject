window.addEventListener('DOMContentLoaded', function() {

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

function onYouTubePlayerAPIReady() {
    if (document.getElementsByClassName) t = document.getElementsByClassName("youtube");
    else var t = function (t, e) {
        for (var a = [], i = new RegExp("(^| )" + e + "( |$)"), n = t.getElementsByTagName("*"), r = 0, s = n.length; r < s; r++) i.test(n[r].className) && a.push(n[r]);
        return a
    }(document.body, "youtube");
    var e = [];

    function a(t) {
        var a = t.target.id;
        t.data == YT.PlayerState.PLAYING && e.forEach(function (t, e) {
            t.id != a && t.pauseVideo()
        })
    }

    function i(t) {
        t.target.playVideo()
    }
    Array.from(t).forEach(function (n, r) {
       // t[r].style.backgroundImage = "url(https://i.ytimg.com/vi/" + t[r].id + "/sddefault.jpg)";
        var s = document.createElement("div");
        s.setAttribute("class", "play"), t[r].appendChild(s), t[r].onclick = function () {
            e[r] = new YT.Player(this, {
                height: this.style.height,
                width: this.style.width,
                videoId: this.id,
                playerVars: {
                    rel:0,
                    enablejsapi:1
                },
                events: {
                    onReady: i,
                    onStateChange: a
                }
            })
        }
    })
}

