/// <reference path="../easybot.d.ts" />

/**
 * 配置变化事件数据
 */
declare interface ConfigChangeEventData {
    /** 配置分组ID */
    groupId: string;
    /** 变化类型：created(创建), updated(更新), deleted(删除), enabled(启用), disabled(禁用) */
    changeType: "created" | "updated" | "deleted" | "enabled" | "disabled";
    /** 配置名称 */
    configName?: string;
    /** 配置ID */
    configId?: string;
    /** 新的配置数据（JSON字符串，仅在created和updated时提供） */
    newConfigData?: string;
    /** 旧的配置数据（JSON字符串，仅在updated和deleted时提供） */
    oldConfigData?: string;
    /** 该配置是否是用户正在使用的配置（是否已启用） */
    isEnabled?: boolean;
}

declare namespace bus {
    /**
     * 配置数据发生变化事件
     * @param event 事件名称
     * @param handler 事件处理函数，接收配置变化数据
     * @returns
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理配置变化
     *   - 当返回 `true` 时：**拦截配置变化处理**，EasyBot将跳过内部处理流程
     *   - 当返回 `string` 时：**拦截配置变换处理** ，返回的值表示拒绝原因
     */
    function on(event: "config_changed", handler: (data: ConfigChangeEventData) => void | boolean | undefined | string): void;

    /**
     * 特定分组的配置数据发生变化事件
     * @param event 事件名称，格式为 "config_changed:groupId"
     * @param handler 事件处理函数，接收配置变化数据
     * @returns
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理配置变化
     *   - 当返回 `true` 时：**拦截配置变化处理**，EasyBot将跳过内部处理流程
     *   - 当返回 `string` 时：**拦截配置变换处理** ，返回的值表示拒绝原因
     */
    function on(event: `config_changed:${string}`, handler: (data: ConfigChangeEventData) => void | boolean | undefined | string): void;

    /**
     * 配置被启用事件
     * @param event 事件名称
     * @param handler 事件处理函数
     *                 - groupId: 配置分组ID
     *                 - configId: 配置ID
     *                 - configName: 配置名称
     *                 - configData: 配置数据（JSON字符串）
     * @returns
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理配置启用
     *   - 当返回 `true` 时：**拦截配置启用处理**，EasyBot将跳过内部处理流程
     *   - 当返回 `string` 时：**拦截配置变换处理** ，返回的值表示拒绝原因
     */
    function on(event: "config_enabled", handler: (groupId: string, configId: string, configName: string, configData: string) => void | boolean | undefined | string): void;

    /**
     * 配置被禁用事件
     * @param event 事件名称
     * @param handler 事件处理函数
     *                 - groupId: 配置分组ID
     *                 - configId: 配置ID
     *                 - configName: 配置名称
     * @returns
     *   - 当返回 `void` 或 `undefined` 时：允许EasyBot继续处理配置禁用
     *   - 当返回 `true` 时：**拦截配置禁用处理**，EasyBot将跳过内部处理流程
     *   - 当返回 `string` 时：**拦截配置变换处理** ，返回的值表示拒绝原因
     */
    function on(event: "config_disabled", handler: (groupId: string, configId: string, configName: string) => void | boolean | undefined | string): void;
}