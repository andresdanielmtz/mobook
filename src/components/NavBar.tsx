import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";

const Links: { title: string; url: string }[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Search",
    url: "/search",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Profile",
    url: "/profile",
  },
];

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  url: string;
}

// TODO: Add description when hovering over the list item.
// ui.shadcn.com/docs/components/navigation-menu

const ListItem = React.forwardRef<React.ComponentRef<"a">, ListItemProps>(
  ({ className, children, url, ...props }, ref) => {
    const navigate = useNavigate();
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            onClick={() => navigate(url)}
            {...props}
          >
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const NavBar = () => {
  return (
    <NavigationMenu style={{ position: "static" }}>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Mobook
      </h2>

      <NavigationMenuList>
        {Links.map((link) => (
          <NavigationMenuItem key={link.title}>
            <NavigationMenuTrigger>
              <ListItem url={link.url}>{link.title}</ListItem>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        ))}
        <NavigationMenuIndicator />
        <NavigationMenuViewport />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavBar;
