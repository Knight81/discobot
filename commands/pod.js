module.exports = {
    name: 'pod',
    description: "Astronomy pic of the day",
    async execute(message, args) {
        const fetch = require('node-fetch');
        const secrets = require('../secrets.js');
        const querystring = require('querystring');
        const Discord = require('discord.js');
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        let date;

        if(args.length > 0){
            if(this.isValidDate(args[0])){
                date = args[0];
            } else{
                return message.channel.send("Incorrect date entered, date should be in YYYY-MM-DD");
            }
        }

        //Astronomy pic of the day

        const query = querystring.stringify({ api_key: secrets.nasaToken, date: date, hd: true });

        const list = await fetch(`https://api.nasa.gov/planetary/apod?${query}`).then(response => response.json());

		const embed = new Discord.MessageEmbed()
            .setColor('#EFFF00')
            .setDescription(list.title)
			.setTitle("Astronomy pic of the day")
			.setImage(list.url)
			.addFields(
                { name: 'Explanation', value: trim(list.explanation, 1024) },
                { name: 'Date', value: trim(list.date, 1024) },
			);
		message.channel.send(embed);
    },
    isValidDate(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
    }
}