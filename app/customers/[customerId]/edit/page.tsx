import React from "react";
import { EditCustomerForm } from "./form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Header } from "@/components/header";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import PageWrapper from "@/components/page-wrapper";
import SideNav, { SideNavProps } from "@/components/side-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listStores } from "@/server/stores/listStores";
import { listAddresses } from "@/server/addresses/listAddresses";
import { getCustomer } from "@/server/customers/getCustomer";
import { notFound } from "next/navigation";
import { parseInt } from "lodash";
import { formatTitleCase } from "@/lib/utils";

export default async function Page({
    params,
}: {
    params: { customerId: string };
}) {
    if (isNaN(parseInt(params.customerId))) {
        notFound();
    }
    const customer = await getCustomer({
        customerId: parseInt(params.customerId),
    });
    if (!customer) {
        notFound();
    }
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
                                    label: `${formatTitleCase(`${customer.first_name} ${customer.last_name}`)}`,
                                    href: `/customers/${customer.id}/edit`,
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
                    <CardTitle>{`Edit ${formatTitleCase(`${customer.first_name} ${customer.last_name}`)}`}</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditCustomerForm
                        initialValues={{
                            customerId: customer.id,
                            firstName: customer.first_name,
                            lastName: customer.last_name,
                            email: customer.email,
                            storeId: customer.store!.id,
                            addressId: customer.address!.id,
                            address: customer.address!.address,
                        }}
                        stores={stores}
                        initialAddresses={[customer.address!, ...addresses]}
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
