const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  if (!args[0] || isNaN(args[0])) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı ID'si Belirtin`)
  .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
  let uye = await client.users.fetch(args[0]);
  if(uye) {
    let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi";
    message.guild.members.unban(uye.id).catch(err => message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`Belirtilen ID Numarasına Bağlı Bir Ban Bulunamadı`)
    .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000})));
    client.channels.cache.get("LOG KANAL İD").send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`<@!${uye.id}> İsimli Kullanıcının Banı <@!${message.author.id}> Tarafından Kaldırıldı`)
    .setFooter(`Safe Code ❤️ Salvatore`));
} else {
    message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`Lütfen Geçerli Bir Kullanıcı ID'si Belirtin`)
    .setFooter(`Safe Code ❤️ Salvatore`)).then(x => x.delete({timeout: 5000}));
    } 
};
exports.config = {
  name: "unban",
  guildOnly: true,
  aliases: ["unban"],
  description: "Belirtilen Kullanıcının Banını Kaldırır."
};