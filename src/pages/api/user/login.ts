import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../../types/user'
import { createAuthToken } from '../../../../lib/token'
import { connectToDatabase } from '../../../../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ error: 'Please provide email and password' })
  }

  try {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ email: email })

    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password as string, user.password)
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' })
    }

    const token = createAuthToken(JSON.stringify(user.id as User['id']))

    if (user && isMatch) {
      res.setHeader('Set-Cookie', [
        `token=${token}; HttpOnly; Path=/; Max-Age=259200`,
      ])
      return res.status(200).send({ token: token })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' })
  }
}
