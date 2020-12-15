const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");

module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı Belirtin`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  let jaildekiler = jdb.get(`jail`) || [];
  await uye.roles.set(uye.roles.cache.has("BOOSTER ROL ID") ? ["JAIL ROL ID", "BOOSTER ROL ID"] : ["JAIL ROL ID"]).catch();
  if (!jaildekiler.some(j => j.includes(uye.id))) {
    jdb.push(`jail`, `j${uye.id}`);
    kdb.add(`kullanici.${message.author.id}.jail`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Sebep: reason,
      Ceza: "Jail",
      Zaman: Date.now()
    });
  };
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Cezalıya Atıldı`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("LOG KANAL ID").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Cezalıya Atıldı`)
  .setFooter(`Safe Code ❤️ Salvatore`));
};
exports.config = {
  name: "jail",
  guildOnly: true,
  aliases: ["jail"],
  description: "Belirtilen Kullanıcıya Jail Atar"
};