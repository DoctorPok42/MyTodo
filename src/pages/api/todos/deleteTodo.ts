import { connectToDatabase } from '../../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    if (!id) {
        return res.status(400).json({ msg: 'Bad Parameter' })
    }

    const idNumber = parseInt(id as string)

    if (req.method === 'DELETE') {
        try {
            const { db } = await connectToDatabase()
            await db.collection('todo').deleteOne({ id: idNumber })
            return res.status(200).json({ msg: 'Delete Success' })
        } catch (error) {
            res.status(400).json({ msg: 'Delete Failed' })
        }
    }
}