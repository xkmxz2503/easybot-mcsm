/// <reference path="easybot-sdk/easybot.d.ts" />

// 基础依赖校验
if (!logger) {
  console.error('logger 未初始化');
}

const {
  handleTimeCommand,
  handleInfoCommand
} = require('./handlers/commands.js');

const { registerEvents, botEvent } = require('./handlers/events.js');
const { setConfig, configureEvents } = require('./utils/config.js');

logger.info('多文件插件被加载');

setConfig('pluginName', '我的多文件插件');
configureEvents();
registerEvents();
botEvent();

setTimeout(() => {
  handleTimeCommand();
  handleInfoCommand();
}, 2000);