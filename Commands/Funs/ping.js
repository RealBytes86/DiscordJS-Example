const { SlashCommandBuilder, Locale, Client, CommandInteraction } = require("discord.js");
const { translateDescriptionText } = require("../../Utils/Locals");

module.exports = {
    offline: false,
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDMPermission(false)
    .setDescription(translateDescriptionText("ping", Locale.EnglishUS))
    .setDescriptionLocalizations(translateDescriptionText("ping"))
    ,
    /**
     * @param {CommandInteraction} ctx 
     * @param {Client} client 
     */
    execute: async (ctx, client) => {
        await ctx.deferReply({ephemeral: true});
        const fetch = await ctx.fetchReply();
        const ping = fetch.createdTimestamp - ctx.createdTimestamp;
        await ctx.editReply({content: `Client ${ping}ms | Websocket: ${client.ws.ping}ms`});
    }
}