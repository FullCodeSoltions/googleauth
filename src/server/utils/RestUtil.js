const fetch = require('node-fetch');

const restCall = async (url, headers, successFn, failureFn) => {
    const restHeaders = {
        ...headers
    };

    await fetch(url, restHeaders)
    .then(response => response.json())
    .then(async obj => {
        if (obj.message && (obj.message.statusCode === '400')) {
            if ( failureFn ) {
                failureFn(obj.message);
            }
        } else if ( successFn ) {
            await successFn(obj.data || obj);
        }
    })
    .catch(error => {
        failureFn(error);
    });
}

module.exports = restCall;
