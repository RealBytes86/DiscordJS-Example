const { Locale } = require("discord.js");
const fs = require("fs");

const prefix = {
    description: "command.description",
    name: "command.name",
    choices: "command.choices"
}

const LOCALS = {};
LOCALS["description"] = {};
LOCALS["name"] = {};
LOCALS["choices"] = {};

function initLanguage() {

    const languagesFiles = fs.readdirSync("./languages/").filter((file) => file.endsWith(".txt"));
    const languagesObject = Object.keys(Locale);
    const files = [];

    for(let i = 0; i < languagesFiles.length; i++) {
        const file = languagesFiles[i];
        for(let j = 0; j < languagesObject.length; j++) {
            const lanObject = languagesObject[j];
            if(file.slice(0, -4).toUpperCase() === Locale[lanObject].toUpperCase()) {
                files.push(Locale[lanObject] + ".txt");
                break;
            }
        }
    }

    for(let i = 0; i < files.length; i++) { 
        const readFile = fs.readFileSync(`./languages/${files[i]}`, "utf-8").trim().replace(/\r/g, '').split('\n');
        const language = files[i].slice(0, -4);
        LOCALS[language] = {};
        for(let r = 0; r < readFile.length; r++) { 
            const text = readFile[r];
            const index = text.indexOf("=");
            if(index !== -1) {

                const property = text.substring(0, index).trim();

                if(property.includes(".") === false) return;
                
                const value = text.substring(index + 1).trim();

                if(value.length === 0 || value === "") return;

                if(property.startsWith("#")) {
                    continue;
                    
                } else if(property.startsWith(prefix.description)) {

                    const prefixName = property.slice(prefix.description.length + 1).trim();

                    if(LOCALS["description"].hasOwnProperty(prefixName) === false) {
                        LOCALS["description"][prefixName] = {};
                    }

                    LOCALS["description"][prefixName][language] = value;

                } else if(property.startsWith(prefix.name)) {

                    const prefixName = property.slice(prefix.name.length + 1).trim();

                    if(LOCALS["name"].hasOwnProperty(prefixName) === false) {
                        LOCALS["name"][prefixName] = {};
                    }

                    LOCALS["name"][prefixName][language] = value;

                } else if(property.startsWith(prefix.choices)) {

                    const prefixName = property.slice(prefix.choices.length + 1).trim();

                    if(LOCALS["choices"].hasOwnProperty(prefixName) === false) {
                        LOCALS["choices"][prefixName] = {};
                    }

                    LOCALS["choices"][prefixName][language] = value;

                } else {
                    LOCALS[language][property] = value;
                }
            }
        }
    }
}

function translateText(local = Locale.EnglishUS, property) {
    if(typeof local != "string" || local.length === 0) throw new Error("Invalid locale");
    if(LOCALS.hasOwnProperty(local) === false) return property;
    if(LOCALS[local].hasOwnProperty(property) === false) return property ;
    return LOCALS[local][property];
}

function translateDescriptionText(prefixName, language = null) {

    const description = LOCALS.description;

    if(description.hasOwnProperty(prefixName) === false) return null;

    if(language == null) {
        return description[prefixName];
    } else {
        if(typeof language != "string" || language.length === 0) throw new Error("Invalid locale");
        if(description[prefixName].hasOwnProperty(language) === false) {
            return prefixName;
        } else {
            return description[prefixName][language];
        }
    }
}


function translateChoicesText(prefixName, language = null) {

    const choices = LOCALS.choices;

    if(choices.hasOwnProperty(prefixName) === false) return null;

    if(language == null) {
        return choices[prefixName];
    } else {
        if(typeof language != "string" || language.length === 0) throw new Error("Invalid locale");
        if(choices[prefixName].hasOwnProperty(language) === false) {
            return prefixName;
        } else {
            return choices[prefixName][language];
        }
    }
}

function translateNameText(prefixName, language = null) {

    const name = LOCALS.name;

    if(name.hasOwnProperty(prefixName) === false) return null;

    if(language == null) {
        return name[prefixName];
    } else {
        if(typeof language != "string" || language.length === 0) throw new Error("Invalid locale");
        if(name[prefixName].hasOwnProperty(language) === false) {
            return prefixName;
        } else {
            return name[prefixName][language];
        }
    }
}


function getLocales() {
    return LOCALS;
}

module.exports = { initLanguage, translateText, translateDescriptionText, getLocales, translateChoicesText, translateNameText };