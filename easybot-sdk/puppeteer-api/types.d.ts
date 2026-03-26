/**
 * 支持的浏览器类型枚举
 */
declare enum SupportedBrowser {
    /** Google Chrome 浏览器 */
    Chrome,
    /** Mozilla Firefox 浏览器 */
    Firefox,
    /** Chromium 开源浏览器 */
    Chromium,
    /** Chrome 无头外壳（轻量级无头模式） */
    ChromeHeadlessShell
}

/**
 * 浏览器运行平台枚举
 */
declare enum Platform {
    /** 未知平台 */
    Unknown,
    /** macOS (Intel) */
    MacOS,
    /** macOS (Apple Silicon / ARM64) */
    MacOSArm64,
    /** Linux */
    Linux,
    /** Windows 32位 */
    Win32,
    /** Windows 64位 */
    Win64
}

/**
 * 页面导航等待条件枚举
 * 用于定义页面跳转或加载时何时认为操作已完成
 */
declare enum WaitUntilNavigation {
    /** 当 'load' 事件触发时 */
    Load,
    /** 当 'DOMContentLoaded' 事件触发时 */
    DOMContentLoaded,
    /** 当在至少 500 毫秒内没有网络连接（0 个连接）时 */
    Networkidle0,
    /** 当在至少 500 毫秒内网络连接数不超过 2 个时 */
    Networkidle2
}

/**
 * 自定义查询处理器
 * 用于扩展选择器引擎（例如添加自定义伪类选择器）
 */
class CustomQueryHandler {
    /**
     * 查询单个元素的函数代码字符串
     * (node: Node, selector: string) => Node | null
     */
    QueryOne: string
    /**
     * 查询所有匹配元素的函数代码字符串
     * (node: Node, selector: string) => Node[]
     */
    QueryAll: string
}

/**
 * 添加脚本或样式标签的选项
 */
class AddTagOptions {
    /** 脚本或样式的来源 URL */
    Url: string
    /** 本地文件路径，将内容读取后注入 */
    Path: string
    /** 直接注入的原始代码内容 */
    Content: string
    /** 标签类型，例如 'text/javascript' 或 'text/css' */
    Type: string | "text/javascript" | "text/css"
    /** 为注入的标签指定的 ID 属性 */
    Id: any
}

/**
 * 浏览器实例接口
 * 代表一个浏览器进程
 */
declare interface IBrowser {
    /** 当前浏览器的类型 */
    BrowserType: SupportedBrowser
    /** 默认的等待超时时间（毫秒） */
    DefaultWaitForTimeout: number
    /** 是否接受不安全的 HTTPS 证书（忽略 SSL 错误） */
    AcceptInsecureCerts: boolean
    /** 浏览器的 WebSocket 调试端点 URL */
    WebSocketEndpoint: string
    /**
     * 异步关闭浏览器
     */
    CloseAsync: Promise<void>
    /**
     * 异步获取浏览器的 User-Agent 字符串
     */
    GetUserAgentAsync: Promise<string>
    /**
     * 异步获取浏览器版本信息
     */
    GetVersionAsync: Promise<string>
    /**
     * 异步创建一个新的页面（标签页）
     */
    NewPageAsync: Promise<IPage>
    /**
     * 异步获取当前打开的所有页面
     */
    PagesAsync: Promise<IPage[]>
    /**
     * 注册自定义查询处理器
     * @param name 自定义选择器的名称
     * @param queryHandler 处理器对象
     */
    RegisterCustomQueryHandler(name: string, queryHandler: CustomQueryHandler): void
    /**
     * 注销自定义查询处理器
     * @param name 要注销的选择器名称
     */
    UnregisterCustomQueryHandler(name: string): void
    /**
     * 清除所有自定义查询处理器
     */
    ClearCustomQueryHandlers(): void
}

/**
 * 已安装的浏览器信息类
 */
