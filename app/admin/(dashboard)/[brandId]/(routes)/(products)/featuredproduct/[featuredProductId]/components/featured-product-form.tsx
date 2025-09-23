"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Featured_Image, Product } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/app/admin/components/ui/input"
import { Button } from "@/app/admin/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form"
import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Checkbox } from "@/app/admin/components/ui/checkbox"
import { uploadFeaturedImage } from "@/app/admin/upload-featured-image"
import Link from "next/link"
import Image from "next/image"
import { Trash } from "lucide-react"


const formSchema = z.object({
  name: z.string().min(1),
  featuredDesc: z.string().min(1),
  featured_img: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
});

type FeaturedProductFormValues = z.infer<typeof formSchema>

interface FeaturedProductFormProps {
  initialData: Product & {
    featured_img: Featured_Image[]
  } | null;
};

export const FeaturedProductForm: React.FC<FeaturedProductFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [featuredImage, setFeaturedImage] = useState<Featured_Image>()
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const title = initialData ? 'Edit Featured Image' : 'Add Featured Image';
  const description = `For ${initialData!.name}`;
  const toastMessage = initialData ? 'Featured Image updated.' : 'Featured Image added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    featuredDesc: '',
    featured_img: [],
    isFeatured: false,
  }

  useEffect(() => {
  const fetchData = async () => {
    if (initialData && initialData.featured_img.length>0) {
      setFeaturedImage(initialData.featured_img[0]);
    }
    else{
      let temp: Featured_Image = {
        id: Math.random().toString(),
        //@ts-ignore
        productId: params.featuredProductId,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setFeaturedImage(temp)
    }
  };
  
  fetchData().catch((error) => {
    console.error("Error fetching featured data: ", error);
  });
  }, [params.featuredProductId, initialData, initialData?.featured_img]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const deleteImage = async () => {
    let temp: Featured_Image = {
      id: '',
      //@ts-ignore
      productId: params.featuredProductId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setFeaturedImage(temp)
  };

  async function handleImageUpload (file: File): Promise<Featured_Image> {
    if (file) {
      let updatedFeaturedImage = featuredImage;
      try {
        const formData = new FormData();
        formData.append('image', file);

        const url = await uploadFeaturedImage(formData);
        updatedFeaturedImage!.url = url
        return updatedFeaturedImage!;
        } catch (error) {
        console.error("Error uploading featured image:", error);
        let temp: Featured_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        return temp;
      }
    }
    let temp: Featured_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  };


  const form = useForm<FeaturedProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: FeaturedProductFormValues) => {
    try {
      setLoading(true);

      if (selectedFile) {
        data.featured_img[0] = await handleImageUpload(selectedFile);
      }
      else{
        data.featured_img[0] = featuredImage!
      }


      const response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/featuredproducts/${params.featuredProductId}`, data);
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
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/featuredproduct`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  

  return (  
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="md:grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 shadow-lg">
              <div className="text-left font-bold pb-2">Cover Image</div>
              <div
                className="flex items-center justify-between rounded-md shadow-xs"
              >
                <div className="flex items-center space-x-4">
                  {featuredImage && featuredImage.url !== '' && (
                    <Image alt={title} src={featuredImage.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${featuredImage.url}` : featuredImage.url} width={200} height={200} className="w-52 h-fit" priority/>
                  )}
                  {(!featuredImage || (featuredImage.url === '')) && (
                    <Input
                      id={`file`}
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={(e) =>
                        e.target.files && handleFileChange(e) // Ensure your file upload function can handle image files
                      }
                      disabled={loading}
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  )}
                </div>
                {featuredImage && featuredImage.url !== '' && (
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteImage()}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                )}
              </div>
            </div>
            <div className="border rounded-lg p-4 shadow-lg">
              <div className="pb-4">
                <FormField
                  control={form.control}
                  name="featuredDesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-base">Featured Description | <Link href={'/images/admin/featured_product_description_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm">See placement</Link></FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Featured Products Descriptions" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-bold text-base">
                        Featured
                      </FormLabel>
                      <FormDescription>
                        This product will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={loading} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
