
const express = require("express");
const app = express();
const secrets = require("./secret.json");

// https://old.discordjs.dev/#/docs/discord.js/14.11.0/typedef/Events
// https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

app.listen(3000, () => {
   console.log("Project is running!");
});

app.get("/", (req, res) => {
   res.send("<h1>Hello!</h1><p>this is my robot. </br>k bye</p>");
});

const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
   ],
});

client.once(Events.ClientReady, c => {
   console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
   if (!interaction.isChatInputCommand()) return;

   const duration = interaction.options.get("duration").value;
   const unit = interaction.options.get("unit").value;
   const message = interaction.options.get("message").value;

   await interaction.reply(message);
   const reply = await interaction.fetchReply();

   setTimeout(() => {
      try {
         reply.delete();
      } catch (error) {
         console.log("couldn't delete message");
         console.log(error);
      }
   }, duration * unit * 1000);
});

client.login(secrets.token);

exports.server = onRequest(app);
