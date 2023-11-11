import connectToMongoDB from './mongodb';

export default async function findJob(id) {
    try {
        const client = await connectToMongoDB;
        const jobs = client.db('greenalysis').collection('jobs');
        const job = await jobs.findOne({ _id: id })
        if (job) {
            return job;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}

