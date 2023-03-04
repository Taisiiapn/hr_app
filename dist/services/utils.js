"use strict";

module.exports = {
  parseOptionalValueToColumnRecord: function parseOptionalValueToColumnRecord(value) {
    return typeof value === "undefined" ? value : value === null ? 'NULL' : "".concat(value);
  }
};