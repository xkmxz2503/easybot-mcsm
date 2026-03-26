/**
 * 插件配置API - 提供给JavaScript环境使用的配置读取接口
 */
declare namespace config {
    /**
     * 获取指定分组的配置数据（JSON字符串）
     * @param groupId 配置分组ID
     * @returns 配置数据JSON字符串，如果没有启用的配置则返回null
     */
    function getConfig(groupId: string): string | null;

    /**
     * 获取指定分组的配置数据（解析为JavaScript对象）
     * @param groupId 配置分组ID
     * @returns 配置数据对象，如果没有启用的配置则返回null
     */
    function getConfigObject(groupId: string): any | null;

    /**
     * 获取所有启用的配置数据（按GroupId分组）
     * @returns 包含所有配置分组的对象
     */
    function getAllConfigs(): { [groupId: string]: any };

    /**
     * 检查指定分组是否有启用的配置
     * @param groupId 配置分组ID
     * @returns 如果有启用的配置返回true，否则返回false
     */
    function hasConfig(groupId: string): boolean;

    /**
     * 获取配置值（支持点号分隔的路径）
     * 例如: getConfigValue("game_settings", "player.name")
     * @param groupId 配置分组ID
     * @param path 配置路径，使用点号分隔
     * @param defaultValue 默认值，如果配置不存在则返回此值
     * @returns 配置值或默认值
     */
    function getConfigValue(groupId: string, path: string, defaultValue?: any): any;

    /**
     * 获取字符串类型的配置值
     * @param groupId 配置分组ID
     * @param path 配置路径，使用点号分隔
     * @param defaultValue 默认值
     * @returns 字符串类型的配置值
     */
    function getString(groupId: string, path: string, defaultValue?: string): string;

    /**
     * 获取数字类型的配置值
     * @param groupId 配置分组ID
     * @param path 配置路径，使用点号分隔
     * @param defaultValue 默认值
     * @returns 数字类型的配置值
     */
    function getNumber(groupId: string, path: string, defaultValue?: number): number;

    /**
     * 获取整数类型的配置值
     * @param groupId 配置分组ID
     * @param path 配置路径，使用点号分隔
     * @param defaultValue 默认值
     * @returns 整数类型的配置值
     */
    function getInt(groupId: string, path: string, defaultValue?: number): number;

    /**
     * 获取布尔类型的配置值
     * @param groupId 配置分组ID
     * @param path 配置路径，使用点号分隔
     * @param defaultValue 默认值
     * @returns 布尔类型的配置值
     */
    function getBoolean(groupId: string, path: string, defaultValue?: boolean): boolean;

    /**
     * 获取数组类型的配置值
     * @param groupId 配置分组ID
     * @param path 配置路径，使用点号分隔
     * @returns 数组类型的配置值
     */
    function getArray(groupId: string, path: string): any[];
}