"use client";
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import addTransaction from "@/actions/addTransaction";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  amount: z.number().or(z.string().refine(val => val !== 0, {
    message: "Amount cannot be zero",
  })).refine(val => val !== 0, {
    message: "Amount cannot be zero",
  })
})

const AddTransaction = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  const clientAction = async (values: z.infer<typeof formSchema>) => {
    const result = await addTransaction(values.name, values.amount);

    if (result?.error) {
      toast.error(result.error);
    } else {
      form.reset();
      // formRef.current?.reset();
      toast.success("Transaction added");
    }
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(clientAction)} className="FormRoot">
          {/* <form action={clientAction} className="FormRoot"> */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>
                  Quantity can be negative for expenses, or positive for income.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Transaction</Button>
        </form>
      </Form>
    </>
  );
}

export default AddTransaction;
