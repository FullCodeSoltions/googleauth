
const base64urlDecode = str => Buffer.from(base64urlUnescape(str), 'base64').toString();
  
const base64urlUnescape = str => {
    str += Array(5 - str.length % 4).join('=');

    return str.replace(/\-/g, '+').replace(/_/g, '/');
}

module.exports = {
    base64urlDecode
}
