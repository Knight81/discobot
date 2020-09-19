// File to remindme command
module.exports = {
    name: 'mentionme',
    description: "Mention me command",
    execute(message, args){
        message.channel.send(`Hello <@${message.author.id}>`);
    }
}