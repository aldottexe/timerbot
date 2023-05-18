const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const { onRequest } = require("firebase-functions/v2/");

const commands = [
   {
      name: "timer",
      description: "delete a message after a certain ammount of time",
      options: [
         {
            name: "duration",
            description: "how long is the message up",
            type: ApplicationCommandOptionType.Integer,
            required: true,
         },
         {
            name: "unit",
            description: "hours/mins/secs",
            type: ApplicationCommandOptionType.Number,
            choices: [
               {
                  name: "sec",
                  value: 1,
               },
               {
                  name: "min",
                  value: 60,
               },
               {
                  name: "hr",
                  value: 3600,
               },
            ],
            required: true,
         },
         {
            name: "message",
            description: "the message you want to send",
            type: ApplicationCommandOptionType.String,
            required: true,
         },
      ],
   },
];

const rest = new REST({ version: 10 }).setToken(process.env.token);

(async () => {
   try {
      console.log("registering slash commands");

      await rest.put(
         Routes.applicationGuildCommands(
            process.env.client_id,
            process.env.guild_id
         ),
         { body: commands }
      );

      console.log("registered!");
   } catch (error) {
      console.log(error);
   }
})();
