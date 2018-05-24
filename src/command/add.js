/**
 * 添加一个新的page
 */
const prompt = require('../common/prompt');
const {readFile, writeFile} = require('../common/file');
const {log, chalk} = require('../common/log');
const cmd = require('../common/cmd');
const { stringify } = require('../common/json')

const path = require('path');
const fs = require('fs');
const copydir = require('copy-dir');
const del = require('del');
const BASE_PATH = process.cwd();

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
    const pagePath = path.resolve(BASE_PATH, 'src/pages');
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
const copyDel = (pagename) => {
    copydir.sync(`${BASE_PATH}/${pagename}`, `${BASE_PATH}/src/pages/${pagename}`);
    log(chalk.green('文件夹复制完成'));
    del.sync(`${BASE_PATH}/${pagename}`);
    log(chalk.green('源文件删除完成'));
    return pagename;
};

/**
 * 在app.json中添加新页面配置
 */
const addInfo = (pagename) => {
    let jsonInfo = readFile(`${BASE_PATH}/src/app.json`);
    jsonInfo = JSON.parse(jsonInfo);
    jsonInfo.pages.push(`pages/${pagename}/index`);
    writeFile(stringify(jsonInfo, 4),  '新页面添加完成', `${BASE_PATH}/src/app.json`);
};

module.exports = async () => {
    const customInfo = await prompt(customSchema);
    const pagename = customInfo.pagename;
    await valitInfo(pagename);
    await clonePage(pagename);
    copyDel(pagename);
    addInfo(pagename);
}