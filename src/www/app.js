// FRONT-END APP //

// polyfilling just in case
require('webcomponents-lite');
require('openmusic-transport').register('openmusic-transport');

var mainElement;

var toys = [
	{
		audioConstructor: require('openmusic-theremin'),
		webComponent: require('openmusic-theremin-ui'),
		tag: 'openmusic-theremin-ui',
		name: 'Theremin'
	},
	{
		audioConstructor: require('openmusic-drum-machine'),
		webComponent: require('openmusic-drum-machine-ui'),
		tag: 'openmusic-drum-machine-ui',
		name: 'Drum Machine',
		transport: true
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
			useToy(toy.name, toy.audioConstructor, toy.tag, toy.transport);
		});
		toy.webComponent.register(toy.tag);
		mainElement.appendChild(button);
	});

}

function useToy(name, audioConstructor, tagName, withTransport) {

	var ac = new AudioContext();
	var toy = audioConstructor(ac);
	var limiter = ac.createDynamicsCompressor();

	limiter.connect(ac.destination);
	toy.connect(limiter);

	mainElement.innerHTML = '<h1>' + name + '</h1>';
	var toyUI = document.createElement(tagName);

	// TODO perhaps change it so all instruments have a ready() method instead
	if(toy.ready !== undefined) {
		toy.ready().then(function() {
			toyUI.attachTo(toy);
		});
	} else {
		toyUI.attachTo(toy);
	}

	mainElement.appendChild(toyUI);

	if(withTransport) {
		var transport = document.createElement('openmusic-transport');
		mainElement.appendChild(transport);

		transport.addEventListener('play', function() {
			toy.start();
		});

		transport.addEventListener('stop', function() {
			toy.stop();
		});

		transport.addEventListener('bpm', function(ev) {
			toy.bpm = ev.detail.value;
		});
	}
	
}
