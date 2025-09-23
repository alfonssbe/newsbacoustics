"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/admin/components/ui/navigation-menu"
import { useParams, usePathname } from "next/navigation"
interface MainNavClientProps {
  isadmin: boolean;
}

type MainNavProps = React.HTMLAttributes<HTMLElement> & MainNavClientProps;

export function MainNav({
  isadmin,
  className,
  ...props
}: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();

  const Products: { title: string; href: string; description: string }[] = [
    {
      title: "All Products",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`,
      description:
        "Show All Products",
    },
    {
      title: "Featured Products",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/featuredproduct`,
      description:
        "Show All Featured Products.",
    },
    {
      title: "Kits & Coaxials",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customproduct`,
      description:
        "Show All Kits & Coaxials Products.",
    },
    ...(isadmin
      ? [
        {
          title: "Size",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/size`,
          description:
            "Show All Sizes.",
        },
        {
          title: "Category",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/category`,
          description:
            "Show All Categories.",
        },
        {
          title: "Sub Category",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/subcategory`,
          description: "Show All Sub Categories.",
        },
        {
          title: "Sub Sub Category",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/subsubcategory`,
          description:
            "Show All Sub Sub Categories.",
        },
      ]
    : []),
    {
      title: "Menu Priority",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/priority`,
      description:
        "Set Priorities for Dropdown Menu.",
    },
  ]
  

  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link 
          href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}`}
          passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Overview
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1 ">
              {Products.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isadmin? (
          <>
          <NavigationMenuItem>
            <Link 
            href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customapi`}
            passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Custom API
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/settings`} 
            passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Brand Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/usersettings`} 
            passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                User Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/createuser`} 
            passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create New User
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          </>
        ): (
          <></>
        )}
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-primary focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
