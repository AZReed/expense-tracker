import TransactionList from '@/components/TransactionList'
import getTransactions from '@/actions/getTransactions'

export default async function Transaction({ searchParams }: { searchParams: { page?: string, search?: string } }) {
  const { data, error } = await getTransactions({ page: searchParams?.page })

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      {!data?.list || !data?.list?.length ? 'No transactions found' : (
        <TransactionList data={data} />
      )}
    </>
  )
}
