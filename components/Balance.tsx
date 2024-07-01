import { toast } from "react-toastify";

import getUserBalance from "@/actions/getUserBalance";
import { formatCurrency } from "@/lib/utils";

const Balance = async () => {
  const { balance, error } = await getUserBalance();

  if (error) {
    toast.error(error);
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3>Balance</h3>
      <h2>{formatCurrency(balance as number) ?? 0}</h2>
    </>
  );
}

export default Balance;
