'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/data-table/header';
import { DataTableRowActions } from '@/components/data-table/actions';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Film } from '@/types/film';

const categories = [
    {
        value: 'action',
        label: 'Action',
    },
    {
        value: 'comedy',
        label: 'Comedy',
    },
];

const statuses: {
    value: string;
    label: string;
    variant: BadgeProps['variant'];
}[] = [
    {
        value: 'available',
        label: 'Available',
        variant: 'outline',
    },
    {
        value: 'unavailable',
        label: 'Unavailable',
        variant: 'destructive',
    },
];

export const columns: ColumnDef<Film>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('title')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
            <div className="w-[500px]">{row.getValue('description')}</div>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue('status')
            );

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    <Badge variant={status.variant}>{status.label}</Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const category = categories.find(
                (category) => category.value === row.getValue('category')
            );

            if (!category) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    <span>{category.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'length',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Length" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px]">{row.getValue('length')}</div>
        ),
    },
    {
        id: 'release year',
        accessorKey: 'release_year',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Release Year" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px]">{row.getValue('release year')}</div>
        ),
    },
    {
        id: 'actions',
        cell: () => <DataTableRowActions />,
    },
];
