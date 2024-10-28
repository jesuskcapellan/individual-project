"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { toast } from "@/hooks/use-toast";
import { formatTitleCase } from "@/lib/utils";
import { Customer } from "@/types/customer";
import React, { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { Filter } from "@/components/data-table/filter";

export function CustomersPageContent({
    deleteQuery,
    data,
    pagination,
    filters,
}: {
    deleteQuery?: string;
    data: Customer[];
    pagination: {
        currentPage: number;
        totalItems: number;
        itemsPerPage: number;
    };
    filters: Filter[];
}) {
    useEffect(() => {
        setTimeout(() => {
            if (deleteQuery && deleteQuery === "success") {
                toast({
                    title: `Customer deleted successfully`,
                });
            }
        });
    }, [deleteQuery]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>View your customers here.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    url="/customers"
                    columns={columns}
                    data={data.map((customer) => ({
                        ...customer,
                        name: formatTitleCase(
                            `${customer.first_name} ${customer.last_name}`
                        ),
                    }))}
                    filters={filters}
                    pagination={{
                        rowCount: pagination.totalItems,
                        page: pagination.currentPage,
                        take: pagination.itemsPerPage,
                    }}
                    buttons={[
                        {
                            variant: "default",
                            label: "Add Customer",
                            href: "/customers/add",
                        },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
