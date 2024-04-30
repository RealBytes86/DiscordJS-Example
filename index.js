const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { configs } = require("./Configs/Config");
const { eventHandler } = require("./Handlers/eventHandler")
const { commandHandler } = require("./Handlers/commandHandler")
const { initLanguage } = require("./Utils/Locals")

console.clear()

const intents = [
    GatewayIntentBits.AutoModerationConfiguration, 
    GatewayIntentBits.AutoModerationExecution, 
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
]

const client = new Client({
    intents: intents
})

client.commands = new Collection()

async function main() {
    initLanguage()
    eventHandler(client);
    commandHandler(client);
    await client.login(configs.TOKEN)
}

main()
