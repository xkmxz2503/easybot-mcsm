/// <reference path="../easybot-sdk/easybot.d.ts" />

const config = {
  pluginName: '连接mcsm插件',
  version: '1.0.3',
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
            repeater.addChild(api.createStringInput("serverUrl", "mcsmweb URL", "请输入mcsm面板URL（例如：http://localhost:23333）"));
            repeater.addChild(api.createStringInput("apiKey", "API Key", "请输入mcsm账户API密钥"));
            repeater.addChild(api.createStringInput("daemonId", "节点ID", "请输入MCSM节点ID,可在mcsm面板实例基本信息最下方查看"));
            repeater.addChild(api.createRepeater("instanceList", "实例列表", "instanceList","服务器列表", (api, repeater) => {
            repeater.addChild(api.createStringInput("serverName", "服务器名称", "请输入服务器名称"));
            repeater.addChild(api.createStringInput("uuid", "实例ID", "请输入实例唯一ID,可在mcsm面板实例基本信息最下方查看"));
            repeater.addChild(api.createStringInput("groupuuid", "qq群号", "请输入qq群号"));
            repeater.addChild(api.createStringInput("ownerid", "主人qq", "请输入主人qq号"));
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