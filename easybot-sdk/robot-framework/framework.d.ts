/// <reference path="../event-types.d.ts" />

declare interface Group {
    /**
     * 群唯一Id
     */
    Id: string;
    /**
     * 平台名称
     */
    Platform: string;
    /**
     * 群名称
     */
    Name: string;
    /**
     * 群头像
     */
    Avatar: string | null;
    /**
     * 是否启用
     */
    Enabled: boolean;
    /**
     * 成员数量
     */
    MemberCount: number;
    /**
     * 最大成员数量
     */
    MaxMemberCount: number;
}

/**
 * 机器人信息对象
 */
declare interface RobotProfile {
    /**
     * 机器人唯一Id
     */
    Id: string;
    /**
     * 机器人名称
     */
    Name: string;
    /**
     * 机器人是否激活
     */
    IsActive: boolean;
    /**
     * 机器人接收消息数量
     */
    Received: number;
    /**
     * 机器人发送消息数量
     */
    Sent: number;
    /**
     * 机器人启动时间
     */
    Started: Date;
}

/**
 * 抽象适配器接口
 */
declare interface IAdapter {
    /**
     * 适配器名字 如`OneBot11`
     */
    AdapterName: string;
    /**
     * 平台名字 如`qq`
     */
    PlatformName: string;
    /**
     * 启动适配器
     */
    Start(): Promise<void>;
    /**
     * 关闭适配器
     */
    Stop(): Promise<void>;
    /**
     * 重启适配器
     */
    Restart(): Promise<void>;
    /**
     * 获取机器人配置
     * @returns 机器人配置
     */
    GetProfile(): RobotProfile;
    /**
     * 获取所有群
     * @returns 所有群
     */
    GetGroupsAsync(): Promise<Group[]>;
    /**
     * 获取适配器上下文
     * @returns 适配器上下文
     */
    GetAdapterContext(): IAdapterContext;
}


declare namespace framework {
    /**
     * 获取适配器
     * @param platformName 平台名称 (目前内置qq)
     * @param adapterName 适配器名称 (目前内置onebot11)
     * @returns 适配器 如果平台不存在或没有适配器，则返回null
     */
    function GetAdapter(platformName: string | "qq", adapterName: "onebot11"): IAdapter | null;

    /**
     * 获取所有适配器
     * @returns 所有适配器
     */
    function GetAdapters(): IAdapter[];
}