import { Breadcrumbs } from "@/components/breadcrumbs";
import { Header } from "@/components/header";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import PageWrapper from "@/components/page-wrapper";
import SideNav, { SideNavProps } from "@/components/side-nav";
import { listTopFilms } from "./api/films/listTopFilms";
import { actorColumns, filmColumns } from "./columns";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { listTopActors } from "./api/actors/listTopActors";
import { ActorsTab, FilmsTab } from "./tabs";

export default async function Home() {
    const topFilms = (await listTopFilms({ take: 5 })).map((film, index) => ({
        ...film,
        rank: index + 1,
    }));
    const topActors = (await listTopActors({ take: 5 })).map(
        (actor, index) => ({
            id: actor.id,
            name: actor.first_name + " " + actor.last_name,
            films: actor.films || [],
            totalFilmRentals: actor.totalFilmRentals || NaN,
            rank: index + 1,
        })
    );
    const navItems: MobileNavProps | SideNavProps = {
        logo: { icon: "Target", alt: "Pinpoint Video" },
        items: [
            {
                label: "Dashboard",
                href: "/",
                icon: "House",
                active: true,
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
            },
        ],
    };
    return (
        <PageWrapper
            header={
                <Header
                    breadcrumbs={
                        <Breadcrumbs
                            items={[{ label: "Dashboard", href: "/" }]}
                        />
                    }
                    mobileNav={<MobileNav {...navItems} />}
                />
            }
            sideNav={<SideNav {...navItems} />}
        >
            <Tabs defaultValue="top-films">
                <TabsList>
                    <TabsTrigger value="top-films">Films</TabsTrigger>
                    <TabsTrigger value="top-actors">Actors</TabsTrigger>
                </TabsList>
                <TabsContent value="top-films">
                    <FilmsTab columns={filmColumns} data={topFilms} />
                </TabsContent>
                <TabsContent value="top-actors">
                    <ActorsTab columns={actorColumns} data={topActors} />
                </TabsContent>
            </Tabs>
        </PageWrapper>
    );
}
