const Discord = require ('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();

client.login("NTUyODMwNDgxMjQzMDQ1OTA4.D2FPaQ.Kkrnji1PcIDzZ6lVYwO843A3j6c");

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée");

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée...`);

    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) =>{
    if(error) console.log(error);
    console.log(`${f.length} événement en chargement.`);

    f.forEach((f) => {
        const events = require (`./Events/${f}`);
        const event = f.split(".")[0];
    client.on(event, events.bind(null, client));
    });
});

client.on('guildMemberAdd', member => {
    let embed = new Discord.RichEmbed()
        .setDescription('Bienvenue **' + member.user.username + '** a rejoint le serveur ' + member.guild.name)
        .setFooter('Tu peux aller voir le règlement du serveur de la Team EnGinL, YouTube : https://www.youtube.com/channel/UC5_jSgnCfyhMqmKaUpbfJfg')
        member.guild.channels.get('552608306506760195').send(embed)
        member.addRole('552836511364546566')
});

client.on('guildMemberRemove', member => {
    let embed = new Discord.RichEmbed()
        .setDescription('**' + member.user.username + '** a quitté le serveur ' + member.guild.name)
        .setFooter('Wola que tes Mohamed Henni sale nulard !')
        member.guild.channels.get('552608306506760195').send(embed)
});
