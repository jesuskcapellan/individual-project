"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/header";
import { Badge } from "@/components/ui/badge";
import { formatTitleCase } from "@/lib/utils";
import { DataTableRowActions } from "@/components/data-table/actions";
import { Customer } from "@/types/customer";

export interface CustomerColumn {
    id: number;
    name: string;
    email: string;
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer ID" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("id")}
                    </span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {formatTitleCase(row.getValue("name") as string)}
                    </span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => <Badge variant="outline">{row.getValue("email")}</Badge>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DataTableRowActions
                items={[
                    {
                        type: "link",
                        label: "Rent",
                        href: `/customers/${row.original.id}/rent`,
                    },
                ]}
            />
        ),
        enableHiding: false,
    },
];
