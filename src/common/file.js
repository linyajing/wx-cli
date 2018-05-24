const fs = require('fs')
const {
    log,
    chalk
} = require('../common/log')
const path = require('path')

const writeFile = (config, message, filePath) => {
    fs.writeFile(filePath, config, 'utf-8', (err) => {
        if (err) console.log(err)
        log(chalk.green(message))
        process.exit()
    })
}

const readFile = (path) => {
    return fs.readFileSync(path, {
        encoding: 'utf-8'
    });
}

module.exports = {
    readFile,
    writeFile
}