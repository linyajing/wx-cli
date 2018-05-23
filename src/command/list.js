const { stringify } = require('../common/json')
const { log, chalk } = require('../common/log')
const config = require('../../config/template')
module.exports = () => {
    log(chalk.green(config));
    log(chalk.green(stringify(config, 2)))
};
