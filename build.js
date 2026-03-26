/**
 * EasyBot 插件自动构建脚本
 * 功能：1. 打包多文件 JS 为单文件  2. 自动生成 ZIP 压缩包
 */

// ================= 1. 引入依赖模块 =================

// esbuild: 我们的核心打包工具，负责把 require 的文件合并成一个
const esbuild = require('esbuild');

// adm-zip: 一个用来在 Node.js 里创建 .zip 压缩包的库
const AdmZip = require('adm-zip');

// fs: Node.js 内置的“文件系统”模块，用来读写文件
const fs = require('fs');

// path: Node.js 内置的“路径”模块，用来安全地拼接文件路径，避免 Windows/Linux 路径斜杠不同的问题
const path = require('path');

// ================= 2. 配置区域 (你可以修改这里) =================

const config = {
    // 【入口文件】你项目源码的主文件位置
    // 也就是包含你第一行执行代码的那个文件
    entry: 'main.js',
    
    // 【输出目录】打包后的临时文件和最终 zip 放在哪里
    outDir: 'dist',
    
    // 【JS 文件名】打包后的 JS 叫什么名字？
    // 注意：有些机器人平台规定必须叫 index.js 或 main.js
    outJsName: 'main.js',
    
    // 【压缩包名】最终生成的 zip 文件叫什么
    zipName: 'easybot-mcsm.zip',
    
    // 【额外文件】如果你的插件根目录还有其他需要一起打包的文件
    // (比如 manifest.json, config.json, README.md 等)，把文件名写在这个数组里
    extraFiles: [
         'manifest.json',
          'LICENSE', // 如果你有这个文件，就把前面的 // 删掉
        // 'config.json',
         'README.md'
    ]
};

// ================= 3. 正式开始构建流程 =================

console.log('========== 开始构建 EasyBot 插件 ==========');

// --- 步骤 3.1: 准备输出目录 ---

// 检查一下 dist 文件夹是否存在，如果不存在就创建一个
// 防止一会儿报错说“找不到路径”
if (!fs.existsSync(config.outDir)) {
    console.log(`[1/4] 创建输出目录: ${config.outDir}`);
    // recursive: true 意思是如果父文件夹不存在也一起创建 (虽然这里一般用不上)
    fs.mkdirSync(config.outDir, { recursive: true });
} else {
    console.log(`[1/4] 输出目录已就绪: ${config.outDir}`);
}

// --- 步骤 3.2: 使用 esbuild 打包代码 ---

console.log('[2/4] 正在使用 esbuild 打包 JavaScript...');

try {
    // buildSync 是同步执行打包 (Sync 表示同步，会卡住等它打包完再往下走)
    esbuild.buildSync({
        // 入口点：从哪个文件开始分析依赖？
        entryPoints: [config.entry],
        
        // 开启 bundle 模式：这是最关键的一步！
        // 它会顺着你的 require 或 import 语句，把所有依赖的文件像串糖葫芦一样串起来
        bundle: true,
        
        // 输出文件路径：path.join 会自动处理路径拼接 (Windows 是 \, Linux 是 /)
        outfile: path.join(config.outDir, config.outJsName),
        
        // 输出格式：iife (Immediately Invoked Function Expression)
        // 也就是“自执行函数”。这会把代码包在 (function(){ ... })() 里
        // 这是最安全的格式，防止变量泄露到全局作用域，非常适合 V8 沙箱环境
        format: 'iife',
        
        // 目标平台：neutral (中性)
        // 告诉 esbuild 不要假设这是跑在 Node.js 还是浏览器里，不注入任何平台特定的垫片代码
        platform: 'neutral',
        
        // 是否压缩代码？
        // minify: true, // 去掉这行的注释，打包出来的文件体积会变小 (变量名会变成 a, b, c...)
    });
    
    console.log('[2/4] ✅ JavaScript 打包成功！');

} catch (error) {
    // 如果打包失败了 (比如语法错误)，打印错误并退出脚本
    console.error('[2/4] ❌ 打包失败：');
    console.error(error);
    process.exit(1); // 1 通常代表异常退出
}

// --- 步骤 3.3: 开始制作 ZIP 压缩包 ---

console.log('[3/4] 正在生成 ZIP 压缩包...');

// 1. 创建一个新的空 Zip 对象 (相当于在内存里新建了一个 .zip 文件)
const zip = new AdmZip();

// 2. 把刚才打包好的那个 index.js 读出来
// 这里我们不直接 addLocalFile，为了是更好地控制文件名
const bundleJsPath = path.join(config.outDir, config.outJsName);
const bundleJsContent = fs.readFileSync(bundleJsPath);

// 3. 将 JS 内容添加进压缩包
// 参数1: 压缩包里的文件叫什么名字
// 参数2: 文件的二进制内容
zip.addFile(config.outJsName, bundleJsContent);
console.log(`      -> 添加主文件: ${config.outJsName}`);

// 4. 处理“额外文件” (如果配置了的话)
if (config.extraFiles && config.extraFiles.length > 0) {
    config.extraFiles.forEach(fileName => {
        // 拼出这个文件在电脑上的绝对路径
        // __dirname 是 Node.js 的全局变量，代表“当前脚本所在的目录”
        const localFilePath = path.join(__dirname, fileName);
        
        // 检查文件是否真的存在
        if (fs.existsSync(localFilePath)) {
            // addLocalFile: 直接把本地文件添加进压缩包
            zip.addLocalFile(localFilePath);
            console.log(`      -> 添加配置文件: ${fileName}`);
        } else {
            console.log(`      -> ⚠️  跳过未找到的文件: ${fileName}`);
        }
    });
}

// --- 步骤 3.4: 保存 ZIP 文件 ---

// 拼出最终 zip 的保存路径
const finalZipPath = path.join(config.outDir, config.zipName);

// writeZip: 将内存里的 zip 对象写入到硬盘上
zip.writeZip(finalZipPath);

console.log('[3/4] ✅ ZIP 打包成功！');

// ================= 4. 完成 =================

console.log('');
console.log('🎉 ========== 构建全部完成！ ========== 🎉');
console.log(`   📦 插件压缩包已生成:`);
console.log(`      ${finalZipPath}`);
console.log('   现在可以把这个 zip 上传到 EasyBot 了。');
console.log('');
