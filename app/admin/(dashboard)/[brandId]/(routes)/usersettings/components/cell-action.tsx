"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/app/admin/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/app/admin/components/ui/dropdown-menu";
import { AlertModal } from "@/app/admin/components/modals/alert-modal";
import { UserColumn } from "./columns";
import { revalidatePath } from "next/cache";

interface CellActionProps {
  data: UserColumn;
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
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/user/register/${data.id}`);
      
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Session expired, please login again")
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again")
      }
      else if(response.data === 'not_admin'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Unauthorized!")
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/usersettings`);
        router.refresh();
        toast.success("User Deleted")
      }
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Something went wrong');
    } finally {
      setTimeout(() => {
        window.location.reload();
        setOpen(false); 
        setLoading(false);
      }, 2000); 
    }
  };

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
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/usersettings/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" /> Update
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
