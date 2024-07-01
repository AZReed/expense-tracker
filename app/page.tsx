import Guest from '@/components/Guest'
import { currentUser } from '@clerk/nextjs/server'
import AddTransaction from '@/components/AddTransaction'

export default async function HomePage() {
  const user = await currentUser()

  if (!user) {
    return <Guest />
  }

  return (
    <main>
      <h1>Welcome, {user.firstName}</h1>
      <AddTransaction />
    </main>
  )
}
