import { Header } from "@/components/header";
import SideNav, { SideNavProps } from "@/components/side-nav";
import PageWrapper from "@/components/page-wrapper";
import { Breadcrumbs } from "@/components/breadcrumbs";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import { listCustomers } from "@/server/customers/listCustomers";
import { validateNumeric } from "@/lib/utils";
import { Filter } from "@/components/data-table/filter";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/skeleton-card";
import { CustomersPageContent } from "./content";

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: {
        page?: string;
        take?: string;
        name?: string;
        id?: string;
        delete?: string;
    };
}) {
    const page = validateNumeric(searchParams.page);
    const take = validateNumeric(searchParams.take);
    const id = validateNumeric(searchParams.id);
    const name = searchParams.name;

    const { customers, pagination } = await listCustomers({
        page: page,
        take: take,
        search: id ?? name,
    });

    if (page && pagination.totalPages > 0 && page > pagination.totalPages) {
        const takeUrl = take ? "&take=" + take : "";
        const idUrl = id ? "&id=" + id : "";
        const nameUrl = name ? "&name=" + name : "";
        redirect(
            "/customers?page=" +
            pagination.totalPages +
            takeUrl +
            idUrl +
            nameUrl
        );
    }

    const tableFilters: Filter[] = [
        {
            id: "id",
            type: "text",
            text: searchParams.id || "",
        },
        {
            id: "name",
            type: "text",
            text: searchParams.name || "",
        },
    ];

    return (
        <PageWrapper
            header={
                <Header
                    breadcrumbs={
                        <Breadcrumbs
                            items={[
                                { label: "Dashboard", href: "/" },
                                { label: "Customers", href: "/customers" },
                                { label: "All Customers", href: "/customers" },
                            ]}
                        />
                    }
                    mobileNav={<MobileNav {...navItems} />}
                />
            }
            sideNav={<SideNav {...navItems} />}
        >
            <Suspense fallback={<SkeletonCard variant="lg" />}>
                <CustomersPageContent
                    data={customers}
                    pagination={pagination}
                    deleteQuery={searchParams.delete}
                    filters={tableFilters}
                />
            </Suspense>
        </PageWrapper>
    );
}

const navItems: MobileNavProps | SideNavProps = {
    logo: { icon: "Target", alt: "Pinpoint Video" },
    items: [
        {
            label: "Dashboard",
            href: "/",
            icon: "House",
        },
        {
            label: "Films",
            href: "/films",
            icon: "Film",
        },
        {
            label: "Customers",
            href: "/customers",
            icon: "Users",
            active: true,
        },
    ],
};
