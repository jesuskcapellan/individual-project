"use client";

import { SimpleTable } from "@/components/simple-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { FilmColumn, ActorColumn } from "./columns";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatTitleCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ActorsTab({
    columns,
    data,
}: {
    columns: ColumnDef<ActorColumn>[];
    data: ActorColumn[];
}) {
    const [selectedActor, setSelectedActor] = useState<ActorColumn | null>(
        null
    );
    return (
        <div className="flex gap-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Top Actors</CardTitle>
                    <CardDescription>
                        Actors ranked by total number of rentals across their
                        films
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SimpleTable
                        columns={columns}
                        data={data}
                        onRowClick={(row) => {
                            setSelectedActor(row);
                        }}
                    />
                </CardContent>
            </Card>
            {selectedActor && (
                <Card className="h-fit w-[700px]">
                    <CardHeader>
                        <CardTitle>
                            {formatTitleCase(selectedActor.name)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold">Top Films</p>
                            <div>
                                {selectedActor.films ? (
                                    selectedActor.films
                                        .map((film) =>
                                            formatTitleCase(film.title)
                                        )
                                        .join(", ")
                                ) : (
                                    <span className="text-muted-foreground">
                                        -
                                    </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                Total Film Rentals
                            </p>
                            <p>{selectedActor.totalFilmRentals} rentals</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Link href={`/films?actors=${selectedActor.id}`}>
                            <Button>View More</Button>
                        </Link>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

export function FilmsTab({
    columns,
    data,
}: {
    columns: ColumnDef<FilmColumn>[];
    data: FilmColumn[];
}) {
    const [selectedFilm, setSelectedFilm] = useState<FilmColumn | null>(null);
    return (
        <div className="flex gap-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Top Films</CardTitle>
                    <CardDescription>
                        Films ranked by number of rentals
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SimpleTable
                        columns={columns}
                        data={data}
                        onRowClick={(row) => {
                            setSelectedFilm(row);
                        }}
                    />
                </CardContent>
            </Card>
            {selectedFilm && (
                <Card className="h-fit w-[700px]">
                    <CardHeader>
                        <CardTitle>
                            {formatTitleCase(selectedFilm.title)}
                        </CardTitle>
                        <CardDescription>
                            {selectedFilm.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold">Category</p>
                            <Badge variant="secondary" className="w-fit">
                                {selectedFilm.category}
                            </Badge>
                        </div>
                        {selectedFilm.rentals && (
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold">
                                    Film Rentals
                                </p>
                                <p>{selectedFilm.rentals} rentals</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Link href={`/films?title=${selectedFilm.title}`}>
                            <Button>View More</Button>
                        </Link>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
