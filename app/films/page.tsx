import { Header } from '@/components/header';
import SideNav, { SideNavProps } from '@/components/side-nav';
import PageWrapper from '@/components/page-wrapper';
import { Breadcrumbs } from '@/components/breadcrumbs';
import MobileNav, { MobileNavProps } from '@/components/mobile-nav';
import { DataTable } from '@/components/data-table';

import { columns } from './columns';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { listFilms } from '@/app/api/films/listFilms';
import { listActors } from '../api/actors/listActors';
import { formatTitleCase } from '@/lib/utils';
import { listCategories } from '../api/categories/listCategories';

export default async function FilmsPage({
    searchParams,
}: {
    searchParams: {
        page: string;
        pageSize: string;
        search: string;
        status: string;
        order: string;
        actors: string;
        category: string;
    };
}) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const pageSize = searchParams.pageSize
        ? [10, 20, 30, 40, 50].includes(parseInt(searchParams.pageSize))
            ? parseInt(searchParams.pageSize)
            : 10
        : 10;
    const search = searchParams.search;
    const statuses = searchParams.status ? searchParams.status.split(',') : [];
    const order = searchParams.order;
    const actors = searchParams.actors ? searchParams.actors.split(',') : [];
    const categories = searchParams.category
        ? searchParams.category.split(',')
        : [];

    const films = await listFilms(
        page,
        pageSize,
        {
            search: search,
            status: statuses,
            actors: actors,
            category: categories,
        },
        order
    );
    const allActors = await listActors();
    const allCategories = await listCategories();
    const filters = [
        {
            id: 'status',
            title: 'Status',
            options: ['available', 'unavailable'].map((status) => ({
                label: status,
                value: status,
            })),
        },
        {
            id: 'actors',
            title: 'Actors',
            options: allActors.map((actor) => ({
                label: formatTitleCase(
                    `${actor.first_name} ${actor.last_name}`
                ),
                value: actor.actor_id.toString(),
            })),
        },
        {
            id: 'category',
            title: 'Category',
            options: allCategories.map((category) => ({
                label: category.name,
                value: category.name,
            })),
        },
    ];
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
                        data={films.films || []}
                        filters={filters}
                        rowCount={films.pagination.totalItems}
                        page={page - 1}
                        pageSize={pageSize}
                        order={order ? [order] : []}
                    />
                </CardContent>
            </Card>
        </PageWrapper>
    );
}

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
