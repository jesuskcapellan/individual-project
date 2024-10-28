"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { toast } from "@/hooks/use-toast";
import { formatTitleCase } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { Rental } from "@/types/rental";
import React, { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCustomerAction } from "./actions";
import Icon from "@/components/icon";

export function CustomerPageContent({
    submit,
    customer,
    data,
    pagination,
}: {
    submit?: string;
    customer: Customer;
    data: Rental[];
    pagination: {
        currentPage: number;
        totalItems: number;
        itemsPerPage: number;
    };
}) {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            if (submit && submit === "added") {
                toast({
                    title: `Successfully added ${formatTitleCase(`${customer.first_name} ${customer.last_name}`)}`,
                });
            }
            if (submit && submit === "edited") {
                toast({
                    title: `Successfully edited ${formatTitleCase(`${customer.first_name} ${customer.last_name}`)}`,
                });
            }
        });
    }, [submit, customer]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    {formatTitleCase(
                        `${customer.first_name} ${customer.last_name}`
                    )}
                    <div className="flex gap-2">
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                await deleteCustomerAction(customer.id);
                                router.push("/customers?delete=success");
                            }}
                            className="flex gap-2"
                        >
                            <Icon icon="Trash" className="h-4 w-4" />
                            Delete
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                router.push(`/customers/${customer.id}/edit`)
                            }
                            className="flex gap-2"
                        >
                            <Icon icon="Pencil" className="h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-32">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Email
                        </h3>
                        <span className="text-lg font-medium">
                            {customer.email}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Address
                        </h3>
                        <span className="text-lg font-medium">
                            {customer.address?.address}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                        Film Rentals
                    </h3>
                    <div className="border border-border rounded-md pb-2">
                        <DataTable
                            columns={columns}
                            data={data}
                            url={`/customers/${customer.id}`}
                            filters={[]}
                            pagination={{
                                page: pagination.currentPage - 1,
                                take: pagination.itemsPerPage,
                                rowCount: pagination.totalItems,
                            }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
