// "use client"

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Button } from "@/app/admin/components/ui/button";
// import { Separator } from "@/app/admin/components/ui/separator";
// import { Heading } from "@/app/admin/components/ui/heading";
// import { Input } from "@/app/admin/components/ui/input";
// import { multipleDatasheetProduct } from "@prisma/client";
// import SingleImageUpload from "@/app/admin/components/ui/single-image-upload";
// import SingleFileUpload from "@/app/admin/components/ui/single-file-upload";

// interface MultipleDatasheetFormProps {
//   initialData: multipleDatasheetProduct[] | null;
//   name: string;
// }

// export const MultipleDatasheetForm: React.FC<MultipleDatasheetFormProps> = ({
//   initialData,
//   name,
// }) => {
//   const params = useParams();
//   const router = useRouter();
//   const [allDatasheet, setAllDatasheet] = useState<multipleDatasheetProduct[]>([]);
//   const [datasheetUrl, setDatasheetUrl] = useState<string | null>("")
//   const [loading, setLoading] = useState(false);

//   const title = initialData ? "Edit Multiple Datasheet" : "Add Multiple Datasheet";
//   const description = `For ${name}`;
//   const toastMessage = initialData ? "Multiple Datasheet updated." : "Multiple Datasheet Added.";
//   const action = initialData ? "Save changes" : "Create";

//   const handleUploadChange = (url: string) => {
//     setDatasheetUrl(url);
//   };

//   const handleUploadRemove = () => {
//     setDatasheetUrl(null);
//   };

//   useEffect(() => {
//     if (initialData && initialData.length !== 0) {
//       setAllDatasheet(initialData);
//     }
//   }, [initialData]);

//   const addDatasheetCounter = () => {
//     setAllDatasheet((prev) => [
//       ...prev,
//       {
//         id: Math.random().toString(), // Using a random id for uniqueness
//         productId: params.customProductId[0],
//         url: "",
//         name: "",
//       },
//     ]);
//   };

//   const reduceDatasheetCounter = (index: number) => {
//     setAllDatasheet((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.customProductId}/multipledatasheet`,
//         allDatasheet
//       );
//       if (response.data === "expired_session") {
//         router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
//         router.refresh();
//         toast.error("Session expired, please login again");
//       } else if (response.data === "invalid_token") {
//         router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
//         router.refresh();
//         toast.error("API Token Invalid, please login again");
//       } else if (response.data === "not_admin") {
//         router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
//         router.refresh();
//         toast.error("Unauthorized!");
//       }
//       router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customproduct`);
//       router.refresh();
//       toast.success(toastMessage);
//     } catch (error: any) {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Heading title={title} description={description} />
//       </div>
//       <Separator />
//       <form onSubmit={handleSubmit} className="space-y-8 w-full">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           <div onClick={addDatasheetCounter} className="bg-primary text-white p-2 rounded-md w-fit h-fit hover:cursor-pointer">
//             Add Datasheet
//           </div>
//           {allDatasheet.map((value, index) => (
//             <div key={value.id} className="items-top flex space-x-2 mb-4">
//               <SingleFileUpload 
//                 value={value.url} 
//                 disabled={loading} 
//                 onChange={handleUploadChange}
//                 onRemove={handleUploadRemove}
//               />
//               <Input type="text" defaultValue={value.name} placeholder="PDF File name" />
//               <div
//                 className="bg-red-400 text-white p-2 w-fit h-fit rounded-md hover:cursor-pointer hover:bg-red-500"
//                 onClick={() => reduceDatasheetCounter(index)}
//               >
//                 Delete
//               </div>
//             </div>
//           ))}
//         </div>
//         <Button disabled={loading} className="ml-auto" type="submit">
//           {action}
//         </Button>
//       </form>
//     </>
//   );
// };


"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/app/admin/components/ui/button";
import { Separator } from "@/app/admin/components/ui/separator";
import { Heading } from "@/app/admin/components/ui/heading";
import { Input } from "@/app/admin/components/ui/input";
import { multipleDatasheetProduct } from "@prisma/client";
// import { uploadFile } from "@/app/admin/upload-action";
import Link from "next/link";

interface MultipleDatasheetFormProps {
  initialData: multipleDatasheetProduct[] | null;
  name: string;
}

export const MultipleDatasheetForm: React.FC<MultipleDatasheetFormProps> = ({
  initialData,
  name,
}) => {
  const params = useParams();
  const router = useRouter();
  const [allDatasheet, setAllDatasheet] = useState<multipleDatasheetProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const title = initialData ? "Edit Multiple Datasheet" : "Add Multiple Datasheet";
  const description = `For ${name}`;
  const toastMessage = initialData ? "Multiple Datasheet updated." : "Multiple Datasheet Added.";
  const action = initialData ? "Save changes" : "Create";

  useEffect(() => {
    if (initialData && initialData.length !== 0) {
      setAllDatasheet(initialData);
    }
  }, [initialData]);

  const addDatasheetCounter = () => {
    //@ts-ignore
    setAllDatasheet((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.customProductId,
        url: "",
        name: "",
      },
    ]);
  };

  const reduceDatasheetCounter = (index: number) => {
    setAllDatasheet((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {     
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.customProductId}/multipledatasheet`, allDatasheet);
        
      if (response.data === "expired_session") {
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      } else if (response.data === "invalid_token") {
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      } else if (response.data === "not_admin") {
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }

      router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customproduct`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: string) => {
    const formData = new FormData();
    const file = e.target.files?.[0];
    if (file) {
      formData.append('file', file);
      try {
        // const url = await uploadFile(formData);
        const updatedDatasheet = [...allDatasheet];
        // updatedDatasheet[Number(index)].url = url; // Store the filename
        setAllDatasheet(updatedDatasheet);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file");
      }
    }
  };

  return (
    <>
     <div className="flex items-center justify-between">
  <Heading title={title} description={description} />
</div>
<Separator />
<form onSubmit={handleSubmit} className="space-y-8 max-w-7xl">
  <div className="text-center mb-6">
    <div
      onClick={addDatasheetCounter}
      className="bg-primary w-fit text-white py-2 px-4 rounded-md hover:bg-primary-dark cursor-pointer"
    >
      Add Datasheet
    </div>
  </div>
  <div className="space-y-6">
    {allDatasheet.map((value, index) => (
      <div
        key={value.id}
        className="flex items-center justify-between rounded-md shadow-xs"
      >
        <div className="flex items-center space-x-4">
          {value.url !== '' && (
            <Link
              target="_blank"
              href={value.url}
              className="text-blue-600 hover:underline"
            >
              View File
            </Link>
          )}
          <Input
            id={`file-${index}`}
            type="file"
            accept=".pdf"
            name="file"
            onChange={(e) =>
              e.target.files && handleFileUpload(e, index.toString())
            }
            disabled={loading}
            className="border border-gray-300 p-2 rounded-md"
          />
          <Input
            type="text"
            defaultValue={value.name}
            placeholder="PDF File name"
            onChange={(e) => {
              const updatedDatasheet = [...allDatasheet];
              updatedDatasheet[index].name = e.target.value;
              setAllDatasheet(updatedDatasheet);
            }}
            required
            className="border border-gray-300 p-2 rounded-md w-48"
          />
        </div>
        <div
          className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
          onClick={() => reduceDatasheetCounter(index)}
        >
          Delete
        </div>
      </div>
    ))}
  </div>
  <Button
    disabled={loading}
    className="ml-auto bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
    type="submit"
  >
    {action}
  </Button>
</form>

    </>
  );
};
