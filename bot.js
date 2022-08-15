const Discord = require("discord.js")
const bot = new Discord.Client({disableMentions: 'everyone'})
const config = require("./config.json")


bot.on("ready", () => {
    console.log("Loaded up!")
});

bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if (command === "yardım") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'nin komutları`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Shodie'nin pingine bakar`)
            .addField(`\`kick\``, `Kullanımı: **${config.prefix}kick [@Üye]**\n**${config.prefix}kick [@Üye][Sebep]**`)
            .addField(`\`ban\``, `Kullanımı: **${config.prefix}ban [@Üye]**\n**${config.prefix}ban [@Üyer][Sebep]**`)
            .addField(`\`ekle\``, `İstediğin kişiye istediğin rolü ver \nKullanımı: **${config.prefix}ekle [@Üye] [Rol]**`)
            .addField(`\`kaldır\``, `İstediğin kişiden istediğin rolü kaldır \nKullanımı: **${config.prefix}kaldır [@Üye] [Rol]**`)
            .addField(`\`sil\``, `2 ve 100 arasında mesajları siler \nKullanımı: **${config.prefix}sil [sayı]**`)
            .addField(`\`tkm\``, `Taş kağıt makas oynar`)
            .addField(`\`söyle\``, `Shodie'ye istediğin şeyi söyletir`)
        message.channel.send(helpEmbed)
    }

    if (command === "ping") {
        message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)
    }

    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("Yetersiz yetki (`Kullanıcı atma` yetkisine ihtiyacın var)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("Bir üye belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.kickable)
            return message.channel.send("Bu üyeyi atamazsın").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked, no reason was provided`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked for ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Yetersiz yetki (`Kullanıcı banlama` yetkisine ihtiyacın var)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("Bir üye belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.bannable)
            return message.channel.send("Bu üyeyi banlayamazsın").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} was banned, no reason was provided`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag} was banned for ${reason}`);
            })
        }
    }

    if (command === "ekle") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Yetersiz yetki (`Rolleri yönetme` yetkisine ihtiyacın var)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("Bir üye belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("Bir rol belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("Böyle bir rol bulunmuyor").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`Bu üye zaten ${add} rolüne sahip`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} rolü ${member.displayName} üyesine başarıyla verildi!`)
        })
    }

    if (command === "kaldır") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Yetersiz yetki (`Rolleri yönetme` yetkisine ihtiyacın var)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("Bir üye belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("Bir rol belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("Böyle bir rol bulunmuyor").then(msg => {
        msg.delete({ timeout: 30000 })
    })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`Bu üyede ${remove} rolü bulunmuyor`).then(msg => {
        msg.delete({ timeout: 30000 })
    })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} rolü ${member.displayName} üyesinden başarıyla kaldırıldı`)
        })
    }

    if (command === "söyle") {
    const text = args.join(" ")
    if(!text) return message.channel.send("Söyleyecek bir şey belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    message.channel.send(text)
    
    }
   
    if (command === "sil") {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Yetersiz yetki (`Mesajları yönetme` yetkisine ihtiyacın var)").then(msg => {
        msg.delete({ timeout: 30000 })
    })
    const number = args.join(" ")
    if(!number) return message.channel.send("Silmek için bir sayı belirtmedin").then(msg => {
        msg.delete({ timeout: 30000 })
    })
   message.channel.bulkDelete(number).catch(console.error)
   
   }
    
   if (command === "tkm") {
        const options = [
            "taş :shell: ",
            "kağıt :newspaper2:",
            "makas :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`You got ${option}`)
    }

});

bot.login(config.token)
