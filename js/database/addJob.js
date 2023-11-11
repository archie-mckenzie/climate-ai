import connectToMongoDB from './mongodb';

const crypto = require('crypto');

export default async function addJob() {
    try {
        const _id = crypto.randomUUID()
        const job = {
            "_id": _id,
            "timestamp": Date.now(),
        }
        const client = await connectToMongoDB;
        const jobs = client.db('greenalysis').collection('jobs');
        const result = await jobs.insertOne(job)
        if (result.acknowledged) {
            return _id
        } else {
            return ''
        }
    } catch (error) {
        console.log(error)
        return '';
    }
}

