import connectToMongoDB from './mongodb';

export default async function checkForJob(companyName) {
    try {
        const client = await connectToMongoDB;
        const jobs = client.db('greenalysis').collection('jobs');
        const job = await jobs.findOne({ company_name: companyName })
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

