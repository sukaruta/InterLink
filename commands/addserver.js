const db = require('quick.db')
const chanid = new db.table('channelid')

module.exports = {
    name: 'addserver',
    description: 'add a guild channel publically',
    aliases: ["add", "as", "list"],
    execute(message, args, client) {
        if (!args[1]) return message.channel.send('No server id found')
        if (!client.channels.cache.has(args[1])) return message.channel.send('that is either not a valid channel id or im not in the server which has that channel id.')
        const chans = chanid.get(`channelid.channels`)
        if (chans.includes(args[1])) return message.channel.send('That channel is already added in!')
        chanid.push(`channelid.channels`, args[1])
        return message.channel.send(`Added ${args[1]} as a channel!`)
    } 
}