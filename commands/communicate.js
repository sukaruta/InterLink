const db = require('quick.db')
const chanid = new db.table('channelid')
const channelee = chanid.get(`channelid.channels`)
const arran = channelee[Math.floor(Math.random() * channelee.length)]
const Discord = require('discord.js')

module.exports = {
    name: "communicate",
    description: "allows you to communicate to a different server.",
    aliases: ['c', 'com', 'co'],
    execute(message, args, client, searchString) {
        
        const curr = chanid.get(`channelid.${message.author.id}.curr`)
        if (!args[2]) return message.channel.send('No message to be sent!')
        if (curr[1]) {
            const curchan = client.channels.cache.find(channel => channel.id === curr[1])
            const filter = m => m.author.id === message.author.id
            const collecter = new Discord.MessageCollector(message.channel, filter, {
                time: 300000
            })

            collecter.on('collect', m => {
                curchan.send(`Anonymous replied: ${searchString}`)
            })
        }
        if (args[1] === "-") {
            message.channel.send('Since you did not specify a channel id, i will pick one from the servers i am in, this is stranger mode.')
            const channel = client.channels.cache.find(channel => channel.id === arran)
            chanid.push(`channelid.${message.author.id}.tempchans`, arran)
            if (curr.length > 1) {
                channel.send(`\`\`\`Anonymous sent a message: ${searchString}\`\`\``)
                return
            } else chanid.push(`channelid.${message.author.id}.curr`, arran) 
        } else try {
            if (!client.channels.cache.has(args[1])) return message.channel.send('Unrecognized channel id.')
            message.channel.send('ok')
            const channel = client.channels.cache.find(channel => channel.id === args[1])
            return channel.send(searchString)
        } catch (error) {
            console.log(error)
            message.channel.send(error)
        }
    }
}