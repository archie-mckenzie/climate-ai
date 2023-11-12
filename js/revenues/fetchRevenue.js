'use strict';
var request = require('request');

export async function fetchRevenue(ticker) {
    return new Promise((resolve, reject) => {
        const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=JQ9RIEKKBNC6WKWU`;

        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== 200) {
                reject(`Status: ${res.statusCode}`);
            } else {
                resolve(data);
            }
        });
    });
}
