'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/data-table/header';
import { DataTableRowActions } from '@/components/data-table/actions';
import { Badge } from '@/components/ui/badge';
import { Film } from '@/types/film';
import { formatTitleCase } from '@/lib/utils';

export const columns: ColumnDef<Film>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllRowsSelected() ||
                    (table.getIsSomeRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllRowsSelected(!!value)
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
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {formatTitleCase(row.getValue('title') as string)}
                    </span>
                </div>
            );
        },
        enableHiding: false,
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
            <div className="w-[500px]">{row.getValue('description')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'actors',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actors" />
        ),
        cell: ({ row }) => {
            const actors = row.getValue('actors');

            if (!Array.isArray(actors)) {
                return null;
            }
            const titleCaseActors = actors.map((actor) =>
                formatTitleCase(actor)
            );
            return (
                <div className="max-w-[400px]">
                    {titleCaseActors.join(', ')}
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            return (
                <Badge variant="secondary">{row.getValue('category')}</Badge>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <Badge
                        variant={
                            row.getValue('status') === 'available'
                                ? 'default'
                                : 'outline'
                        }
                        className="capitalize"
                    >
                        {row.getValue('status')}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: () => <DataTableRowActions />,
        enableHiding: false,
    },
];
