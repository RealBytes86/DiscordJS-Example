const { Client, CommandInteraction } = require("discord.js");
const { getLogger } = require("../Utils/Logger");
const { translateText } = require("../Utils/Locals");
const chalk = require("chalk");

module.exports = {
    once: false,
    rest: false,
    /**
     * @param {CommandInteraction} ctx
     * @param {Client} client 
     */
    execute: async(ctx, client) => {

        if(ctx.isChatInputCommand()) {
            command = client.commands.get(`${ctx.commandName}`)

            getLogger().info(`${chalk.yellow("[Commands]")} ${chalk.green(`${ctx.member.user.username} requested the ${ctx.commandName}.`)}`);

            if(!command) {
                await ctx.reply({content: translateText(ctx.locale, "command.outdated"), ephemeral: true});
                return;
            }

            await command.execute(ctx, client);
            return undefined;
        }

    }
}
