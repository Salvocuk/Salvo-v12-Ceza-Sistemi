const { MessageEmbed } = require("discord.js");
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");

module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!uye || !reason) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı Belirtin`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  if(!uye.kickable) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Bu Kullanıcıyı Kicklemek için `)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  await uye.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Kicklendin`)
  .setFooter(`Safe Code ❤️ Salvatore`))
  uye.kick({reason: reason}).catch();
  kdb.add(`kullanici.${message.author.id}.kick`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Sebep: reason,
      Ceza: "Kick",
      Zaman: Date.now()
    });
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Kicklendi`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("LOG KANAL ID").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Kicklendi`)
  .setFooter(`Safe Code ❤️ Salvatore`));
};
exports.config = {
  name: "Kick",
  guildOnly: true,
  aliases: ["Kick"],
  description: "Belirtilen Kullanıcıya Kick Atar"
};