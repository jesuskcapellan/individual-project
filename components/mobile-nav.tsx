import Icon, { IconProps } from './icon';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import Link from 'next/link';

export interface MobileNavProps {
    logo: { alt: string; icon: IconProps.Icon };
    items: {
        label: string;
        href: string;
        icon: IconProps.Icon;
        active?: boolean;
    }[];
    bottomItems?: { label: string; href: string; icon: IconProps.Icon }[];
}

export default function MobileNav({ logo, items }: MobileNavProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <Icon icon="PanelLeft" className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Icon icon={logo.icon} className="h-5 w-5" />
                        <span className="sr-only">{logo.alt}</span>
                    </Link>
                    {items.map((item) => {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Icon icon={item.icon} className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
