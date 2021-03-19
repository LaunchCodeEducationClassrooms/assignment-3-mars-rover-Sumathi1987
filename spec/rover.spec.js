const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //Test 7
   it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98328);

    expect(rover.position).toEqual(98328);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  // Test 8
  it("response returned by receiveMessage contains name of message", function() { 
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK') ]; 
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);   
let response = rover.receiveMessage(message);

expect(response.message).toEqual('Test message with two commands');
});
  //Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover();
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE')];
    let message = new Message('Test 9',commands);

    expect(rover.receiveMessage(message).results.length).toEqual(2);
  });

  //Test 10
  it("responds correctly to status check command", function() {
    let rover = new Rover(50000);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test 10',commands);

    expect(rover.receiveMessage(message ).results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 50000}}])
  });

   //Test 11
  it("responds correctly to mode change command", function() {
    let rover = new Rover();
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test 11',commands);

    expect(rover.receiveMessage(message).results[0].completed).toEqual(true);

    expect(rover.mode).toEqual('LOW_POWER');
  });

  
  //Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(567890);
    rover.mode = 'LOW_POWER';
    let commands = [new Command('MOVE', 567890)];
    let message = new Message('Test 12',commands);
    expect(rover.receiveMessage(message).results[0].completed).toEqual(false);

    expect(rover.position).toEqual(567890);
  });

  //Test 13
  it("responds with position for move command", function() {
    let rover = new Rover(567890);
    let commands = [new Command('MOVE', 567890)];
    let message = new Message('Test 13',commands);
    expect(rover.receiveMessage(message).results[0].completed).toEqual(true);

    expect(rover.position).toEqual(567890);
  });
  
});
