"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/header";
import { Badge } from "@/components/ui/badge";
import { formatTitleCase } from "@/lib/utils";
import { Rental } from "@/types/rental";
import { DataTableRowActions } from "@/components/data-table/actions";
import { returnRentalAction } from "./actions";

export const columns: ColumnDef<Rental>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rental ID" />
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
        accessorKey: "filmTitle",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Film" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {formatTitleCase(row.getValue("filmTitle") as string)}
                    </span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "rentalDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rental Date" />
        ),
        cell: ({ row }) => (
            <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium">
                    {row.original.rentalDate.toLocaleString()}
                </span>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "returnDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Return Date" />
        ),
        cell: ({ row }) =>
            row.original.returnDate !== null ? (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.original.returnDate.toLocaleString()}
                    </span>
                </div>
            ) : (
                <Badge>Rented Out</Badge>
            ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        cell: ({ row }) =>
            row.original.returnDate === null && (
                <DataTableRowActions
                    items={[
                        {
                            type: "action",
                            label: "Return",
                            action: async (router) => {
                                await returnRentalAction(row.original.id);
                                router.refresh();
                            },
                        },
                    ]}
                />
            ),
        enableHiding: false,
    },
];