declare class InstalledBrowser {
    /**
     * 浏览器类型
     */
    Browser: SupportedBrowser
    /**
     * 浏览器构建 ID 或版本号
     */
    BuildId: string
    /**
     * 浏览器运行平台
     */
    Platform: BrowserPlatform
    /**
     * 浏览器权限是否已修复。
     * 如果 Puppeteer 执行了修复权限的命令，该值为 true；
     * 如果修复失败则为 false；
     * 若平台无需修复权限，则该值为 null。
     */
    readonly PermissionsFixed: boolean | undefined

    /**
     * 获取浏览器可执行文件的绝对路径
     */
    GetExecutablePath(): string
}

/**
 * 页面元素句柄接口
 * 代表 DOM 中的一个元素
 */
declare interface IElementHandle {
    // 此处可添加元素操作方法，如 Click, Type 等
}

/**
 * 认证凭据类
 * 用于 HTTP 基础认证等
 */
declare class Credentials {
    /** 用户名 */
    Username: string
    /** 密码 */
    Password: string
}

/**
 * 鼠标按键枚举
 */
declare enum MouseButton {
    /** 无按键 */
    None,
    /** 左键 */
    Left,
    /** 右键 */
    Right,
    /** 中键（滚轮） */
    Middle,
    /** 后退键（鼠标侧键） */
    Back,
    /** 前进键（鼠标侧键） */
    Forward
}

/**
 * 坐标偏移量类
 */
declare class Offset {
    /** X 轴坐标 */
    X: number
    /** Y 轴坐标 */
    Y: number

    /**
     * 构造函数
     * @param x X 轴坐标
     * @param y Y 轴坐标
     */
    constructor(x: number, y: number)
}

/**
 * 点击操作选项类
 */
declare class ClickOptions {
    /** 点击前的延迟时间（毫秒） */
    Delay: number
    /** 点击次数（例如 2 为双击） */
    Count: number
    /** 使用的鼠标按键 */
    Button: MouseButton
    /** 点击位置相对于元素左上角的偏移量，为 null 则点击中心 */
    Offset: Offset | null
}

/**
 * 截图格式枚举
 */
declare enum ScreenshotType {
    /** JPEG 格式 */
    Jpeg,
    /** PNG 格式 */
    Png,
    /** WebP 格式 */
    Webp
}

/**
 * 截图配置选项类
 */
declare class ScreenshotOptions {
    /** 是否截取整个可滚动页面的内容 */
    FullPage: boolean
    /** 是否省略背景（仅适用于 PNG，使背景透明） */
    OmitBackground: boolean
    /** 图片质量 (0-100)，仅适用于 Jpeg 和 Webp */
    Quality?: number
    /** 是否允许连拍模式（可能指快速截图优化） */
    BurstMode: boolean
    /** 是否捕获视口之外的内容 */
    CaptureBeyondViewport: boolean
    /** 是否直接从 GPU 表面捕获（性能更好但可能兼容性不同） */
    FromSurface: boolean
    /** 是否为速度进行优化 */
    OptimizeForSpeed: boolean
}

/**
 * Cookie SameSite 属性枚举
 */
declare enum SameSite {
    /** 不限制 */
    None,
    /** 严格模式，禁止第三方请求携带 Cookie */
    Strict,
    /** 宽松模式，允许部分第三方请求携带 Cookie */
    Lax,
    /** 扩展模式（较少使用） */
    Extended,
}

/**
 * Cookie 优先级枚举
 */
declare enum CookiePriority {
    /** 低优先级 */
    Low,
    /** 中优先级 */
    Medium,
    /** 高优先级 */
    High,
}

/**
 * Cookie 来源方案枚举
 */
declare enum CookieSourceScheme {
    /** 未设置 */
    Unset,
    /** 非安全来源 (HTTP) */
    NonSecure,
    /** 安全来源 (HTTPS) */
    Secure,
}

/**
 * Cookie 参数类
 * 用于设置或获取 Cookie 的详细信息
 */
