import React from "react";
import { AddCustomerForm } from "./form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Header } from "@/components/header";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import PageWrapper from "@/components/page-wrapper";
import SideNav, { SideNavProps } from "@/components/side-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listStores } from "@/server/stores/listStores";
import { listAddresses } from "@/server/addresses/listAddresses";

export default async function Page() {
    const stores = await listStores();
    const addresses = await listAddresses({ address: "" });
    return (
        <PageWrapper
            header={
                <Header
                    breadcrumbs={
                        <Breadcrumbs
                            items={[
                                { label: "Dashboard", href: "/" },
                                {
                                    label: "Customers",
                                    href: "/customers",
                                },
                                {
                                    label: "Add Customer",
                                    href: "/customers/add",
                                },
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
                    <CardTitle>Add Customer</CardTitle>
                </CardHeader>
                <CardContent>
                    <AddCustomerForm
                        stores={stores}
                        initialAddresses={addresses}
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
