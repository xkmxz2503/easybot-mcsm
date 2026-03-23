const { formatTime, randomInt } = require('../utils/helper.js');
const { getConfig } = require('../utils/config.js');

function handleTimeCommand() {
  const currentTime = formatTime();
  logger.info(`当前时间: ${currentTime}`);
  return currentTime;
}
function handleInfoCommand() {
  const name = getConfig('pluginName');
  const version = getConfig('version');
  logger.info(`插件信息: ${name} v${version}`);
  return { name, version };
}
module.exports = {
  handleTimeCommand,
  handleInfoCommand
};