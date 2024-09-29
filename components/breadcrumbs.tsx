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
        if (index === items.length - 1) {
            return (
                <BreadcrumbItem key={index}>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
            );
        }
        return (
            <>
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={item.href}>
                        {item.label}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
            </>
        );
    });
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
        </Breadcrumb>
    );
}
