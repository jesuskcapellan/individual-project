import { Header } from '@/components/header';
import SideNav, { SideNavProps } from '@/components/side-nav';
import PageWrapper from '@/components/page-wrapper';
import { Breadcrumbs } from '@/components/breadcrumbs';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';

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
            Films Page
        </PageWrapper>
    );
}
