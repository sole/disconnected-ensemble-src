// FRONT-END APP //

var mainElement;

var toys = [
	{
		audioConstructor: require('openmusic-theremin'),
		webComponent: require('openmusic-theremin-ui'),
		tag: 'openmusic-theremin-ui',
		name: 'Theremin'
	}
];


window.addEventListener('load', init);

// this is mega teeeeemporaryyy

function init() {
	
	mainElement = document.querySelector('main');

	toys.forEach(function(toy) {
		var button = document.createElement('button');
		button.innerHTML = toy.name;
		button.addEventListener('click', function() {
			useToy(toy.name, toy.audioConstructor, toy.tag);
		});
		toy.webComponent.register(toy.tag);
		mainElement.appendChild(button);
	});

}

function useToy(name, audioConstructor, tagName) {

	var ac = new AudioContext();
	var toy = audioConstructor(ac);
	var gain = ac.createGain();
	gain.gain.value = 0.10;

	// TODO replace this with fancy audio limiter blabla
	gain.connect(ac.destination);
	toy.connect(gain);

	mainElement.innerHTML = '<h1>' + name + '</h1>';
	var toyUI = document.createElement(tagName);

	toyUI.attachTo(toy);

	mainElement.appendChild(toyUI);
	
}
