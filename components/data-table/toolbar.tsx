"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./filter";
import { Filter } from "./filter";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    placeholder: string;
    filters: Filter[];
}

export function DataTableToolbar<TData>({
    table,
    placeholder,
    filters,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {filters
                    .filter((item) => item.type === "text")
                    .map((filter) => (
                        <Input
                            key={filter.id}
                            placeholder={`${placeholder} by ${filter.id}`}
                            value={
                                (table.getColumn(filter.id)?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table.getColumn(filter.id)?.setFilterValue(event.target.value)
                            }
                            className="h-8 w-[150px] lg:w-[250px]"
                        />
                    ))}
                {filters
                    .filter((item) => item.type === "property")
                    .map((filter) => (
                        <div key={filter.id}>
                            <DataTableFacetedFilter
                                key={filter.id}
                                column={table.getColumn(filter.id)}
                                title={filter.title}
                                options={filter.options}
                            />
                        </div>
                    ))}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
