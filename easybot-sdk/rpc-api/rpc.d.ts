/// <reference path="./index.d.ts" />

declare interface RpcContext {
    args: any;
    /**
     * 调用端桥接对象
     */
    caller?: Bridge;
}

declare namespace rpc {
    /**
     * 注册 RPC 方法处理程序
     * @param method RPC 方法名称
     * @param handler 处理程序函数,接收 RpcContext 参数并返回任意值
     * @param displayName 显示名称,用于 API 文档
     * @param description 描述,用于 API 文档
     */
    function on(method: string, handler: (ctx: RpcContext) => any, displayName: string | null = null, description: string | null = null);

    /**
     * 创建错误信息 如果将此对象作为结果返回 调用端会报错并输出信息
     * @param message 错误信息
     */
    function withError(message: string): { error: true, message: string };
}