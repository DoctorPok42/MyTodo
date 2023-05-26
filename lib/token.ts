import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function createAuthToken(id: string) {
  const token = jwt.sign({ id: id }, process.env.ENCODE_KEY as string, {
    expiresIn: '72h',
  })
  return token
}
