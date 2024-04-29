const { Client } = require("discord.js");
const { getLogger } = require("../Utils/Logger");
const { configs } = require("../Configs/Config");

module.exports = {
    once: true,
    rest: false,
    /**
     * @param {Client} client 
     */
    execute: async(client) => {
        getLogger().info(`[Bot]: Name: ${client.user.username}`);
        getLogger().info(`[Bot]: Tag: ${client.user.tag}`);
        getLogger().info(`[Bot]: ID: ${client.user.id}`);
        getLogger().info(`[Bot]: Guilds: ${client.guilds.cache.size}`);
        client.user.setActivity(configs.ACTIVITY);
    }
}