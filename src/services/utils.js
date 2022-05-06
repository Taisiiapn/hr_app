module.exports = {

    parseOptionalValueToColumnRecord: (value) => {
        return typeof value === "undefined" 
            ? value 
            : value === null 
                ? 'NULL' 
                : `${value}`
    }
}