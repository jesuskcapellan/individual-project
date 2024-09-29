import { icons } from 'lucide-react';
import * as lucide from 'lucide-react';

export namespace IconProps {
    export type Icon = keyof typeof icons;
}

export interface IconProps {
    icon: IconProps.Icon;
    className?: string;
}

export default function Icon({ icon, className }: IconProps) {
    const LucideIcon = lucide[icon];
    return <LucideIcon className={className} />;
}
