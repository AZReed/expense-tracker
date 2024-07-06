import TransactionList from '@/components/TransactionList'
import getTransactions from '@/actions/getTransactions'

export default async function Transaction({ searchParams }: { searchParams: { page?: string, search?: string } }) {
  const { data, error } = await getTransactions({ page: searchParams?.page })

  return (
    <TransactionList error={error} data={data} />
  )
}
