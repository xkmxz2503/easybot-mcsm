const { formatTime } = require('../utils/helper.js');
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
 bus.on("bridge_server_online", function(server, ip) {
    logger.info("服务器已上线: {0}, IP: {1}", server.Session, ip);
     
    // 获取服务器信息
    server.GetServerInfo().then(function(info) {
        logger.info("服务器名称: {0}, 版本: {1}", info.ServerName, info.ServerVersion);
    });
  });

}
function botEvent() { 
const config = getAllConfig();
bus.on("group_message_event", (event) => {
    if (event.RawMessage === "开启 " + config.instance.name) {
        event.Context.Reply(new MessageChain().Text("pong"));
    }
});
}
module.exports = { registerEvents, botEvent };