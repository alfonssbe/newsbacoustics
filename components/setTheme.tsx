"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ChangeTheme({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    pathname.includes("sbaudience")?
        setTheme('sbaudience')
    : 
    pathname.includes("sbautomotive")?
        setTheme('sbautomotive')
    :
        setTheme('sbacoustics');
    
  }, [pathname]);

  return <>{children}</>;
}
