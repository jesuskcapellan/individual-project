import { Header } from "@/components/header";
import SideNav, { SideNavProps } from "@/components/side-nav";
import PageWrapper from "@/components/page-wrapper";
import { Breadcrumbs } from "@/components/breadcrumbs";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import { listCustomers } from "../api/customers/listCustomers";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./colummns";
import { formatTitleCase, validateNumeric } from "@/lib/utils";
import { Filter } from "@/components/data-table/filter";
import { redirect } from "next/navigation";

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: { page?: string; take?: string; name?: string; id?: string };
}) {
    const page = validateNumeric(searchParams.page);
    const take = validateNumeric(searchParams.take);
    const id = validateNumeric(searchParams.id);
    const name = searchParams.name;

    const { customers, pagination } = await listCustomers({
        page: page,
        take: take,
        filters: { name, id },
    });

    if (page && page > pagination.totalPages) {
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
            <Card>
                <CardHeader>
                    <CardTitle>Customers</CardTitle>
                    <CardDescription>View your customers here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        url="/customers"
                        columns={columns}
                        data={customers.map((customer) => ({
                            ...customer,
                            name: formatTitleCase(
                                `${customer.first_name} ${customer.last_name}`
                            ),
                        }))}
                        filters={tableFilters}
                        pagination={{
                            rowCount: pagination.totalItems,
                            page: page ? page - 1 : 1,
                            take: take ? take : 5,
                        }}
                    />
                </CardContent>
            </Card>
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
