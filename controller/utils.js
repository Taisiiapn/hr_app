module.exports = {
    parseBodyStringToObj: (bodyStr) => {
        const values = {}

        bodyStr.split('&').forEach(keyValue => {
            const [ key, value ] = keyValue.split('=')
            values[key] = value 
        })
        return values;
    }
}