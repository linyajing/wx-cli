/**
 * 添加一个新的page
 */
var prompt = require('../common/prompt');
const path = require('path');
const fs = require('fs');
const {log, chalk} = require('../common/log');
const cmd = require('../common/cmd');
const copydir = require('copy-dir');

const customSchema = {
    properties: {
        pagename: {
            description: '请输入页面名称',
            message: '页面名称不能为空',
            required: true,
        }
    }
}
const parseCommands = (pagename) => [{
    cmd: `git clone -b page https://github.com/linyajing/wx-template.git ${pagename}`
}, {
    cmd: 'echo 下载文件模板完成'
}]
// 获取src目录下所有的页面名称，判断是否已经存在
const valitInfo = (pagename) => {
    // const pagePath = path.resolve(process.cwd(), 'src/pages');
    const pagePath = path.resolve(process.cwd(), 'test/src/pages');
    const isPageExist = fs.existsSync(`${pagePath}/${pagename}`);
    if (isPageExist) {
        log(chalk.red('页面已经存在'))
        process.exit()
    }
    return pagename;
}
/**
 * clone页面模板
 */
const clonePage = async (pagename) => {
    const commands = parseCommands(pagename);
    for (let i = 0; i < commands.length; i++) {
        log(chalk.green(await cmd(commands[i])))
    }
    return pagename;
}
/**
 * 复制文件到指定目录，删除原目录 
 */
const copyDel = async (pagename) => {
    copydir(`${pagename}`, `test/pages/${pagename}`);
    fs.unlinkSync(`${pagename}`);
    return pagename;
}

/**
 * 在app.json中声明页面 
 */
const addInfo = pkgConfig => writeConfig(stringify(pkgConfig, 2), 'New template added')

module.exports = async () => {
    const customInfo = await prompt(customSchema);
    const pagename = customInfo.pagename;
    await valitInfo(pagename);
    await clonePage(pagename);
    await copyDel(pagename);
    // compose(valitInfo, getInfo, addInfo)(customInfo.pagename);
}