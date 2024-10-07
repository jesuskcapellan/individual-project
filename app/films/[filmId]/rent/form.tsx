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
import { useEffect, useState } from "react";
import { fetchCustomers, fetchStaff, putRental } from "./actions";
import { StaffList } from "@/types/staff";
import { cn, formatTitleCase } from "@/lib/utils";
import { FilmCopies, FilmCopy } from "@/types/film";
import { Customers } from "@/types/customer";
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
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    inventory: z.string(),
    staff: z.string(),
    customer: z.string(),
});

export function SelectForm({
    filmCopies,
    initialCustomers,
}: {
    filmCopies: FilmCopies;
    initialCustomers: Customers;
}) {
    const [staffList, setStaffList] = useState<StaffList | null>(null);
    const [filmCopy, setFilmCopy] = useState<FilmCopy | null>(null);
    const [customers, setCustomers] = useState<Customers>(initialCustomers);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetchCustomers(search).then((val) => {
            setCustomers(val);
        });
    }, [search]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const rental = await putRental(
            parseInt(data.inventory),
            parseInt(data.staff),
            parseInt(data.customer)
        );
        if (!rental) {
            toast({
                title: "An error occurred while submitting the form.",
                variant: "destructive",
            });
        } else {
            router.push(`/films/${filmCopy?.filmId}?submit=success`);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="inventory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Film Copy</FormLabel>
                            <Select
                                onValueChange={async (value) => {
                                    field.onChange(value);
                                    const copy = filmCopies.find(
                                        (f) => f.inventoryId === parseInt(value)
                                    );
                                    if (copy) {
                                        setFilmCopy(copy);
                                        setStaffList(
                                            await fetchStaff(copy.storeId)
                                        );
                                    }
                                }}
                                defaultValue={""}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a film copy to rent out" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {filmCopies.map((copy) => (
                                        <SelectItem
                                            value={copy.inventoryId.toString()}
                                            key={copy.inventoryId}
                                        >
                                            <div className="flex gap-2">
                                                <span>
                                                    ID: {copy.inventoryId}
                                                </span>
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
                                <FormLabel>Staff</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={""}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                className="text-muted-foreground"
                                                placeholder="Select the staff completing the rental"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {staffList.map((staff) => (
                                            <SelectItem
                                                value={staff.id.toString()}
                                                key={staff.id}
                                            >
                                                <div className="flex gap-2">
                                                    <span>
                                                        {formatTitleCase(
                                                            `${staff.first_name} ${staff.last_name}`
                                                        )}
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
                )}
                <FormField
                    control={form.control}
                    name="customer"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Customer</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[250px] justify-between",
                                                !field.value &&
                                                "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? formatTitleCase(
                                                    `${customers.find(
                                                        (customer) =>
                                                            customer.id ===
                                                            parseInt(
                                                                field.value
                                                            )
                                                    )?.first_name
                                                    } ${customers.find(
                                                        (customer) =>
                                                            customer.id ===
                                                            parseInt(
                                                                field.value
                                                            )
                                                    )?.last_name
                                                    }`
                                                )
                                                : "Select customer"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[250px] p-0">
                                    <Command shouldFilter={false}>
                                        <CommandInput
                                            value={search}
                                            onValueChange={setSearch}
                                            placeholder="Start typing to find customers..."
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No customer found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {customers.map((customer) => (
                                                    <CommandItem
                                                        value={customer.id.toString()}
                                                        key={customer.id}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "customer",
                                                                customer.id.toString()
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                customer.id ===
                                                                    parseInt(
                                                                        field.value
                                                                    )
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {formatTitleCase(
                                                            `${customer.first_name} ${customer.last_name}`
                                                        )}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
