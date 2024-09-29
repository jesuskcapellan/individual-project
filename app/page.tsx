import { Breadcrumbs } from '@/components/breadcrumbs';
import { Header } from '@/components/header';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';
import PageWrapper from '@/components/page-wrapper';
import SideNav, { SideNavProps } from '@/components/side-nav';

export default async function Home() {
    const navItems: MobileNavProps | SideNavProps = {
        logo: { icon: 'Target', alt: 'Pinpoint Video' },
        items: [
            {
                label: 'Dashboard',
                href: '/',
                icon: 'House',
                active: true,
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
            },
        ],
    };
    return (
        <PageWrapper
            header={
                <Header
                    breadcrumbs={
                        <Breadcrumbs
                            items={[{ label: 'Dashboard', href: '/' }]}
                        />
                    }
                    mobileNav={<MobileNav {...navItems} />}
                />
            }
            sideNav={<SideNav {...navItems} />}
        >
            Landing Page
        </PageWrapper>
    );
}
