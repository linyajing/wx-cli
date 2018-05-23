const {
    exec
} = require('child_process')

module.exports = ({
    cmd,
    cwd
}) => new Promise((res) => {
    exec(cmd, {
        cwd: cwd || process.cwd(),
        env: process.env,
    }, (error, stdout) => {
        if (error) {
            process.exit()
        }
        res(stdout)
    })
});