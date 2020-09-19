const Discord = require('discord.js');

const client  = new Discord.Client();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

var gabriUser = null;

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const prefix = '%';

client.once('ready', () => {
    console.log('Knightbot is online');
    client.users.fetch("163641996274040832", true, false).then(user => {
        console.log("Obtained gabri user");
        gabriUser = user;
        return user; });
});


client.on("message", message => {

    // Check if message is from Gabri, to initiate russian roulette
    if(gabriUser !== null && message.author == gabriUser){
        gabriRussianRoulette(message);
    }
    // Message is not a valid command, so we finish reading
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    console.log('Message received:'+message);

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    
    switch (command) {
        case 'helloworld':
            client.commands.get('helloworld').execute(message, args);
            break;

        case 'help':
            client.commands.get('help').execute(message, args);
            break;

        case 'mentionme':
            client.commands.get('mentionme').execute(message, args);
            break;
    
        default:
            break;
    }
    
});



client.login('MTg0OTQwNTgyMDE4MjIwMDMy.V0VdVg.1E-Ct0wA_QOYLH-8IHAE10E98JI');


// DEPRECATED 
function gabriRussianRoulette(message) {
    var random_boolean = Math.random() >= 0.5;
    
    if(random_boolean){

        message.channel.send(`A la puta calle ${gabriUser.username}`);
        message.member.voice.setChannel(null);

    } else {

        message.channel.send(`Te has librado esta vez ${gabriUser.username}`);

    }
}
