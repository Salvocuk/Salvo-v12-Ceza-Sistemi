  
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');

module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!reason) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı ve Sebep Belirtin`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  if (!uye) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      kdb.add(`kullanici.${message.author.id}.ban`, 1);
      kdb.push(`kullanici.${uye.id}.sicil`, {
        Yetkili: message.author.id,
        Sebep: reason,
        Ceza: "Ban",
        Zaman: Date.now()
      });
  client.channels.cache.get("787307124677148672").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Banlandı`)
  .setFooter(`Safe Code ❤️ Salvatore`));
} else {
      message.channel.send(new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
      .setDescription(`Lütfen Geçerli Bir Kullanıcı ve Sebep Belirtin`)
      .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
    };
    return message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`Lütfen Geçerli Bir Kullanıcı ve Sebep Belirtin`)
    .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  };
  if(!uye.bannable) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Bu Kullanıcıyı Banlamak için Yeterli Yetkim Yok`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  uye.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${message.author.id}> Tarafından ${sebep} Sebebiyle Sunucudan Yasaklandın`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  uye.ban({reason: reason}).catch();
  kdb.add(`kullanici.${message.author.id}.ban`, 1);
  kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "BAN",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Banlandı`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("787307124677148672").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Banlandı`)
  .setFooter(`Safe Code ❤️ Salvatore`));
};
exports.config = {
  name: "ban",
  guildOnly: true,
  aliases: ["ban"],
  description: "Belirtilen Kullanıcıya Ban Atar"
};