"use client";
import { useRef } from "react";
import addTransaction from "@/actions/addTransaction";
import { toast } from 'react-toastify';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const result = await addTransaction(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      formRef.current?.reset();
      toast.success("Transaction added");
    }
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction} ref={formRef}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" name="text" placeholder="Enter text ..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)</label>
          <input type="number" id="amount" name="amount" step={0.01} placeholder="Enter amount ..." />
        </div>
        <button className="btn" type="submit">Add transaction</button>
      </form>
    </>
  );
}

export default AddTransaction;
