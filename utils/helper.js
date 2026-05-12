/// <reference path="../easybot-sdk/easybot.d.ts" />
function formatTime(date = new Date()) {
  return date.toLocaleString('zh-CN');
}
function getTimestamp() {
  return Date.now();
}
function parseMcsmConfig() {
  // 1. 初始化结果数组：所有信息都在这一个数组里
  const instanceList = [];

  try {
    // 2. 获取并校验原始配置数据
    const data = config.getConfigValue("mcsmconfig", "mcsm_config");
    if (!data || (typeof data !== "object" && !Array.isArray(data))) {
      throw new Error("配置数据不是有效对象/数组");
    }

    // 3. 遍历主节点
    for (const key in data) {
      const serverObj = data[key];
      if (!serverObj) continue;

      // 提取当前主节点的核心参数
      const masterParams = {
        serverUrl: serverObj.serverUrl,
        apiKey: serverObj.apiKey,
        daemonId: serverObj.daemonId
      };

      // 4. 遍历该主节点下的子节点
      if (serverObj.instanceList) {
        for (const instKey in serverObj.instanceList) {
          const instanceObj = serverObj.instanceList[instKey];
          if (!instanceObj) continue;

          // 5. 核心逻辑：将主节点参数和子节点参数合并为一个新对象
          const fullInstance = {
            // 先展开主节点参数
            ...masterParams,
            // 再展开子节点自身参数
            serverName: instanceObj.serverName,
            uuid: instanceObj.uuid,
            groupuuid: instanceObj.groupuuid,
            ownerid: instanceObj.ownerid,
            use_regex: instanceObj.use_regex
          };

          // 存入结果数组
          instanceList.push(fullInstance);
        }
      }
    }

    // 6. 返回扁平化的结果
    return instanceList;

  } catch (error) {
    // 错误处理
    logger.error(
      "错误：解析 mcsm_config 失败！{0}，当前获取到的数据：{1}",
      error.message,
      JSON.stringify(data)
    );
    // 出错时返回空数组
    return [];
  }
  // 使用示例：
  // const instances = parseMcsmConfig();
  // for (const inst of instances) {
  //   console.log(inst.serverName, "属于", inst.serverUrl); // 直接读取
  // }
  //{
  // 【来自主节点】直接包含，无需查找
  //  serverUrl: "http://...",
  //apiKey: "xxx",
  //daemonId: "1",

  // 【来自子节点】自身的属性
  //serverName: "我的生存服",
  //uuid: "xxx-xxx",
  //groupuuid: "123456",
  //ownerid: "7890",
  //use_regex: false
  //}
}

async function httpRequest_on(inst) {
  const serverUrl = inst.serverUrl;
  const apiKey = inst.apiKey;
  const daemonId = inst.daemonId;
  const uuid = inst.uuid;
  const url = serverUrl + "/api/protected_instance/open?apikey=" + apiKey + "&X-Requested-With=XMLHttpRequest&Content-Type=application/json; charset=utf-8&uuid=" + uuid + "&daemonId=" + daemonId;
  logger.info(url);
  
  try {
    const response = await network.get(url);
    const status = response.status;
    const msg = response.data?.data || response.data || "操作完成";
    
    if (response.status === 200) {
      logger.info("服务器开启成功: " + inst.serverName);
      return { success: true, status, msg };
    } else {
      logger.error("服务器开启失败: " + inst.serverName + "，状态码: " + status);
      return { success: false, status, msg };
    }
  } catch (error) {
    logger.error("请求异常：" + error.message);
    return { success: false, status: -1, msg: "网络请求失败" };
  }
}

async function httpRequest_off(inst) {
  const serverUrl = inst.serverUrl;
  const apiKey = inst.apiKey;
  const daemonId = inst.daemonId;
  const uuid = inst.uuid;
  const url = serverUrl + "/api/protected_instance/stop?apikey=" + apiKey + "&X-Requested-With=XMLHttpRequest&Content-Type=application/json; charset=utf-8&uuid=" + uuid + "&daemonId=" + daemonId;
  logger.info(url);
  
  try {
    const response = await network.get(url);
    const status = response.status;
    const msg = response.data?.data || response.data || "操作完成";
    
    if (response.status === 200) {
      logger.info("服务器关闭成功: " + inst.serverName);
      return { success: true, status, msg };
    } else {
      logger.error("服务器关闭失败: " + inst.serverName + "，状态码: " + status);
      return { success: false, status, msg };
    }
  } catch (error) {
    logger.error("请求异常：" + error.message);
    return { success: false, status: -1, msg: "网络请求失败" };
  }
}

async function httpRequest_restart(inst) {
  const serverUrl = inst.serverUrl;
  const apiKey = inst.apiKey;
  const daemonId = inst.daemonId;
  const uuid = inst.uuid;
  const url = serverUrl + "/api/protected_instance/restart?apikey=" + apiKey + "&X-Requested-With=XMLHttpRequest&Content-Type=application/json; charset=utf-8&uuid=" + uuid + "&daemonId=" + daemonId;
  logger.info(url);
  
  try {
    const response = await network.get(url);
    const status = response.status;
    const msg = response.data?.data || response.data || "操作完成";
    
    if (response.status === 200) {
      logger.info("服务器重启成功: " + inst.serverName);
      return { success: true, status, msg };
    } else {
      logger.error("服务器重启失败: " + inst.serverName + "，状态码: " + status);
      return { success: false, status, msg };
    }
  } catch (error) {
    logger.error("请求异常：" + error.message);
    return { success: false, status: -1, msg: "网络请求失败" };
  }
}

async function httpRequest_kill(inst) {
  const serverUrl = inst.serverUrl;
  const apiKey = inst.apiKey;
  const daemonId = inst.daemonId;
  const uuid = inst.uuid;
  const url = serverUrl + "/api/protected_instance/kill?apikey=" + apiKey + "&X-Requested-With=XMLHttpRequest&Content-Type=application/json; charset=utf-8&uuid=" + uuid + "&daemonId=" + daemonId;
  logger.info(url);
  
  try {
    const response = await network.get(url);
    const status = response.status;
    const msg = response.data?.data || response.data || "操作完成";
    
    if (response.status === 200) {
      logger.info("服务器强制关闭成功: " + inst.serverName);
      return { success: true, status, msg };
    } else {
      logger.error("服务器强制关闭失败: " + inst.serverName + "，状态码: " + status);
      return { success: false, status, msg };
    }
  } catch (error) {
    logger.error("请求异常：" + error.message);
    return { success: false, status: -1, msg: "网络请求失败" };
  }
}


module.exports = { formatTime, getTimestamp, parseMcsmConfig, httpRequest_on, httpRequest_off, httpRequest_restart, httpRequest_kill };