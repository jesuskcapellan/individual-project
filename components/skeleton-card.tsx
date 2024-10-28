import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({ variant }: { variant?: "md" | "lg" }) {
    switch (variant) {
        case "lg":
            return (
                <div className="flex flex-col space-y-6">
                    <Skeleton className="h-[250px] w-[500px] rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-[500px]" />
                        <Skeleton className="h-8 w-[400px]" />
                    </div>
                </div>
            );
        default:
            return (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            );
    }
}
