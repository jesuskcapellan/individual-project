import { Header } from "@/components/header";
import SideNav, { SideNavProps } from "@/components/side-nav";
import PageWrapper from "@/components/page-wrapper";
import { Breadcrumbs } from "@/components/breadcrumbs";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import { listCustomers } from "../api/categories/customers/listCustomers";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./colummns";
import { formatTitleCase } from "@/lib/utils";
import { Filter } from "@/components/data-table/filter";

export default async function CustomersPage({
    searchParams: { page = "1", take = "5", name = "", id = "" },
}: {
    searchParams: { page?: string; take?: string; name?: string; id?: string };
}) {
    const pageParam = isNaN(parseInt(page)) ? 1 : parseInt(page);
    const takeParam = isNaN(parseInt(take)) ? 1 : parseInt(take);
    const idParam = isNaN(parseInt(id)) ? undefined : parseInt(id);
    const { customers, pagination } = await listCustomers({
        page: pageParam,
        take: takeParam,
        filters: { search: name, id: idParam },
    });
    const tableFilters: Filter[] = [
        {
            id: "id",
            type: "text",
            text: id,
        },
        {
            id: "name",
            type: "text",
            text: name,
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
                            page: pageParam - 1,
                            take: takeParam,
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
