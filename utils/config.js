/// <reference path="../easybot-sdk/easybot.d.ts" />

const config = {
  pluginName: '连接mcsm插件',
  version: '1.0.0',
  maxRetries: 3,
  timeout: 5000,
};
function getConfig(key) { return config[key]; }
function setConfig(key, value) { config[key] = value; }
function getAllConfig() { return { ...config }; }
function configureEvents() {
  bus.on("enable", () => {
    const mcsmconfig = form.createFormData("基础配置", "mcsmconfig", null);
    form.createForm("基础配置", mcsmconfig, "插件基础设置", (api, data) => {
        // 添加一个开关
        data.addChild(api.createToggle("enabled", "启用功能", "是否启用此功能", (api, toggle) => {
            toggle.defaultValue = true;
            toggle.trueLabel = "开启";
            toggle.falseLabel = "关闭";
        }));
        
        // 添加一个文本输入
        data.addChild(api.createRepeater("mcsm_config", "服务器列表", "mcsm","基础配置", (api, repeater) => {
            repeater.addChild(api.createStringInput("serverUrl", "服务器URL", "请输入服务器URL"));
            repeater.addChild(api.createStringInput("apiKey", "API Key", "请输入API密钥"));
            repeater.addChild(api.createStringInput("daemonId", "节点ID", "请输入节点ID"));
            repeater.addChild(api.createRepeater("instanceList", "实例列表", "instanceList","服务器列表", (api, repeater) => {
            repeater.addChild(api.createStringInput("serverName", "服务器名称", "请输入服务器名称"));
            repeater.addChild(api.createStringInput("uuid", "实例唯一uuid", "请输入实例唯一uuid"));
            repeater.addChild(api.createToggle("use_regex", "是否正则", "是否启用正则匹配", (api, toggle) => {
                toggle.defaultValue = false;
                toggle.trueLabel = "开启";
                toggle.falseLabel = "关闭";
            }));
        }));
      }));
    });
  });
}

module.exports = { getConfig, setConfig, getAllConfig, config, configureEvents };