export type Error = {
  code: string
  errno: number
  sqlMessage: string
  sqlState: string
  index: number
  sql: string
}

export type Decoded = {
  id: string
  iat: number
  exp: number
}
