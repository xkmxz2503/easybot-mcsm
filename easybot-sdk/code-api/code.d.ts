declare namespace code {

    /**
     * 获取玩家的验证码
     * @param playerName 玩家名称
     * @returns 玩家的验证码 如果玩家不存在或没有验证码，则返回null
     */
    function GetCode(playerName: string): string | null;

    /**
     * 获取玩家的名称
     * @param code 玩家的验证码
     * @returns 玩家的名称 如果验证码不存在或没有对应的玩家，则返回null
     */
    function GetUserName(code: string): string | null;

    /**
     * 获取玩家验证码的过期时间
     * @param userName 玩家名称
     * @returns 玩家验证码的过期时间(格式 yyyy-MM-dd HH:mm:ss) 如果玩家不存在或没有验证码，则返回null
     */
    function GetCodeExpTime(userName: string): string | null;

    /**
     * 生成玩家的验证码 (按照绑定设置)
     * @param userName 玩家名称
     * @returns 玩家的验证码
     */
    function GenCode(userName: string): string;

    /**
     * 标记玩家验证码为成功
     * 注意: 该操作并不会绑定玩家账号、仅仅只是删除玩家验证码
     * @param userName 玩家名称
     * @returns 是否成功
     */
    function MarkSuccessByName(userName: string): boolean;

    /**
     * 获取系统配置的允许用户绑定数量
     */
    function GetBindLimit():number;
}