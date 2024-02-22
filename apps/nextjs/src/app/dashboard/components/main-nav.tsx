import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV = {
  Overview: "/examples/dashboard",
  Customers: "/examples/dashboard",
  Products: "/examples/dashboard",
  Settings: "/examples/dashboard",
};
export function MainNav({
  className,
  currentlySelected,
  ...props
}: React.HTMLAttributes<HTMLElement> & { currentlySelected?: string }) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {Object.entries(NAV).map(([name, link]) => {
        return (
          <Link
            key={name}
            href={link}
            className={
              name == currentlySelected
                ? "hover:text-primary text-sm font-medium transition-colors"
                : "text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            }
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
