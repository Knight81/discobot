// File to remindme command
module.exports = {
    name: 'remindme',
    description: "Remind me command",
    execute(message, args){
        message.channel.send('Hello madafaka!');
    }
}