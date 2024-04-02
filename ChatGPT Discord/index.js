require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on("ready", () => {
    console.log(`Le bot est prêt!`);
});

client.on("messageCreate", async message => {
    if (message.author.bot || message.channel.id !== process.env.CHANNEL_ID) {
        return;
    }

    if (message.content.startsWith("!add ")) {
        const args = message.content.slice(5).trim().split(/ +/);
        if (args.length === 2 && message.mentions.roles.size === 1 && message.mentions.members.size === 1) {
            const role = message.mentions.roles.first();
            const member = message.mentions.members.first();

            try {
                await member.roles.add(role);
                await message.reply(`Le rôle ${role.name} a été ajouté à ${member.displayName}.`);
            } catch (error) {
                console.error(`Error: ${error}`);
                await message.reply(`Désolé, une erreur s'est produite lors de l'ajout du rôle. ${error.message}`);
            }
        } else {
            await message.reply("Le format de la commande est incorrect. Utilisation: `!add @role @personne`");
        }
    } 
    else if(message.content.startsWith("!help")) {
        try {
        await message.reply("Ce bot permet de poser des questions à ChatGPT 3.5. Il permet également de gérer les rôles. Pour ajouter un rôle à un membre, utilisez la commande `!add @role @personne`.");}
        catch (error) {
            console.error(`Error: ${error}`);
            await message.reply(`Désolé, une erreur s'est produite lors de l'ajout du rôle. ${error.message}`);
        }
    }
    else {
        let conversationLOG = [{ role: 'system', content: "Je suis un bot"}];

        try {
            await message.channel.sendTyping();
            const prevMessages = await message.channel.messages.fetch({ limit: 15 });

            prevMessages.reverse().forEach(msg => {
                if (msg.content.startsWith("!") || (msg.author.bot && msg.author.id !== client.user.id)) {
                    return;
                }

                const role = msg.author.id === client.user.id ? 'assistant' : 'user';

                const name = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/g, "");

                conversationLOG.push({ role, content: msg.content });
            });

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: conversationLOG
            });

            if (completion.choices.length > 0 && completion.choices[0].message) {
                await message.reply(completion.choices[0].message);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            await message.reply(`Désolé, je n'ai pas pu répondre à votre message. ${error.message}`);
        }
    }
});

client.login(process.env.TOKEN);
