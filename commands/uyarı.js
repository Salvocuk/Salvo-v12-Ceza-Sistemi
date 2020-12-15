  
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let sebep = args.splice(1).join(" ");
    if(!uye || !sebep) return message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`Lütfen Uyarılacak Bir Üye ve Bir Uyarı Sebebi Belirtin`)
    .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
      kdb.add(`kullanici.${message.author.id}.uyari`, 1);
      kdb.push(`kullanici.${uye.id}.sicil`, {
        Yetkili: message.author.id,
        Sebep: sebep,
        Ceza: "Uyarı",
        Zaman: Date.now()
      });
    message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Uyarıldı`)
    .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
    client.channels.cache.get("LOG KANAL ID").send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Uyarıldı`)
    .setFooter(`Safe Code ❤️ Salvatore`));
  
};

exports.config = {
  name: "uyarı",
  guildOnly: true,
  aliases: ["uyarı"],
  description: "Belirtilen Kullanıcıya Bir Uyarı Ekler"
};