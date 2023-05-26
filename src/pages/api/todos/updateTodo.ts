import { connectToDatabase } from '../../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, description, created_at, due_date, status, user_id } = req.body

  if (!id || !title || !created_at || !due_date || !status || !user_id) {
    return res.status(400).json({ msg: 'Bad Parameter' })
  }

  if (req.method === 'PUT') {
    try {
      const { db } = await connectToDatabase()
      const isInBd = await db.collection('todo').findOne({ id: id, user_id: user_id })
      if (!isInBd) {
        const result = await db.collection('todo').insertOne({
          id: id,
          title: title,
          description: description,
          created_at: created_at,
          due_date: due_date,
          status: status,
          user_id: user_id,
        })
        return res.status(200).json({ msg: 'Insert Success' })
      }
      const result = await db
        .collection('todo').updateOne({ id: id, user_id: user_id },
          {
            $set: {
              title: title,
              description: description,
              created_at: created_at,
              due_date: due_date,
              status: status,
              user_id: user_id,
            },
          }
        )
      return res.status(200).json({ msg: 'Update Success' })
    } catch (error) {
      res.status(400).json({ msg: 'Update Failed' })
    }
  } else {
    res.status(400).json({ msg: 'Method Not Allowed' })
  }
}
