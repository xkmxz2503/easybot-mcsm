
declare interface Mutex {
    /**
     * 阻塞当前线程，直到当前WaitHandle接收到信号，使用32位有符号整数指定以毫秒为单位的时间间隔。
     * @param millisecondsTimeout 等待的毫秒数，或 Infinite (-1) 表示无限期等待。
     * @returns 如果当前实例收到信号，则为 true；否则为 false。
     * @throws  ObjectDisposedException — 当前实例已被释放。 ArgumentOutOfRangeException — millisecondsTimeout 是除 -1 以外的负数，-1 表示无限超时。 AbandonedMutexException — 由于线程退出而未释放互斥体，导致等待完成。 InvalidOperationException — 当前实例是另一个应用程序域中 WaitHandle 的透明代理。
     */
    WaitOne(millisecondsTimeout: number): boolean

    /**
     * 阻塞当前线程，直到当前WaitHandle接收到信号，使用32位有符号整数指定以毫秒为单位的时间间隔。
     * @param millisecondsTimeout 等待的毫秒数，或 Infinite (-1) 表示无限期等待。
     * @param exitContext 在等待前（如果处于同步上下文中）为上下文退出同步域，并在之后重新获取；否则为false。
     * @returns 如果当前实例收到信号，则为 true；否则为 false。
     * @throws  ObjectDisposedException — 当前实例已被释放。 ArgumentOutOfRangeException — millisecondsTimeout 是除 -1 以外的负数，-1 表示无限超时。 AbandonedMutexException — 由于线程退出而未释放互斥体，导致等待完成。 InvalidOperationException — 当前实例是另一个应用程序域中 WaitHandle 的透明代理。
     */
    WaitOne(millisecondsTimeout: number, exitContext: boolean): boolean

    /**
     * 阻塞当前线程，直到当前WaitHandle接收到信号，无限期等待。
     * @returns 如果当前实例收到信号，则为 true；否则为 false。
     * @throws  ObjectDisposedException — 当前实例已被释放。 ArgumentOutOfRangeException — millisecondsTimeout 是除 -1 以外的负数，-1 表示无限超时。 AbandonedMutexException — 由于线程退出而未释放互斥体，导致等待完成。 InvalidOperationException — 当前实例是另一个应用程序域中 WaitHandle 的透明代理。
     */
    WaitOne(): boolean

    /**
     * 释放当前线程对互斥体的占用
     * @throws  ObjectDisposedException — 当前实例已被释放。 InvalidOperationException — 当前线程未占用互斥体。
     */
    ReleaseMutex(): void

}

/**
 * 线程API，提供给JavaScript环境使用的定时器功能
 */
declare namespace threading {
    /**
     * 创建一个定时器，在指定的延迟后执行回调函数
     * @param callback 回调函数
     * @param delay 延迟时间（毫秒）
     * @returns 定时器ID
     */
    function setTimeout(callback: () => void, delay: number): number;

    /**
     * 创建一个间隔定时器，每隔指定的时间执行回调函数
     * @param callback 回调函数
     * @param interval 间隔时间（毫秒）
     * @returns 定时器ID
     */
    function setInterval(callback: () => void, interval: number): number;

    /**
     * 清除定时器
     * @param timerId 定时器ID
     * @returns 是否成功清除
     */
    function clearTimeout(timerId: number): boolean;

    /**
     * 清除间隔定时器
     * @param timerId 定时器ID
     * @returns 是否成功清除
     */
    function clearInterval(timerId: number): boolean;

    /**
     * 创建一个互斥锁，用于在多线程环境中同步访问共享资源
     * @param name 互斥锁名称，用于标识不同的互斥锁
     * @returns 互斥锁对象
     */
    function createMutex(name: string): Mutex;

    /**
     * 创建一个互斥锁，用于在多线程环境中同步访问共享资源
     * @param initiallyOwned 是否初始为已占用状态，默认为false
     * @param name 互斥锁名称，用于标识不同的互斥锁
     * @returns 互斥锁对象
     */
    function createMutex(initiallyOwned: boolean, name: string): Mutex;
}

/**
 * 创建一个定时器，在指定的延迟后执行回调函数
 * @param callback 回调函数
 * @param delay 延迟时间（毫秒），默认为0
 * @returns 定时器ID
 */
declare function setTimeout(callback: Function, delay?: number, ...args: any[]): number;

/**
 * 创建一个间隔定时器，每隔指定的时间执行回调函数
 * @param callback 回调函数
 * @param interval 间隔时间（毫秒），默认为0
 * @returns 定时器ID
 */
declare function setInterval(callback: Function, interval?: number, ...args: any[]): number;

/**
 * 清除定时器
 * @param timerId 定时器ID
 */
declare function clearTimeout(timerId: number): void;

/**
 * 清除间隔定时器
 * @param timerId 定时器ID
 */
declare function clearInterval(timerId: number): void;