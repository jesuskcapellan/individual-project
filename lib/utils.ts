import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isDefined(value: unknown) {
    return value !== undefined && value !== null;
}

export function isNullOrUndefined(value: unknown) {
    return value === null || value === undefined;
}

export function formatFilmLength(length: number | string): string {
    const minutes = Number(length);
    if (isNaN(minutes)) {
        return "Invalid length";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h ${remainingMinutes}m`;
    }
}

export function formatTitleCase(title: string): string {
    return title
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

export function validateNumeric(param: string | null | undefined) {
    if (isDefined(param)) {
        const parsedParam = parseInt(param);
        return isNaN(parsedParam) ? undefined : parsedParam;
    }
}
