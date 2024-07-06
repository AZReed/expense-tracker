import { currentUser } from '@clerk/nextjs/server'

import Guest from '@/components/Guest'
import Balance from '@/components/Balance'
import IncomeExpense from '@/components/IncomeExpense'
import AddTransaction from '@/components/AddTransaction'
import Transaction from '@/components/Transaction'

export default async function HomePage(props: { searchParams: { page: string, search: string } }) {
  const user = await currentUser()

  if (!user) {
    return <Guest />
  }

  return (
    <>
      <h1 className='text-3xl text-center'>Welcome, {user.firstName}</h1>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <Transaction searchParams={props?.searchParams} />
    </>
  )
}
