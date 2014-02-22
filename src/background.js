function setAlarm() {
    chrome.alarms.create('Midnight', {
        periodInMinutes: 1
    });
}

chrome.runtime.onInstalled.addListener(function(details) {
	setAlarm();
});

chrome.runtime.onStartup.addListener(function(details) {
	setAlarm();
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    var page_url = "http://stanfordflipside.com/category/puzzles/";

    if (alarm.name === 'Midnight') {
        chrome.tabs.create({
            url: page_url,
            active: false
        });
    }
});