declare class CookieParam {
    /** Cookie 名称 */
    Name: string
    /** Cookie 值 */
    Value: string
    /** Cookie 所属的 URL */
    Url: string
    /** Cookie 的域名 */
    Domain: string
    /** Cookie 的路径 */
    Path: string
    /** 是否仅通过安全连接 (HTTPS) 传输 */
    Secure?: boolean
    /** 是否禁止 JavaScript 访问 (HttpOnly) */
    HttpOnly?: boolean
    /** 过期时间（Unix 时间戳，秒或毫秒取决于具体实现） */
    Expires?: number
    /** Cookie 大小（字节） */
    Size?: number
    /** 是否为会话 Cookie */
    Session?: boolean
    /** 优先级 */
    Priority?: CookiePriority
    /** 是否属于 SameParty */
    SameParty?: boolean
    /** 来源方案 (Secure/NonSecure) */
    SourceScheme?: CookieSourceScheme
    /** 分区键（用于 CHIPS） */
    PartitionKey: string
    /** 分区键是否不透明 */
    PartitionKeyOpaque?: boolean
}

/**
 * 页面接口 (Tab)
 * 代表浏览器中的一个标签页或页面上下文
 */
declare interface IPage {
    /** 只读：页面是否启用了 JavaScript */
    readonly IsJavaScriptEnabled: boolean
    /** 只读：是否绕过了 Service Worker */
    readonly IsServiceWorkerBypassed: boolean
    
    /**
     * 异步获取页面标题
     */
    GetTitleAsync(): Promise<string>
    
    /**
     * 异步注入脚本标签
     * @param options 注入选项（路径、内容等）
     */
    AddScriptTagAsync(options: AddTagOptions): Promise<IElementHandle>
    
    /**
     * 异步注入脚本标签（通过 URL）
     * @param url 脚本文件的 URL
     */
    AddScriptTagAsync(url: string): Promise<IElementHandle>
    
    /**
     * 异步注入样式标签
     * @param options 注入选项（路径、内容等）
     */
    AddStyleTagAsync(options: AddTagOptions): Promise<IElementHandle>
    
    /**
     * 异步注入样式标签（通过 URL）
     * @param url 样式文件的 URL
     */
    AddStyleTagAsync(url: string): Promise<IElementHandle>
    
    /**
     * 异步进行 HTTP 基础认证
     * @param credentials 用户名和密码
     */
    AuthenticateAsync(credentials: Credentials): Promise<void>
    
    /**
     * 异步将页面置于最前（激活标签页）
     */
    BringToFrontAsync(): Promise<void>
    
    /**
     * 异步点击指定选择器的元素
     * @param selector CSS 选择器
     * @param options 点击选项
     */
    ClickAsync(selector: string, options: ClickOptions): Promise<void>
    
    /**
     * 异步点击（通常需要先移动鼠标或已有上下文）
     * 注意：此重载可能需要在特定上下文中才有意义，通常配合鼠标位置使用
     * @param options 点击选项
     */
    ClickAsync(options: ClickOptions): Promise<void>
    
    /**
     * 异步关闭页面
     */
    CloseAsync(): Promise<void>
    
    /**
     * 异步截图并返回 Base64 字符串（默认选项）
     */
    ScreenshotBase64Async(): Promise<string>
    
    /**
     * 异步截图并返回 Base64 字符串
     * @param options 截图配置选项
     */
    ScreenshotBase64Async(options: ScreenshotOptions): Promise<string>
    
    /**
     * 异步设置一个或多个 Cookie
     * @param cookies Cookie 参数列表
     */
    SetCookieAsync(...cookies: CookieParam[]): Promise<void>
    
    /**
     * 异步删除一个或多个 Cookie
     * @param cookies 要删除的 Cookie 参数列表
     */
    DeleteCookieAsync(...cookies: CookieParam[]): Promise<void>
    
    /**
     * 异步获取指定 URL 的 Cookie
     * @param urls 目标 URL 列表，若为空则获取当前页面 URL 的 Cookie
     */
    GetCookiesAsync(...urls: string[]): Promise<CookieParam[]>
}