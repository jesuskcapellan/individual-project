import React from "react";
import { listFilmCopies } from "@/app/api/inventory/listFilmCopies";
import { getFilm } from "@/app/api/films/getFilm";
import { SelectForm } from "./form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Header } from "@/components/header";
import MobileNav, { MobileNavProps } from "@/components/mobile-nav";
import PageWrapper from "@/components/page-wrapper";
import SideNav, { SideNavProps } from "@/components/side-nav";

export default async function Page({ params }: { params: { filmId: string } }) {
  const copies = await listFilmCopies({
    filmId: parseInt(params.filmId),
    status: "available",
  });
  const film = await getFilm({ filmId: parseInt(params.filmId) });

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
  if (!film) {
    return null;
  }
  copies.forEach((copy) => console.log(copy.rentals));
  return (
    <PageWrapper
      header={
        <Header
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: "Dashboard", href: "/" },
                { label: "Films", href: "/films" },
                { label: `${film.title}`, href: `/films/${params.filmId}` },
                {
                  label: `Rent ${film.title}`,
                  href: `/films/${params.filmId}/rent`,
                },
              ]}
            />
          }
          mobileNav={<MobileNav {...navItems} />}
        />
      }
      sideNav={<SideNav {...navItems} />}
    >
      <SelectForm filmCopies={copies} />
    </PageWrapper>
  );
}
