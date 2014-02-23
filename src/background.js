var tabId = null;

function setAlarm() {
    chrome.alarms.create('DailyCheck', {
        periodInMinutes: 1440
    });

    chrome.alarms.getAll(function(alarms) {
        console.log(alarms);
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
        console.log("Opened in tab " + tabId);
        window.setInterval(close, 12000);
    }
});