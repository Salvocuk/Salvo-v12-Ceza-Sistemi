const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");

module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı Belirtin`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  let jaildekiler = jdb.get(`jail`) || [];
  let tempjaildekiler = jdb.get(`tempjail`) || [];
  uye.roles.set("KAYITSIZ ROL ID" || []).catch();
  if (jaildekiler.some(j => j.includes(uye.id))) jdb.set(`jail`, jaildekiler.filter(x => !x.includes(uye.id)));
  if (tempjaildekiler.some(j => j.id === uye.id)) jdb.set(`tempjail`, tempjaildekiler.filter(x => x.id !== uye.id));
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından Cezalıdan Çıkarıldı`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("LOG KANAL ID").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından Cezalıdan Çıkarıldı`)
  .setFooter(`Safe Code ❤️ Salvatore`));
};
exports.config = {
  name: "unjail",
  guildOnly: true,
  aliases: ["unjail"],
  description: "Belirtilen Kullanıcıyı Cezalıdan Çıkarır."
};