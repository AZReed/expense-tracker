import { RxExclamationTriangle } from 'react-icons/rx';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import getUserBalance from "@/actions/getUserBalance";
import { formatCurrency } from "@/lib/utils";

const Balance = async () => {
  const { balance, error } = await getUserBalance();

  if (error) {
    return (
      <Alert variant="destructive" className='mt-4'>
        <RxExclamationTriangle />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert >
    )
  }

  return (
    <>
      <h1 className='text-xl font-bold'>Balance</h1>
      <h2>{formatCurrency(balance as number) ?? 0}</h2>
    </>
  );
}

export default Balance;
