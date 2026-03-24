/// <reference path="../easybot-sdk/easybot.d.ts" />

bus.on("enable", () => {
    const basic = form.createFormData("基础配置", "basic")
    form.createForm("基础配置", basic, "基础配置数据", (api, data) => {
        data.addChild(api.createToggle("disable_chinese_name", "禁用中文名字", "是否禁止名字中包含中文的玩家进入游戏", (api, select) => {
            select.trueLabel = "是"
            select.falseLabel = "否"
        }))

        data.addChild(api.createStringInput("chinese_name_kick_reason", "中文名字踢出原因", "中文名字被踢出游戏时的提示信息", (api, input) => {
            input.defaultValue = "§c您不可以使用包含中文的名字!"
        }))

        data.addChild(api.createRepeater("name_blacklist", "名字黑名单【额外】", "name_blacklist_extra", "包含的名字将被禁止加入游戏", (api, list) => {
            list.addChild(api.createStringInput("name", "规则", "玩家名字或正则表达式(需开启)", (api, input) => {
                input.defaultValue = "Steve"
            }))
            list.addChild(api.createStringInput("kick_reason", "踢出原因", "玩家被踢出游戏时的提示信息", (api, input) => {
                input.defaultValue = "§c您被管理员加入了黑名单!"
            }))
            list.addChild(api.createToggle("use_regex", "使用正则表达式", "是否使用正则表达式匹配名字", (api, select) => {
                select.trueLabel = "是"
                select.falseLabel = "否"
            }))
        }))
    })
})


function createKick(reson) {
    const typeName = "EasyBot.Bridge.Packet.Result.PlayerLoginResultPacket, EasyBot.Bridge";
    const target = dotnet.System.Type.GetType(typeName);
    const packet = dotnet.System.Activator.CreateInstance(target)
    packet.Kicked = true
    packet.KickMessage = reson
    return packet
}

bus.on("player_login", (server, playerName, uuid) => {

    const enabledKickChineseName = config.getConfigValue("basic", "disable_chinese_name")
    if (enabledKickChineseName) {
        // 用正则判断名字是否只包含 a-Z or 0-9 && _ -
        const regex = /^[a-zA-Z0-9_ -]+$/
        if (!regex.test(playerName)) {
            const kickReason = config.getConfigValue("basic", "chinese_name_kick_reason")
            return createKick(kickReason)
        }
    }

    const nameBlacklist = config.getArray("basic", "name_blacklist")
    for (const item of nameBlacklist) {
        logger.info(JSON.stringify(item))
        const settingsName = item.name
        const useRegex = item.use_regex
        if (useRegex) {
            const regex = new RegExp(settingsName)
            if (regex.test(playerName)) {
                const kickReason = item.kick_reason
                return createKick(kickReason)
            }
        } else {
            if (playerName === settingsName) {
                const kickReason = item.kick_reason
                return createKick(kickReason)
            }
        }
    }

})