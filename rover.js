class Rover {
constructor(position, mode, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = generatorWatts;
    
   } 
receiveMessage(message) {
  let name = message.name;
  let commands = message.commands;
  
  let result = {};
  let results = [];
  for (let i=0; i<commands.length; i++){
    
    if (commands[i].commandType ===
    'MOVE'){
        if (this.mode === 'NORMAL'){
          this.position = commands[i].value;
          result = {completed: true};
        } else if (this.mode = 'LOW_POWER'){
          result = {completed: false};
        }
    } else if (commands[i].commandType === 'STATUS_CHECK'){
      result = {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}};
    } else if(commands[i].commandType === 'MODE_CHANGE'){
      this.mode = commands[i].value;
        result = {completed: true};
    } else{
      result = {completed: false};
    } 

  results.push(result); 
      
  } 

  return {message: name, results};  
  } 

}
module.exports = Rover;