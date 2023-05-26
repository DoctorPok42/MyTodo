import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../../types/user'
import { createAuthToken } from '../../../../lib/token'
import { connectToDatabase } from '../../../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstname, name } = req.body

  if (!email || !password || !firstname || !name) {
    return res.status(400).send({ error: 'Please provide all fields' })
  }

  try {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ email: email })

    if (user) {
      return res.status(500).send({ error: 'Account already exists' })
    }

    const id = Math.floor(Math.random() * 1000000000)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password as string, salt)

    const result = await db.collection('users').insertOne({
      id: id,
      email: email,
      password: hashedPassword,
      firstname: firstname,
      name: name,
    })

    const token = createAuthToken(JSON.stringify(id as User['id']))
    if (result) {
      res.setHeader('Set-Cookie', [
        `token=${token}; HttpOnly; Path=/; Max-Age=259200`,
      ])
      return res.status(200).send({ token: token })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' })
  }
}
