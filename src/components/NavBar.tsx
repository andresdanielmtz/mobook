import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import React, { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { AuthContext } from "@/context/AuthContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import getInitials from "@/utils/avatar";
import { StoreUser } from "@/model/User";
import { getUserById } from "@/services/authenticationServices";
import getInitialsAdapter from "@/utils/avatar";

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
];

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  url?: string;
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
              className,
            )}
            onClick={() => url && navigate(url)}
            {...props}
          >
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

interface WarningLogoutModalProps {
  onClose: () => void;
  onLogout: (event: React.FormEvent) => void;
}

const WarningLogoutModal = ({ onClose, onLogout }: WarningLogoutModalProps) => {
  const handleLogout = (event: React.FormEvent) => {
    onLogout(event);
    onClose();
  };

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ready to take a break?</DialogTitle>
          <DialogDescription>
            Just click logout if you're sure you want to sign out.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
              className="ml-5"
            >
              Logout
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = React.useState<boolean>(false);
  const [userData, setUserData] = useState<StoreUser>();

  useEffect(() => {
    if (!user) return;
    getUserById(user.uid).then((payload) => {
      setUserData(payload);
    });
  }, [user]);

  function handleShowLogoutModal() {
    setShowLogoutModal(true);
  }
  function handleCloseLogoutModal() {
    setShowLogoutModal(false);
  }

  function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    logout();
    navigate("/"); // Will redirect from home to login page after.
  }

  return (
    <Dialog>
      <NavigationMenu style={{ position: "static" }}>
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mr-5">
          Mobook
        </h2>
        {showLogoutModal && (
          <WarningLogoutModal
            onClose={handleCloseLogoutModal}
            onLogout={handleLogout}
          />
        )}

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
          {user && (
            <>
              <NavigationMenuItem key="profile">
                <Avatar
                  onClick={() => navigate(`/profile/${user?.uid}`)}
                  className="justify-end ml-5 transition transform duration-200 hover:scale-150"
                >
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {userData ? getInitialsAdapter(userData) : "AM"}
                  </AvatarFallback>
                </Avatar>
              </NavigationMenuItem>
              <NavigationMenuItem
                key="logout"
                onClick={handleShowLogoutModal}
                className="ml-5"
              >
                <DialogTrigger>
                  <ListItem className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Logout
                  </ListItem>
                </DialogTrigger>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </Dialog>
  );
};

export default NavBar;
