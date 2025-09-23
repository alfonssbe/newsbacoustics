import prismadb from "@/lib/prismadb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/admin/components/ui/dropdown-menu";
import { Button } from "@/app/admin/components/ui/button";
import Image from "next/image";
import { MainNav } from "@/app/admin/components/main-nav";
import { ThemeToggle } from "@/app/admin/components/theme-toggle";
import BrandSwitcher from "@/app/admin/components/brand-switcher";
import LogoutButton from "@/app/admin/components/logout-button";
import { Brand } from "@prisma/client";
import { getSession } from "../../../lib/actions";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }
  let authorizedBrands: Brand[] = []
  if(session.isAdmin){
    const brands = await prismadb.brand.findMany({});
    authorizedBrands = brands
  }
  else{
    const brands = await prismadb.brand.findMany({
      where: {
        id: {
          in: session.authorizedBrands, // Adjusted to use the 'in' operator
        },
      },
    });
    authorizedBrands = brands
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <BrandSwitcher items={authorizedBrands} role={session.username!} />
        <MainNav className="mx-6" isadmin={session.isAdmin!}/>
        <div className="ml-auto flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/profile.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hello, {session.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;