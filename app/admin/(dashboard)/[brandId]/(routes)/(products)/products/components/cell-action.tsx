"use client";

import axios from "axios";
import { BookIcon, BookOpenCheck, Copy, Edit, MoreHorizontal, Settings2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/app/admin/components/modals/alert-modal";
import { Button } from "@/app/admin/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/app/admin/components/ui/dropdown-menu";

import { ProductColumn } from "./columns";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onConfirm = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/products/${data.id}`);
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`);
        router.refresh();
        toast.success('Product deleted.');
      }
    } catch (error) {
      router.refresh()
      toast.error('Something went wrong');
    } finally {
      setTimeout(() => {
        window.location.reload();
        setOpen(false); 
        setLoading(false);
      }, 2000); 
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Product ID copied to clipboard.');
  }

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => {
          setOpen(false);
          window.location.reload();
        }}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          {params.brandId === process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID?
            <DropdownMenuItem
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/specification`)}
            >
              <Settings2 className="mr-2 h-4 w-4" /> Set Specification
            </DropdownMenuItem>
          : params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID?
            <>
            <DropdownMenuItem
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/sbaudience_specification`)}
            >
              <Settings2 className="mr-2 h-4 w-4" /> Set Specification
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/sbaudience_specification_hf`)}
            >
              <Settings2 className="mr-2 h-4 w-4" /> Set HF Specification
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/sbaudience_thiele_specification`)}
            >
              <Settings2 className="mr-2 h-4 w-4" /> Set Thiele Small Parameters
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/sbaudience_horns_specification`)}
            >
              <Settings2 className="mr-2 h-4 w-4" /> Set Horns Specification
            </DropdownMenuItem>
            </>
          :
          <DropdownMenuItem
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/specification`)}
        >
          <Settings2 className="mr-2 h-4 w-4" /> Set Specification
        </DropdownMenuItem>
        }
        
          <DropdownMenuItem
            onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/similarproducts`)}
          >
            <BookIcon className="mr-2 h-4 w-4" /> Set Similar Products
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products/${data.id}/categories`)}
          >
            <BookIcon className="mr-2 h-4 w-4" /> Set Categories
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
