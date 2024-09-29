export default function PageWrapper({
    sideNav,
    header,
    children,
}: {
    sideNav: React.ReactNode;
    header: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {sideNav}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                {header}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
