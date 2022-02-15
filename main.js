require('dotenv').config();

// Quick.db for placeholder only, do not use in production. Switch to mongodb asap.

const { Intents, Client, Collection } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});
const fs = require('fs');

client.commands = new Collection();
client.cooldowns = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }

client.once('ready', () => {
    console.log(`InterLink Bot connected using client: ${client.user.username}#${client.user.discriminator}`);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    })
})

client.login(process.env.token);