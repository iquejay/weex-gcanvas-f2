var loaderUtils = require('loader-utils');
var REG = /\/\*\s*IF(DEBUG|TRUE_\w+)(?:\s*\*\/)?([\s\S]+?)(?:\/\*\s*)?FI\1\s*\*\//g;
// 所有字符
var LineReg = /[\s\S]+/g

const replaceMatched = function (js, options) {
    return js.replace(REG, (match, $1, $2) => {
        var isKeep;
        if ($1 === 'DEBUG') {
            isKeep = options.isDebug
        } else {
            var varName = $1.slice(5)
            isKeep = options[varName]
        }
        if (isKeep) {
            return $2
        }
        return $2.replace(LineReg, '')
    });
}

var options

module.exports = function (source) {
  options = Object.assign(
    { isDebug: process.env.NODE_ENV === 'development' }, //默认的isDebug
    loaderUtils.getOptions(this)
  );
  return replaceMatched(source, options)
};
