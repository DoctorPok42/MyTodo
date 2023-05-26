import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../../types/user'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.body

    if (!token) {
        return res.status(400).send({ error: 'Badd parameters' })
    }

    try {
        const decoded = jwt.verify(
            token as string, process.env.ENCODE_KEY as string
        )
        if (!decoded) {
            return res.status(401).send({ msg: 'Token is not valid' })
        }
        return res.status(200).send({ token: decoded.id as User['id'] })
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' })
    }
}
