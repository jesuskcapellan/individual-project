'use client';

import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './pagination';
import { DataTableToolbar } from './toolbar';
import { useRouter } from 'next/navigation';

interface Filter {
    id: string;
    title: string;
    options: {
        label: string;
        value: string;
    }[];
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filters: Filter[];
    rowCount: number;
    page: number;
    pageSize: number;
    order: string[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filters,
    rowCount,
    page,
    pageSize,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: page,
        pageSize,
    });
    const router = useRouter();

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: (updater) => {
            const newSorting =
                typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(newSorting);
            router.replace(
                `/films?page=${pagination.pageIndex + 1}&pageSize=${
                    pagination.pageSize
                }${columnFilters
                    .map((filter) => {
                        const filterOption = filters.find(
                            (f) => f.id === filter.id
                        );
                        if (filter.id === 'title') {
                            return `&search=${filter.value}`;
                        }
                        if (filterOption) {
                            return `&${filter.id}=${filter.value}`;
                        }
                        return '';
                    })
                    .join('')}${newSorting
                    .map((sort) => {
                        return `&order=${sort.desc ? 'desc' : 'asc'}`;
                    })
                    .join('')}`
            );
        },
        onColumnFiltersChange: (updater) => {
            const newColumnFilters =
                typeof updater === 'function'
                    ? updater(columnFilters)
                    : updater;
            setColumnFilters(newColumnFilters);
            router.replace(
                `/films?page=${pagination.pageIndex + 1}&pageSize=${
                    pagination.pageSize
                }${newColumnFilters
                    .map((filter) => {
                        const filterOption = filters.find(
                            (f) => f.id === filter.id
                        );
                        if (filter.id === 'title') {
                            return `&search=${filter.value}`;
                        }
                        if (filterOption) {
                            return `&${filter.id}=${filter.value}`;
                        }
                        return '';
                    })
                    .join('')}${sorting
                    .map((sort) => {
                        return `&order=${sort.desc ? 'desc' : 'asc'}`;
                    })
                    .join('')}`
            );
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        rowCount,
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === 'function' ? updater(pagination) : updater;
            setPagination(newPagination);
            router.replace(
                `/films?page=${newPagination.pageIndex + 1}&pageSize=${
                    newPagination.pageSize
                }${columnFilters
                    .map((filter) => {
                        const filterOption = filters.find(
                            (f) => f.id === filter.id
                        );
                        if (filter.id === 'title') {
                            return `&search=${filter.value}`;
                        }
                        if (filterOption) {
                            return `&${filter.id}=${filter.value}`;
                        }
                        return '';
                    })
                    .join('')}${sorting
                    .map((sort) => {
                        return `&order=${sort.desc ? 'desc' : 'asc'}`;
                    })
                    .join('')}`
            );
        },
        manualFiltering: true,
        manualSorting: true,
    });

    return (
        <div className="space-y-4">
            <DataTableToolbar
                table={table}
                placeholder="Search"
                filters={filters}
            />
            <div className="">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
