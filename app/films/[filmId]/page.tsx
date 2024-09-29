import { Breadcrumbs } from '@/components/breadcrumbs';
import { Header } from '@/components/header';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';
import PageWrapper from '@/components/page-wrapper';
import SideNav, { SideNavProps } from '@/components/side-nav';

export default async function FilmDetailsPage({
    params,
}: {
    params: { filmId: string };
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
                                {
                                    label: `Film ${params.filmId}`,
                                    href: `/films/${params.filmId}`,
                                },
                            ]}
                        />
                    }
                    mobileNav={<MobileNav {...navItems} />}
                />
            }
            sideNav={<SideNav {...navItems} />}
        >
            Film {params.filmId} Details Page
        </PageWrapper>
    );
}
