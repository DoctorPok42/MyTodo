import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../../types/user'
import { createAuthToken } from '../../../../lib/token'
import { connectToDatabase } from '../../../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, name, firstname, id } = req.body

  if (!email || !password || !name || !firstname || !id) {
    return res.status(400).send({ error: 'Please provide email and password' })
  }

  try {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password as string, salt)

    const { db } = await connectToDatabase()
    const user = await db.collection('users')
        .updateOne({ id: id },
            { $set:
                {
                    email: email,
                    password: hashedPassword,
                    name: name,
                    firstname: firstname
                }
            })
    if (user) {
      return res.status(200).send({ message: 'User updated' })
    } else {
        return res.status(400).send({ error: 'Invalid id' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' })
  }
}
