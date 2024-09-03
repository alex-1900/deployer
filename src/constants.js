const path = require('path')
const fs = require('fs')
const yaml = require('yaml')

exports.ROOT_PATH = path.resolve(__dirname, '../')

const { global } = yaml.parse(fs.readFileSync(`${exports.ROOT_PATH}/config/global.yml`).toString());
exports.SSH_KEY_PATH = global.ssh_key_path
exports.SSH_KEY = fs.readFileSync(global.ssh_key_path)
