import { getFilm } from "@/app/api/films/getFilm";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Header } from "@/components/header";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import PageWrapper from "@/components/page-wrapper";
import SideNav, { SideNavProps } from "@/components/side-nav";
import { formatTitleCase } from "@/lib/utils";
import { FilmDetailsClient } from "./client";

export default async function FilmDetailsPage({
    params,
    searchParams,
}: {
    params: { filmId: string };
    searchParams: { submit?: string };
}) {
    const film = await getFilm({ filmId: parseInt(params.filmId) });
    if (!film) {
        return null;
    }
    return (
        <PageWrapper
            header={
                <Header
                    breadcrumbs={
                        <Breadcrumbs
                            items={[
                                { label: "Dashboard", href: "/" },
                                { label: "Films", href: "/films" },
                                {
                                    label: formatTitleCase(film.title),
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
            <FilmDetailsClient
                film={film}
                success={searchParams.submit === "success"}
            />
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
            active: true,
        },
        {
            label: "Customers",
            href: "/customers",
            icon: "Users",
        },
    ],
};
