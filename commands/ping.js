const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: 'ping',
    descrpition: 'Will check the bot\'s latency.',
    aliases: ['p', 'latency'],
    cooldown: 3,
    /**
     * 
     * @param { Message } message 
     * @param {*} _ 
     * @param {*} client 
     */
    async execute(message, _, client) {
        const pingEmbed = new MessageEmbed()
        .setTitle("Pong!")
        .addField("Client Latency", client.ws.ping.toString(), true);


        const msg = await message.channel.send({embeds: [
            pingEmbed
        ]});

        pingEmbed.addField("Discord Latency", (msg.createdAt - message.createdAt).toPrecision(3));

        msg.edit({embeds: []})
    }
}