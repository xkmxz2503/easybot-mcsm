const config = {
  pluginName: '连接mcsm插件',
  version: '1.0.0',
  maxRetries: 3,
  timeout: 5000,
  name: "服务器名", // 服务器名（后续从表单获取）
  ula: "MCSM 前端链接", // MCSM 前端链接
  apiKey: "API Key", // API Key
  daemonId: "节点ID", // 节点ID
  uuid: "实例唯一uuid" // 实例UUID
};
function getConfig(key) { return config[key]; }
function setConfig(key, value) { config[key] = value; }
function getAllConfig() { return { ...config }; }
function configureEvents() {
  bus.on("enable", () => {
    const basic = form.createFormData("基础配置", "basic", null);
    form.createForm("基础配置", basic, "插件基础设置", (api, data) => {
        // 添加一个开关

        data.addChild(api.createToggle("enabled", "启用功能", "是否启用此功能", (api, toggle) => {
            toggle.defaultValue = true;
            toggle.trueLabel = "开启";
            toggle.falseLabel = "关闭";
        }));
        
        // 添加一个文本输入
        data.addChild(api.createStringInput("name", "服务器名", "你的服务器名称"));
        data.addChild(api.createStringInput("ula", "MCSM 前端链接", "请输入mcsm前端链接地址"));
        data.addChild(api.createStringInput("apiKey", "API Key", "请输入API密钥"));
        data.addChild(api.createStringInput("daemonId", "节点ID", "请输入节点ID"));
        data.addChild(api.createStringInput("uuid", "实例唯一uuid", "请输入实例唯一uuid"));
    });
});
}

module.exports = { getConfig, setConfig, getAllConfig, config, configureEvents };