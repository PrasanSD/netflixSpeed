(function() {  
	let vidSpeed = speed => {
		document.querySelectorAll('video').forEach(v=>v.playbackRate=speed);
	}

	browser.runtime.onMessage.addListener(message => vidSpeed(message.speed));
})();