
var chai = require('chai'),
    expect = require('chai').expect,
    sinon = require('sinon');

var sandbox;
var pomodoro;


beforeEach(function() {
	pomodoro = require("../src/pomodoro.js").create();

    sandbox = sinon.sandbox.create();
});

afterEach(function() {
    sandbox.restore();
});

describe("Crear un pomodoro", function() {
	 
	it("Un pomodoro dura 25 minutos por defecto", function() {
		pomodoro.setup();
		expect(pomodoro.getInitalTime()).to.equal(25 * 60);
	});
	
	it("Puedo crear un pomodoro con cualquier duración", function() {
		pomodoro.setup(50);
		expect(pomodoro.getInitalTime()).to.equal(50);
	});
});


describe("Parar un pomodoro", function() {
	
	var clock;

	beforeEach(function() {
    	
    	// timer mock
    	clock = sandbox.useFakeTimers();
    	
  	});
	 
	
	it("Un pomodoro recién creado está parado", function() {
		pomodoro.setup();
		expect(pomodoro.isStopped()).to.equal(true);
	});
	
	it("Al arrancar un pomodoro comienza la cuenta atrás", function() {
		pomodoro.setup();
		pomodoro.play();
		expect(pomodoro.isRunning()).to.equal(true);
		expect(pomodoro.isStopped()).to.equal(false);
	});
	
	it("Un pomodoro va descontando tiempo", function() {
		pomodoro.setup(60);
		pomodoro.play();
		clock.tick(5 * 1000); // 5 segundos
		expect(pomodoro.getTimeLeft()).to.equal(55);
	});
	
	it("Un pomodoro no termina si no ha sido arrancado previamente.", function() {
		pomodoro.setup(60);
		clock.tick(61 * 1000);
		expect(pomodoro.getTimeLeft()).to.equal(60);
	});
	
});

