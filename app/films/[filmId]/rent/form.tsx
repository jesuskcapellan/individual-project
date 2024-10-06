"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListFilmCopiesResult } from "@/app/api/inventory/listFilmCopies";
import { useState } from "react";

const FormSchema = z.object({
  inventory: z.string(),
  staff: z.string(),
});

export function SelectForm({
  filmCopies,
}: {
  filmCopies: ListFilmCopiesResult;
}) {
  const [staffList, setStaffList] = useState<
    { staffId: number; name: string }[] | null
  >(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  filmCopies.forEach((copy) => console.log(copy.rentals.pop()?.rental_date));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="inventory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Film Copies</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a film copy to rent out" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filmCopies.map((copy) => (
                    <SelectItem value={copy.inventoryId.toString()}>
                      <div className="flex gap-2">
                        <span>ID: {copy.inventoryId}</span>
                        <span className="text-muted-foreground">
                          {copy.storeAddress}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {staffList && (
          <FormField
            control={form.control}
            name="staff"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Film Copies</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a film copy to rent out" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {staffList.map((staff) => (
                      <SelectItem value={staff.staffId.toString()}>
                        <div className="flex gap-2">
                          <span>{staff.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
