import Image from "next/image";

import "../globals.css";

import { MainNav } from "../dashboard/components/main-nav";
import { Search } from "../dashboard/components/search";
import TeamSwitcher from "../dashboard/components/team-switcher";
import { UserNav } from "../dashboard/components/user-nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="md:hidden">
          <Image
            src="/examples/dashboard-light.png"
            width={1280}
            height={866}
            alt="Dashboard"
            className="block dark:hidden"
          />
          <Image
            src="/examples/dashboard-dark.png"
            width={1280}
            height={866}
            alt="Dashboard"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              {/* <TeamSwitcher /> */}
              {/* XXX: Dynamic MainNav */}
              <MainNav className="mx-6" currentlySelected="Analytics" />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
