module.exports = {

    parseOptionalStringValueToColumnRecord: (value) => {
        return value === null ? 'NULL' : `'${value}'`
    },

    parseOptionalNumberValueToColumnRecord: (value) => {
        return value === null ? 'NULL' : `'${value}'`
    }
}