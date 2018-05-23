/**
 * 初始化项目
 */
const cmd = require('../common/cmd');
const { log, chalk } = require('../common/log');
const parseCommands = (dirname) => [{
    cmd: `git clone https://github.com/linyajing/wx-template.git ${dirname}`,
}, {
    cmd: `git checkout`,
}, {
    cmd: 'echo 项目初始化结束',
}]

const generatorProject = async function (dirname) {
    const commands = parseCommands(dirname);
    for (let i = 0; i < commands.length; i++) {
        log(chalk.green(await cmd(commands[i])))
    }
};
module.exports = generatorProject;