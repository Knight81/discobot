module.exports = {
    name: 'help',
    description: "Help command",
    execute(message, args){
        const user = message.author.id;
        console.log(user);
        message.author.send("There is no help available yet ¯\\_(ツ)_/¯");
    }
}