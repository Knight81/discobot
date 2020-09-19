module.exports = {
    name: 'helloworld',
    description: "Hello world test command",
    execute(message, args){
        message.channel.send('Hello madafaka!');
    }
}