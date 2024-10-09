"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import { useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Filter } from "./filter";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    url: string;
    filters: Filter[];
    pagination: {
        page: number;
        take: number;
        rowCount: number;
    };
}

function generateLink({
    url,
    router,
    pagination,
    columnFilters,
    filters,
    totalPages,
}: {
    url: string;
    router: AppRouterInstance;
    pagination: PaginationState;
    columnFilters: ColumnFiltersState;
    filters: Filter[];
    totalPages: number;
}) {
    const pageString =
        pagination.pageIndex + 1 <= totalPages
            ? `page=${pagination.pageIndex + 1}`
            : `page=${totalPages > 0 ? totalPages : 1}`;
    const takeString = `&take=${pagination.pageSize}`;
    const filtersString = columnFilters
        .map((filter) => {
            const filterOption = filters.find((f) => f.id === filter.id);
            if (filterOption) {
                return `&${filter.id}=${filter.value}`;
            }
            return "";
        })
        .join();
    router.replace(`${url}?${pageString}${takeString}${filtersString}`);
}

export function DataTable<TData, TValue>({
    columns,
    data,
    url,
    filters,
    pagination: { page, take, rowCount },
}: DataTableProps<TData, TValue>) {
    const searchParams = useSearchParams();
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        searchParams
            ? Array.from(searchParams.entries())
                .filter(([key]) => filters.find((f) => f.id === key) !== undefined)
                .map(([key, value]) => {
                    return {
                        id: key,
                        value: value!.split(","),
                        desc: false,
                    };
                })
            : []
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: page,
        pageSize: take,
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
        onSortingChange: setSorting,
        onColumnFiltersChange: (updater) => {
            const newColumnFilters =
                typeof updater === "function" ? updater(columnFilters) : updater;
            const newPagination = {
                pageIndex: 0,
                pageSize: pagination.pageSize,
            };
            setPagination(newPagination);
            setColumnFilters(newColumnFilters);
            generateLink({
                url,
                router,
                pagination: newPagination,
                columnFilters: newColumnFilters,
                filters,
                totalPages: Math.ceil(rowCount / pagination.pageSize),
            });
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
                typeof updater === "function" ? updater(pagination) : updater;
            setPagination(newPagination);
            generateLink({
                url,
                router,
                pagination: newPagination,
                columnFilters,
                filters,
                totalPages: Math.ceil(rowCount / newPagination.pageSize),
            });
        },
        manualFiltering: true,
        manualSorting: true,
    });

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} placeholder="Search" filters={filters} />
            <div className="">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
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
                                    data-state={row.getIsSelected() && "selected"}
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
