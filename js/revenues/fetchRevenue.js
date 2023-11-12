import fetch from 'node-fetch';

export async function fetchRevenue(ticker) {
    const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=JQ9RIEKKBNC6WKWU`;

    try {
        const response = await fetch(url, {
            headers: {'User-Agent': 'request'}
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}
