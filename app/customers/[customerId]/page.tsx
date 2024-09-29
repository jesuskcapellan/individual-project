import { Breadcrumbs } from '@/components/breadcrumbs';
import { Header } from '@/components/header';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';
import PageWrapper from '@/components/page-wrapper';
import SideNav, { SideNavProps } from '@/components/side-nav';

export default async function CustomerDetailsPage({
    params,
}: {
    params: { customerId: string };
}) {
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
            },
            {
                label: 'Customers',
                href: '/customers',
                icon: 'Users',
                active: true,
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
                                { label: 'Customers', href: '/customers' },
                                {
                                    label: `Customer ${params.customerId}`,
                                    href: `/customers/${params.customerId}`,
                                },
                            ]}
                        />
                    }
                    mobileNav={<MobileNav {...navItems} />}
                />
            }
            sideNav={<SideNav {...navItems} />}
        >
            Customer {params.customerId} Details Page
        </PageWrapper>
    );
}
