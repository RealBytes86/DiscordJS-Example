const { Client, REST, Routes } = require("discord.js");
const { getLogger } = require("../Utils/Logger");
const fs = require("fs");
const chalk = require("chalk");
const { configs } = require("../Configs/Config");

/**
 * 
 * @param {Client} client 
 */
async function commandHandler(client) {

    const saveSlashCommands = [];

    //Commands
    const categories = fs.readdirSync("./Commands/");

    for(let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const commandsFiles = fs.readdirSync(`./Commands/${category}`).filter((file) => file.endsWith(".js"));
        for(let cmdC = 0; cmdC < commandsFiles.length; cmdC++) {
            const commandFile = commandsFiles[cmdC];
            const commandName = commandFile.slice(0, -3);
            const command = require(`../Commands/${category}/${commandFile}`);
            client.commands.set(commandName, command);
            saveSlashCommands.push(command.data.toJSON());
            getLogger().info(chalk.yellow("[HANDLER] ") + chalk.green(`${commandName} added.`));
        }
    }

    const rest = new REST().setToken(configs.TOKEN);
    await rest.put(Routes.applicationCommands(configs.APP_ID), {body: saveSlashCommands});
} 

module.exports = { commandHandler };
