import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isDefined(value: unknown) {
    return value !== undefined && value !== null;
}

export function isNullOrUndefined(value: unknown) {
    return value === null || value === undefined;
}
