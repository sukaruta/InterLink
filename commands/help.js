module.exports = {
    name: 'help',
    description: 'list of all the commands',
    aliases: ['h'],
    cooldown: 5,
    execute(message, args, client) {
        const name = args[1]
        const command = client.commands.get(name) || client.commands.find(c => c.aliases.includes(name))

        if (!command) {
            return message.channel.send(`Available Commands: \n${client.commands.map(c => c.name).join(", ")}`)
        }

        var data = []

        data.push(`**Name:** ${command.name}`)

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`)
        if (command.description) data.push(`**Description:** ${command.description}`)
        if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown} second(s)`)

        return message.channel.send(data, {split: true })
    }
}