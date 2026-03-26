/** 组件类型枚举，对应后端的 ComponentType */
declare enum ComponentType {
    /** 文本输入框 */
    InputString,
    /** 数字输入框 */
    InputNumber,
    /** 开关组件 */
    Toggle,
    /** 容器分组 */
    ContainerGroup,
    /** 可重复列表（项模板） */
    RepeaterList
}

/** 所有组件的基础结构 */
interface BaseComponent {
    /** 组件唯一标识（只读） */
    readonly id: string;
    /** 组件标题 */
    title: string;
    /** 组件描述 */
    description: string;
    /** 是否显示 */
    visible: boolean;
}

/** 文本输入组件 */
interface StringInput extends BaseComponent {
    /** 占位提示文本 */
    placeholder: string;
    /** 默认值 */
    defaultValue: string;
    /** 最大长度，-1 表示不限制 */
    maxLength: number;
    /** 是否为密码输入 */
    isPassword: boolean;
    /** 前缀文本 */
    prefix: string;
    /** 后缀文本 */
    suffix: string;
}

/** 数字输入组件 */
interface NumberInput extends BaseComponent {
    /** 最大值 */
    max: number;
    /** 最小值 */
    min: number;
    /** 步进值 */
    step: number;
    /** 前缀文本 */
    prefix: string;
    /** 后缀文本 */
    suffix: string;
    /** 默认值 */
    defaultValue: number;
}

/** 开关组件 */
interface ToggleComponent extends BaseComponent {
    /** 默认值 */
    defaultValue: boolean;
    /** 开启时的文本 */
    trueLabel: string;
    /** 关闭时的文本 */
    falseLabel: string;
}

/** 容器分组组件 */
interface ContainerGroup extends BaseComponent {
    /** 子组件列表 */
    children: BaseComponent[];
    /** 添加一个子组件到当前容器 */
    addChild(child: BaseComponent): void;
}

/** 可重复列表组件（使用项模板生成列表项） */
interface RepeaterComponent extends BaseComponent {
    /** 固定为重复列表类型（只读） */
    readonly type: ComponentType.RepeaterList;
    /** 列表项模板（容器分组），可为空 */
    itemTemplate?: ContainerGroup | null;
    /** 最大列表项数量 */
    maxItems: number;
    addChild(child: BaseComponent): void;
}

interface SelectOption {
    label: string;
    value: string;
}

interface SelectComponent extends BaseComponent {
    /** 选项列表 */
    readonly options: SelectOption[];
    /** 默认值 */
    defaultValue: string;
    /** 添加选项 */
    addOption(label: string, value: string): void;
}

/** 动态表单定义（根结构） */
interface DynamicFormDefinition {
    /** 表单标题 */
    title: string;
    /** 根容器分组，可为空 */
    root: ContainerGroup;

    /** 添加一个子组件到根容器分组 */
    addChild(child: BaseComponent): DynamicFormDefinition;

    /** 测试用   */
    exportJson(): string;
}

interface CustomFormData {
    /** 标题 */
    title: string;
    /** 唯一标识 */
    id: string;
    /** 表单自定义图标 (svg格式) */
    svg: string;
}

/** forms 接口：封装所有可用的构造与工具方法 */
interface forms {

    /** 
     * 创建自定义表单数据
     * @param title 表单标题
     * @param id 表单唯一标识
     * @param svg 表单自定义图标 (svg格式)
     */
    createFormData(title: string, id: string, svg: string | null): CustomFormData;

    /** 
     * 创建一个新的表单定义
     * @param title 表单标题
     * @param formData 自定义表单数据
     * @param description 表单描述
     * @param configure 配置回调函数
     */
    createForm(title: string, formData: CustomFormData, description?: string, configure?: (api: forms, component: DynamicFormDefinition) => void): DynamicFormDefinition;
    /** 
     * 创建文本输入组件
     * @param id 组件唯一标识
     * @param title 组件标题
     * @param description 组件描述
     * @param configure 配置回调函数
     */
    createStringInput(id: string, title: string, description?: string, configure?: (api: forms, component: StringInput) => void): StringInput;
    /** 
     * 创建数字输入组件
     * @param id 组件唯一标识
     * @param title 组件标题
     * @param description 组件描述
     * @param configure 配置回调函数
     */
    createNumberInput(id: string, title: string, description?: string, configure?: (api: forms, component: NumberInput) => void): NumberInput;
    /** 
     * 创建开关组件
     * @param id 组件唯一标识
     * @param title 组件标题
     * @param description 组件描述
     * @param configure 配置回调函数
     */
    createToggle(id: string, title: string, description?: string, configure?: (api: forms, component: ToggleComponent) => void): ToggleComponent;
    /** 
     * 创建容器分组组件
     * @param id 组件唯一标识
     * @param title 组件标题
     * @param description 组件描述
     * @param configure 配置回调函数
     */
    createContainerGroup(id: string, title: string, description?: string, configure?: (api: forms, component: ContainerGroup) => void): ContainerGroup;
    /** 
     * 创建可重复列表组件
     * @param id 组件唯一标识
     * @param title 组件标题
     * @param containerId 内部容器的唯一标识
     * @param description 组件描述
     * @param configure 配置回调函数
     */
    createRepeater(id: string, title: string, containerId: string, description?: string, configure?: (api: forms, component: RepeaterComponent) => void): RepeaterComponent;

    /** 
     * 创建选择组件
     * @param id 组件唯一标识
     * @param title 组件标题
     * @param description 组件描述
     * @param configure 配置回调函数
     */
    createSelect(id: string, title: string, description?: string, configure?: (api: forms, component: SelectComponent) => void): SelectComponent;
}