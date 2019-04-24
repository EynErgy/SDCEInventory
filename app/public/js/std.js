String.prototype.escapeSpecialChars = function () {
    return this.replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f")
        .replace(/"/g, "\\\"")
        .replace(/'/g, "\\\'")
//        .replace(/\&/g, "\\&");
};