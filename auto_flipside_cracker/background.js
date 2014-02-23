var tabId = null;
var analyticsId = 'UA-36037014-4';


var _gaq = _gaq || [];
_gaq.push(['_setAccount', analyticsId]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function setAlarm() {
    chrome.alarms.create('DailyCheck', {
        periodInMinutes: 1440
    });
}

function navigate() {
    var page_url = "http://stanfordflipside.com/category/puzzles/";

    chrome.tabs.create({
        url: page_url,
        active: false
    }, function(tab) {
        tabId = tab.id;
    });
}

function close() {
    chrome.tabs.remove(tabId);
}

chrome.runtime.onInstalled.addListener(function(details) {
    setAlarm();
});

chrome.runtime.onStartup.addListener(function(details) {
    setAlarm();
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'DailyCheck') {
        navigate();
        window.setInterval(close, 12000);
    }
});