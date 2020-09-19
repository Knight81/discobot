
const secrets = require('./secrets.js');

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
});


client.on("message", message => {

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



client.login(secrets.botToken);

