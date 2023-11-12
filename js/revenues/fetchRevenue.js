import fetch from 'node-fetch';

export async function fetchRevenue(ticker) {
    console.log(ticker)
    const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=JQ9RIEKKBNC6WKWU`;
    console.log(url)
    try {
        const response = await fetch(url, {
            headers: {'User-Agent': 'request'}
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}
