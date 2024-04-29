const { Client } = require("discord.js");
const { getLogger } = require("../Utils/Logger");
const fs = require('fs');
const chalk = require('chalk');

/** 
 * @param {Client} client 
 */
function eventHandler(client) {
    const events = fs.readdirSync("./Events/").filter((file) => file.endsWith(".js"));
    for(let i = 0; i < events.length; i++) {

        const eventFile = events[i];
        const event = require(`../Events/${eventFile}`);
        const eventName = eventFile.slice(0, -3);

        if(event.rest) {
            if(event.once) {
                client.rest.once(eventName, async(...args) => event.execute(...args, client));
            } else {
                client.rest.on(eventName, async(...args) => event.execute(...args, client));
            }
        } else {
            if(event.once) {
                client.once(eventName, async(...args) => event.execute(...args, client));
            } else {
                client.on(eventName, async(...args) => event.execute(...args, client));
            }
        }

        getLogger().info(chalk.yellow("[HANDLER] ") + chalk.green(`${eventName} added.`));
    }
}

module.exports = { eventHandler };