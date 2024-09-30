import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb';

export function Breadcrumbs({
    items,
}: {
    items: { label: string; href: string }[];
}) {
    const breadcrumbItems = items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
            <React.Fragment key={index}>
                <BreadcrumbItem>
                    {isLastItem ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href={item.href}>
                            {item.label}
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
        );
    });
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
        </Breadcrumb>
    );
}
