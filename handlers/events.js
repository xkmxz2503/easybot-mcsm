/// <reference path="../easybot-sdk/easybot.d.ts" />
const { formatTime, parseMcsmConfig, httpRequest_on, httpRequest_off, httpRequest_restart, httpRequest_kill } = require('../utils/helper.js');
const { getAllConfig } = require('../utils/config.js');


function registerEvents() {
  bus.on('enable', () => {
    const time = formatTime();
    logger.info(`[${time}] 多文件插件已启用`);
  });

  bus.on('disable', () => {
    const time = formatTime();
    logger.info(`[${time}] 多文件插件已禁用`);
  });
}
function botEvent() {
  bus.on("group_message_event", async (event) => {
    const enabled = config.getConfigValue("mcsmconfig", "enabled")?? false;
    if (enabled === false) {
      logger.info("[MCSM配置检测] 功能未启用，已跳过事件处理");
      return;
    }else {
    const instances = parseMcsmConfig()?? [];
    const data = config.getConfigValue("mcsmconfig", "mcsm_config");
    if (!data) {
      logger.info("[MCSM配置检测] 错误：未获取到 mcsm_config 数据");
    } else {
      // 2. 输出数据长度（数组用 length，对象用键数量）
      const length = Array.isArray(data) ? data.length : Object.keys(data).length;
      logger.info("[MCSM配置检测] 数据长度: {0}", length);

    for (const inst of instances) {
      const serverName = inst.serverName ?? "未命名服务器";
      const ownerid = inst.ownerid ?? "未设置主人qq";
      const groupuuid = inst.groupuuid ?? "未设置qq群号";
      const use_regex = inst.use_regex;
      logger.info("[MCSM配置检测] 子节点 serverName: {0}", serverName);
      if (event.RawMessage === "开启 " + serverName && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === false) {
        await httpRequest_on(inst);
        event.Context.Reply(new MessageChain().Text("已执行开启服务器: " + serverName))
        logger.info("已执行开启服务器: " + serverName + " use_regex: " + use_regex);
        return;
        } else if (event.RawMessage === "关闭 " + serverName && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === false) {
        await httpRequest_off(inst);
        event.Context.Reply(new MessageChain().Text("已执行关闭服务器: " + serverName));
        return;
        } else if (event.RawMessage === "重启 " + serverName && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === false) {
        await httpRequest_restart(inst);
        event.Context.Reply(new MessageChain().Text("已执行重启服务器: " + serverName));
        return;
        }else if (event.RawMessage === "强制关闭 " + serverName && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === false) {
        await httpRequest_kill(inst);
        event.Context.Reply(new MessageChain().Text("已执行强制关闭服务器: " + serverName));
        return;
        }    
    }

    for (const inst of instances) {
      const serverName = inst.serverName ?? "未命名服务器";
      const ownerid = inst.ownerid ?? "未设置主人qq";
      const groupuuid = inst.groupuuid ?? "未设置qq群号";
      const use_regex = inst.use_regex;

      // 构建各操作的正则表达式
      const regexOn = new RegExp(`^开启 (${serverName})$`);
      const regexOff = new RegExp(`^关闭 (${serverName})$`);
      const regexRestart = new RegExp(`^重启 (${serverName})$`);
      const regexKill = new RegExp(`^强制关闭 (${serverName})$`);

      if (regexOn.test(event.RawMessage) && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === true) {
      await httpRequest_on(inst);
      event.Context.Reply(new MessageChain().Text("已执行开启服务器: " + serverName + " (正则匹配)"));
       logger.info(`[匹配分支] 开启 | serverName: ${serverName} | 消息: ${event.RawMessage}`); // 新增
      } else if (regexOff.test(event.RawMessage) && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === true) {
      await httpRequest_off(inst);
      event.Context.Reply(new MessageChain().Text("已执行关闭服务器: " + serverName + " (正则匹配)"));
      logger.info(`[匹配分支] 关闭 | serverName: ${serverName} | 消息: ${event.RawMessage}`); // 新增
      } else if (regexRestart.test(event.RawMessage) && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === true) {
      await httpRequest_restart(inst);
      event.Context.Reply(new MessageChain().Text("已执行重启服务器: " + serverName + " (正则匹配)"));
      logger.info(`[匹配分支] 重启 | serverName: ${serverName} | 消息: ${event.RawMessage}`); // 新增
      } else if (regexKill.test(event.RawMessage) && event.PeerId === groupuuid && event.SenderId === ownerid && use_regex === true) {
      await httpRequest_kill(inst);
      event.Context.Reply(new MessageChain().Text("已执行强制关闭服务器: " + serverName + " (正则匹配)"));
      logger.info(`[匹配分支] 强制关闭 | serverName: ${serverName} | 消息: ${event.RawMessage}`); // 新增
      return;
      }
    }
  }}
  });
}

module.exports = { registerEvents, botEvent };