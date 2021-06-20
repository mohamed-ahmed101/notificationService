
module.exports.replace = function replace(str, parameters) {
    return str.replace(/{{`(.+?)`}}/g, (_, identifierKey) =>
        parameters[identifierKey] || "{{}}");
}