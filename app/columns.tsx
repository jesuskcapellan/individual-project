"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/header";
import { Film } from "@/types/film";
import { formatTitleCase } from "@/lib/utils";

export interface FilmColumn extends Film {
    rank: number;
}

export interface ActorColumn {
    id: number;
    name: string;
    films: Omit<Film, "actors">[];
    totalFilmRentals: number;
    rank: number;
}

export const filmColumns: ColumnDef<FilmColumn>[] = [
    {
        accessorKey: "rank",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rank" />
        ),
        cell: ({ row }) => {
            return <div>{row.getValue("rank")}</div>;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate font-medium">
                        {formatTitleCase(row.getValue("title") as string)}
                    </span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];

export const actorColumns: ColumnDef<ActorColumn>[] = [
    {
        accessorKey: "rank",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rank" />
        ),
        cell: ({ row }) => {
            return <div>{row.getValue("rank")}</div>;
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
];
