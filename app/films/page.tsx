import { Header } from '@/components/header';
import SideNav, { SideNavProps } from '@/components/side-nav';
import PageWrapper from '@/components/page-wrapper';
import { Breadcrumbs } from '@/components/breadcrumbs';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';
import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import { data } from './mock-data';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default async function FilmsPage() {
    const navItems: MobileNavProps | SideNavProps = {
        logo: { icon: 'Target', alt: 'Pinpoint Video' },
        items: [
            {
                label: 'Dashboard',
                href: '/',
                icon: 'House',
            },
            {
                label: 'Films',
                href: '/films',
                icon: 'Film',
                active: true,
            },
            {
                label: 'Customers',
                href: '/customers',
                icon: 'Users',
            },
        ],
    };
    return (
        <PageWrapper
            header={
                <Header
                    breadcrumbs={
                        <Breadcrumbs
                            items={[
                                { label: 'Dashboard', href: '/' },
                                { label: 'Films', href: '/films' },
                                { label: 'All Films', href: '/films' },
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
                    <CardTitle>Films</CardTitle>
                    <CardDescription>
                        Manage your films here. Add, edit, or remove films.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        filters={filters}
                    />
                </CardContent>
            </Card>
        </PageWrapper>
    );
}

const filters = [
    {
        id: 'status',
        title: 'Status',
        options: [
            { label: 'Available', value: 'available', variant: 'outline' },
            {
                label: 'Unavailable',
                value: 'unavailable',
                variant: 'destructive',
            },
        ],
    },
    {
        id: 'category',
        title: 'Category',
        options: [
            { label: 'Action', value: 'action' },
            { label: 'Comedy', value: 'comedy' },
        ],
    },
];
