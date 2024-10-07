"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { formatTitleCase } from "@/lib/utils";
import { Film } from "@/types/film";

export function FilmDetailsClient({
    film,
    success,
}: {
    film: Film;
    success: boolean;
}) {
    if (success) {
        toast({
            title: `You successfully rented out ${formatTitleCase(film.title)}!`,
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{formatTitleCase(film.title)}</CardTitle>
            </CardHeader>
        </Card>
    );
}
