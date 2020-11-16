const fs = require('fs');
module.exports = {
    name: 'gabo',
    description: "gabo takench",
    async execute(message, args) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();

            // Create a dispatcher
            const dispatcher = connection.play(fs.createReadStream('resources\\peinan.mp3'));

            dispatcher.on('start', () => {
                console.log('peinan.mp3 is now playing!');
            });

            dispatcher.on('finish', () => {
                console.log('peinan.mp3 has finished playing!');
                connection.disconnect();
            });

            // Always remember to handle errors appropriately!
            dispatcher.on('error', console.error);

        }
    }
}