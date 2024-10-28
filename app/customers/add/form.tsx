"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Address } from "@/types/address";
import { Store } from "@/types/store";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { fetchAddresses, putCustomer } from "./action";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    storeId: z.coerce.number(),
    addressId: z.coerce.number(),
});

export function AddCustomerForm({
    stores,
    initialAddresses,
}: {
    stores: Store[];
    initialAddresses: Address[];
}) {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetchAddresses(search).then((val) => {
            setAddresses(val);
        });
    }, [search]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const customer = await putCustomer(
            data.firstName,
            data.lastName,
            data.email,
            data.storeId,
            data.addressId
        );
        if (!customer) {
            toast({
                title: "An error occurred while submitting the form.",
                variant: "destructive",
            });
        } else {
            router.push(`/customers/${customer.customer_id}?submit=added`);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    onChange={field.onChange}
                                    placeholder="Enter the customer's first name"
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    onChange={field.onChange}
                                    placeholder="Enter the customer's last name"
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    onChange={field.onChange}
                                    placeholder="Enter the customer's email"
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="storeId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Store Address</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={undefined}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the customer's store" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {stores.map((store) => (
                                            <SelectItem
                                                value={store.id.toString()}
                                                key={store.id}
                                            >
                                                <span>
                                                    {store.address.address}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="addressId"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="py-1">
                                    Personal Address
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? `${
                                                          addresses.find(
                                                              (address) =>
                                                                  address.id ===
                                                                  field.value
                                                          )?.address
                                                      }`
                                                    : "Select address"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command shouldFilter={false}>
                                            <CommandInput
                                                value={search}
                                                onValueChange={setSearch}
                                                placeholder="Start typing to find addresses..."
                                            />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No addresses found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {addresses.map(
                                                        (address) => (
                                                            <CommandItem
                                                                value={address.id.toString()}
                                                                key={address.id}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "addressId",
                                                                        address.id
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        address.id ===
                                                                            field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {
                                                                    address.address
                                                                }
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
