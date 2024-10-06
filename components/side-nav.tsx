import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Icon, { IconProps } from "./icon";

export interface SideNavProps {
    logo: { alt: string; icon: IconProps.Icon };
    items: {
        label: string;
        href: string;
        icon: IconProps.Icon;
        active?: boolean;
    }[];
    bottomItems?: { label: string; href: string; icon: IconProps.Icon }[];
}

export default function SideNav({ logo, items, bottomItems }: SideNavProps) {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Icon
                        icon={logo.icon}
                        className="h-4 w-4 transition-all group-hover:scale-110"
                    />
                    <span className="sr-only">{logo.alt}</span>
                </Link>
                {items.map((item, index) => (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.active
                                            ? "text-accent-foreground pointer-events-none"
                                            : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="h-5 w-5"
                                    />
                                    <span className="sr-only">
                                        {item.label}
                                    </span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.label}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                {bottomItems?.map((item, index) => (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="h-5 w-5"
                                    />
                                    <span className="sr-only">
                                        {item.label}
                                    </span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.label}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </nav>
        </aside>
    );
}
