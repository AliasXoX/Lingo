import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { decrypt } from './session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('lingoSessionCookie')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async (): Promise<{ userId: number; username: string } | null> => {
  const cookie = (await cookies()).get('lingoSessionCookie')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId || !session?.username) {
    return null
  }
 
  return { userId: session.userId as number, username: session.username as string }
})