const Discord = require('discord.js')
const { prefix } = require('../config.json')

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.substring(prefix.length).split(' ')
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))
    const searchString = args.slice(2).join(' ')
    
    if (!command) return

    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection()) 
    }

    const now = Date.now()

    const timestamps = client.cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 0) * 1000

    if (timestamps.has(message.author.id)) {
        const expiratioDate = timestamps.get(message.author.id) + cooldownAmount

        if (now < expiratioDate) {
            const timeLeft = (expiratioDate - now) / 1000
            var sec = 'seconds'
            if (timeLeft.toFixed(1) <= 1.0) {
                sec = 'second'
            }
            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} ${sec} before reusing this command <@${message.author.id}>`)
        }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try {
        command.execute(message, args, client, searchString)
    } catch (error) {
        console.log(error)
    }

}