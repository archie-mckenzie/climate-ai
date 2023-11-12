import connectToMongoDB from './mongodb';

export default async function updateJob(id, params) {
    try {
        const client = await connectToMongoDB;
        const jobs = client.db('greenalysis').collection('jobs');
        const result = await jobs.insertOne(
            { _id: id }, // Replace with your document's ID
            { $set: params }, // Replace with your update
            { upsert: true }
        )
        if (result.acknowledged) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false;
        // updateJob(id, {"completed": true})
    }
}

