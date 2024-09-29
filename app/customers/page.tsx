import { Header } from '@/components/header';
import SideNav, { SideNavProps } from '@/components/side-nav';
import PageWrapper from '@/components/page-wrapper';
import { Breadcrumbs } from '@/components/breadcrumbs';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';

export default async function CustomersPage() {
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
                                { label: 'All Customers', href: '/customers' },
                            ]}
                        />
                    }
                    mobileNav={<MobileNav {...navItems} />}
                />
            }
            sideNav={<SideNav {...navItems} />}
        >
            Customers Page
        </PageWrapper>
    );
}
