/// <reference path="./types.d.ts" />
declare namespace puppeteer {
    /**
     * 浏览器是否在运行
     */
    function isRunning(): boolean

    /**
     * 获取已安装浏览器列表
     */
    function installed(): InstalledBrowser[]

    /**
     * 启动浏览器
     * @param browser 浏览器类型
     */
    function start(browser: SupportedBrowser): Promise<void>

    /**
     * 关闭浏览器
     */
    function close(): Promise<void>

    /**
     * 重启浏览器
     */
    function restart(): Promise<void>

    /**
     * 获取浏览器实例
     */
    function browser(): IBrowser | null

    /**
     * 渲染HTML字符串为图片
     * @param html HTML字符串
     * @param timeoutSeconds 超时时间（秒）
     * @param width 图片宽度
     * @param height 图片高度
     * @returns 图片Base64编码
     */
    function renderHtml(html: string, timeoutSeconds: number = 20, width: number | null = null, height: number | null = null, navigation: WaitUntilNavigation): Promise<string>

    /**
     * 渲染URL为图片
     * @param url URL字符串
     * @param timeoutSeconds 超时时间（秒）
     * @param width 图片宽度
     * @param height 图片高度
     * @returns 图片Base64编码
     */
    function renderUrl(url: string, timeoutSeconds: number = 20, width: number | null = null, height: number | null = null, navigation: WaitUntilNavigation): Promise<string>
}