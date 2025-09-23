"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/app/admin/components/ui/button";
import { DataTable } from "@/app/admin/components/ui/data-table";
import { Heading } from "@/app/admin/components/ui/heading";
import { Separator } from "@/app/admin/components/ui/separator";
import { ApiList } from "@/app/admin/components/ui/api-list";

import { columns, CustomProductColumn } from "./columns";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/app/admin/components/ui/toggle-group";

interface CustomProductClientProps {
  data: CustomProductColumn[];
  userRole: boolean
}

export const CustomProductClient: React.FC<CustomProductClientProps> = ({
  data,
  userRole
}) => {
  const [filter, setFilter] = useState('all')
  let sentData: CustomProductColumn[] = data;
  if(filter === 'all'){
    sentData = data
  }
  else if(filter === 'kits'){
    sentData = data.filter(item => item.isKits === true)
  }
  else if(filter === 'coax'){
    sentData = data.filter(item => item.isCoax === true)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Kits & Coaxials Products (${sentData.length})`} description="Manage Your Kits & Coaxials products" />
      </div>
      <Separator />
      <ToggleGroup type="single">
        <ToggleGroupItem value="all" aria-label="Toggle all"  onClick={() => {
                setFilter("all")
                }}>
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="kits" aria-label="Toggle kits"  onClick={() => {
                  setFilter("kits")
                }}>
          Kits
        </ToggleGroupItem>
        <ToggleGroupItem value="coax" aria-label="Toggle coax"  onClick={() => {
                  setFilter("coax")
                }}>
          Coaxials
        </ToggleGroupItem>
      </ToggleGroup>
      <DataTable searchKey="name" columns={columns} data={sentData} />
      {userRole? (<>
        <Heading title="API" description="API Calls for Custom Products" />
        <Separator />
        <ApiList entityName="custom" entityIdName="customProductId" />
      </>)
        : 
        (<></>)
      }
    </>
  );
};
