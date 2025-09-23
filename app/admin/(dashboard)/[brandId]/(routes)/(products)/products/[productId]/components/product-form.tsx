"use client"

import * as z from "zod"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Cover_Image, Drawing_Image, Graph_Image, Image_Catalogues, kitsFinishing, multiple3DModels, multipleDatasheetProduct, multipleFRDZMAFiles, Product, Size } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/admin/components/ui/select"
import { Checkbox } from "@/app/admin/components/ui/checkbox"
import { Textarea } from "@/app/admin/components/ui/textarea"
import Link from "next/link"
import { uploadProductDatasheet } from "@/app/admin/upload-product-datasheet"
import Image from "next/image"
import { uploadCoverImage } from "@/app/admin/upload-cover-image"
import { uploadDrawingImage } from "@/app/admin/upload-drawing-image"
import { uploadFrequencyResponseImage } from "@/app/admin/upload-frequency-response-image"
import { uploadImageCatalogues } from "@/app/admin/upload-image-catalogues"
import { CirclePlus, File, Trash } from "lucide-react"
import { uploadProduct3DModel } from "@/app/admin/upload-product-3d-model"
import { uploadProductFRDZMA } from "@/app/admin/upload-product-fda-zma"


const formSchema = z.object({
  name: z.string().min(1),
  images_catalogues: z.object({ url: z.string() }).array(),
  cover_img: z.object({ url: z.string() }).array(),
  drawing_img: z.object({ url: z.string() }).array(),
  graph_img: z.object({ url: z.string() }).array(),
  multipleDatasheetProduct: z.object({ url: z.string() }).array(),
  multipleFRDZMAFiles: z.object({ url: z.string() }).array(),
  multiple3DModels: z.object({ url: z.string() }).array(),
  description: z.string().min(1),
  // specificationId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isCustom: z.boolean().default(false).optional(),
  isKits: z.boolean().default(false).optional(),
  isCoax: z.boolean().default(false).optional(),
  isNewProduct: z.boolean().default(false).optional(),
  oemQuantity: z.string().optional(),
  navbarNotes: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product & {
    images_catalogues: Image_Catalogues[]
    cover_img: Cover_Image[]
    drawing_img: Drawing_Image[]
    graph_img: Graph_Image[]
    multipleDatasheetProduct: multipleDatasheetProduct[]
    multipleFRDZMAFiles: multipleFRDZMAFiles[]
    multiple3DModels: multiple3DModels[]
  } | null;
  // datasheet_local: kitsFinishing[]
  sizes: Size[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  // datasheet_local,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [allDatasheet, setAllDatasheet] = useState<multipleDatasheetProduct[]>([]);
  const [selectedDatasheetFile, setSelectedDatasheetFile] = useState<File[]>([]);

  const [allFRDZMA, setAllFRDZMA] = useState<multipleFRDZMAFiles[]>([]);
  const [selectedFRDZMAFile, setSelectedFRDZMAFile] = useState<File[]>([]);
  
  const [all3DModel, setAll3DModel] = useState<multiple3DModels[]>([]);
  const [selected3DModel, setSelected3DModel] = useState<File[]>([]);

  const [coverImgUrl, setCoverImgUrl] = useState<Cover_Image>();
  const [coverImg, setCoverImg] = useState<File>();

  const [drawingImgUrl, setDrawingImgUrl] = useState<Drawing_Image>();
  const [drawingImg, setDrawingImg] = useState<File>();
  
  const [freqResponseUrl, setFreqResponseUrl] = useState<Graph_Image>();
  const [freqResponseImg, setfreqResponseImg] = useState<File>();
  
  const [imgCataloguesUrl, setImgCataloguesUrl] = useState<Image_Catalogues[]>([]);
  const [imgCatalogues, setImgCatalogues] = useState<File[]>([]);


  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? `For ${initialData.name}` : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    images_catalogues: [],
    cover_img: [],
    drawing_img: [],
    graph_img: [],
    multipleDatasheetProduct: [],
    multipleFRDZMAFiles: [],
    multiple3DModels: [],
    description: '',
    sizeId: '',
    isFeatured: false,
    isArchived: false,
    isCustom: false,
    isKits: false,
    isCoax: false,
    isNewProduct: false,
    oemQuantity: '',
    navbarNotes: '',
  }


  useEffect(() => {
    const fetchData = async () => {
      if (initialData && initialData.multipleDatasheetProduct) {
        setAllDatasheet(initialData.multipleDatasheetProduct);
      }
      if (initialData && initialData.multipleFRDZMAFiles) {
        setAllFRDZMA(initialData.multipleFRDZMAFiles);
      }
      if (initialData && initialData.multiple3DModels) {
        setAll3DModel(initialData.multiple3DModels);
      }

      if (initialData && initialData.cover_img) {
        setCoverImgUrl(initialData.cover_img[0]);
      }
      else{
        let temp: Cover_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setCoverImgUrl(temp)
      }

      if (initialData && initialData.drawing_img) {
        setDrawingImgUrl(initialData.drawing_img[0]);
      }
      else{
        let temp: Drawing_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setDrawingImgUrl(temp)
      }

      if (initialData && initialData.graph_img) {
        setFreqResponseUrl(initialData.graph_img[0]);
      }
      else{
        let temp: Graph_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setFreqResponseUrl(temp)
      }
      
      if (initialData && initialData.images_catalogues) {
        setImgCataloguesUrl(initialData.images_catalogues);
      }
    };
  
    fetchData().catch((error) => {
      console.error("Error fetching data: ", error);
    });
  
  }, [params.productId, initialData, initialData?.multipleDatasheetProduct, initialData?.multipleFRDZMAFiles, initialData?.multiple3DModels, initialData?.cover_img, initialData?.drawing_img, initialData?.graph_img, initialData?.images_catalogues]); 


  //MULTIPLE DATASHEET
  const addDatasheetCounter = () => {
    //@ts-ignore
    setAllDatasheet((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.productId,
        url: "",
        name: "",
      },
    ]);
  };

  const reduceDatasheetCounter = (index: number) => {
    setAllDatasheet((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDatasheetFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempfile = e.target.files?.[0];
    let temp = selectedDatasheetFile
    temp[index] = tempfile!
    setSelectedDatasheetFile(temp);
  };

  async function handleDatasheetFileUpload(file: File[]): Promise<multipleDatasheetProduct[]> {
    if (file && file.length > 0) {
      let updatedDatasheet = [...allDatasheet];
      // const filteredfile = file.filter(Boolean);
      try {
        const uploadPromises = file.map(async (value, index) => {
          if (value) {
            const formData = new FormData();
            formData.append('file', value);
            const url = await uploadProductDatasheet(formData);
            updatedDatasheet[updatedDatasheet.length - (file.length - index)].url = url;
          }
        });

        await Promise.all(uploadPromises);
        return updatedDatasheet;
      } catch (error) {
        console.error("Error uploading files:", error);
        return [];
      }
    }  
    return [];
  }


  //MULTIPLE FRD ZMA
  const addFRDZMACounter = () => {
    //@ts-ignore
    setAllFRDZMA((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.productId,
        url: "",
        name: "",
      },
    ]);
  };

  const reduceFRDZMACounter = (index: number) => {
    setAllFRDZMA((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFRDZMAFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempfile = e.target.files?.[0];
    let temp = selectedFRDZMAFile
    temp[index] = tempfile!
    setSelectedFRDZMAFile(temp);
  };

  async function handleFRDZMAFileUpload(file: File[]): Promise<multipleFRDZMAFiles[]> {
    if (file && file.length > 0) {
      let updatedFRDZMA = [...allFRDZMA];
      // const filteredfile = file.filter(Boolean);
      try {
        const uploadPromises = file.map(async (value, index) => {
          if (value) {
            const formData = new FormData();
            formData.append('file', value);
            const url = await uploadProductFRDZMA(formData);
            updatedFRDZMA[updatedFRDZMA.length - (file.length - index)].url = url;
          }
        });

        await Promise.all(uploadPromises);
        return updatedFRDZMA;
      } catch (error) {
        console.error("Error uploading files:", error);
        return [];
      }
    }  
    return [];
  }
  

  //MULTIPLE 3D MOdel
  const add3DModelCounter = () => {
    //@ts-ignore
    setAll3DModel((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.productId,
        url: "",
        name: "",
      },
    ]);
  };

  const reduce3DModelCounter = (index: number) => {
    setAll3DModel((prev) => prev.filter((_, i) => i !== index));
  };

  const handle3DModelFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempfile = e.target.files?.[0];
    let temp = selected3DModel
    temp[index] = tempfile!
    setSelected3DModel(temp);
  };

  async function handle3DModelFileUpload(file: File[]): Promise<multiple3DModels[]> {
    if (file && file.length > 0) {
      let updated3DModel = [...all3DModel];
      // const filteredfile = file.filter(Boolean);
      try {
        const uploadPromises = file.map(async (value, index) => {
          if (value) {
            const formData = new FormData();
            formData.append('file', value);
            const url = await uploadProduct3DModel(formData);
            updated3DModel[updated3DModel.length - (file.length - index)].url = url;
          }
        });

        await Promise.all(uploadPromises);
        return updated3DModel;
      } catch (error) {
        console.error("Error uploading files:", error);
        return [];
      }
    }  
    return [];
  }

  
  //COVER IMAGE
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCoverImg(file);
  };

  const deleteCoverImage = async () => {
    let temp: Cover_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setCoverImgUrl(temp)
  }

  async function handleCoverImageUpload(file: File): Promise<Cover_Image> {
    if (file) {
      let updatedCoverImage = coverImgUrl ?? {
        id: Math.random().toString(),
        productId: params.productId?.toString() ?? '',
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadCoverImage(formData);
        updatedCoverImage.url = url;
        return updatedCoverImage;
      } catch (error) {
        console.error("Error uploading cover image:", error);
        let temp: Cover_Image = {
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
    let temp: Cover_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }


   //DRAWING IMAGE
   const handleDrawingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setDrawingImg(file);
  };

  const deleteDrawingImage = async () => {
    let temp: Drawing_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setDrawingImgUrl(temp)
  }

  async function handleDrawingImageUpload(file: File): Promise<Drawing_Image> {
    if (file) {
      let updatedDrawingImage = drawingImgUrl ?? {
        id: Math.random().toString(),
        productId: params.productId?.toString() ?? '',
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadDrawingImage(formData);
        updatedDrawingImage.url = url;
        return updatedDrawingImage;
      } catch (error) {
        console.error("Error uploading drawing image:", error);
        let temp: Drawing_Image = {
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
    let temp: Drawing_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }


  //FREQUENCY RESPONSE IMAGE
  const handleFrequencyResponseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setfreqResponseImg(file);
  };

  const deleteFrequencyResponseImage = async () => {
    let temp: Graph_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setFreqResponseUrl(temp)
  }

  async function handleFrequencyResponseImageUpload(file: File): Promise<Graph_Image> {
    if (file) {
      let updatedFrequencyResponseImage = freqResponseUrl ?? {
        id: Math.random().toString(),
        productId: params.productId?.toString() ?? '',
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadFrequencyResponseImage(formData);
        updatedFrequencyResponseImage.url = url;
        return updatedFrequencyResponseImage;
      } catch (error) {
        console.error("Error uploading frequency response image:", error);
        let temp: Graph_Image = {
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
    let temp: Graph_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }


  //MULTIPLE IMAGE CATALOGUES
  const addImageCataloguesCounter = () => {
    //@ts-ignore
    setImgCataloguesUrl((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.productId,
        url: "",
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };

  const reduceImageCataloguesCounter = (index: number) => {
    setImgCataloguesUrl((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageCataloguesFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempfile = e.target.files?.[0];
    let temp = imgCatalogues
    temp[index] = tempfile!
    setImgCatalogues(temp);
  };

  async function handleImageCataloguesFileUpload(file: File[]): Promise<Image_Catalogues[]> {
    if (file && file.length > 0) {
      let updatedImageCatalogues = [...imgCataloguesUrl];
      // const filteredfile = file.filter(Boolean);
      // console.log("filteredfile: ", filteredfile)
      try {
        const uploadPromises = file.map(async (value, index) => {
          if (value) {
            const formData = new FormData();
            formData.append('image', value);
            const url = await uploadImageCatalogues(formData);
            updatedImageCatalogues[updatedImageCatalogues.length - (file.length - index)].url = url;
          }
        });

        await Promise.all(uploadPromises);
        return updatedImageCatalogues;
      } catch (error) {
        console.error("Error uploading image catalogues:", error);
        return [];
      }
    }  
    return [];
  }


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
        
      if (selectedDatasheetFile && selectedDatasheetFile.length > 0) {
        data.multipleDatasheetProduct = await handleDatasheetFileUpload(selectedDatasheetFile)
      }
      else{
        data.multipleDatasheetProduct = allDatasheet
      }
     
      if (selectedFRDZMAFile && selectedFRDZMAFile.length > 0) {
        data.multipleFRDZMAFiles = await handleFRDZMAFileUpload(selectedFRDZMAFile)
      }
      else{
        data.multipleFRDZMAFiles = allFRDZMA
      }
     
      if (selected3DModel && selected3DModel.length > 0) {
        data.multiple3DModels = await handle3DModelFileUpload(selected3DModel)
      }
      else{
        data.multiple3DModels = all3DModel
      }

      if (coverImg) {
        data.cover_img[0] = await handleCoverImageUpload(coverImg)
      }
      else{
        data.cover_img[0] = coverImgUrl!
      }

      if (drawingImg) {
        data.drawing_img[0] = await handleDrawingImageUpload(drawingImg)
      }
      else{
        data.drawing_img[0] = drawingImgUrl!
      }

      if (freqResponseImg) {
        data.graph_img[0] = await handleFrequencyResponseImageUpload(freqResponseImg)
      }
      else{
        data.graph_img[0] = freqResponseUrl!
      }

      if (imgCatalogues && imgCatalogues.length > 0) {
        data.images_catalogues = await handleImageCataloguesFileUpload(imgCatalogues)
      }
      else{
        data.images_catalogues = imgCataloguesUrl
      }

      data.isKits || data.isCoax ? data.isCustom = true : data.isCustom = false;



      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/products/${params.productId}`, data);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/products`, data);
      }
      if(response.data === 'duplicate'){
        toast.error("Duplicate Product")
      }
      else if(response.data === 'expired_session'){
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
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`);
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
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("validation errors:", errors);
        })} className="space-y-4 w-full">
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-left font-bold text-base">Cover Image</div>
            </div>
            <div className="space-y-2 rounded-lg border shadow-md p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  {coverImgUrl && (coverImgUrl!.url !== undefined && coverImgUrl.url !== '') ?
                  <>
                  <div className="flex items-center space-x-4">
                    {coverImgUrl && (coverImgUrl!.url !== undefined && coverImgUrl.url !== '') &&
                      <Image
                      src={coverImgUrl!.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${coverImgUrl!.url}` : coverImgUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      priority
                      />
                    }
                  </div>
                  <Button
                  variant={"destructive"}
                  onClick={() => deleteCoverImage()}
                >
                  <Trash width={20} height={20} />
                </Button>
                </>
                :
                    <Input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={(e) =>
                        e.target.files && handleCoverImageChange(e)
                      }
                      disabled={loading}
                      className="border border-gray-300 p-2 rounded-md"
                      required
                    />
                    }
                </div>
            </div>
          </div>


          <div className="gap-4 border rounded-lg p-4 shadow-lg">
            <div className="pb-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-2">
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">Size</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">Description | <Link href={'/images/admin/description_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm  ">See where this will be shown</Link></FormLabel>
                    <FormDescription>For lists only. Give a new space (enter) for each list. If empty, type <strong>-</strong></FormDescription>
                    <FormControl>
                      <Textarea disabled={loading} placeholder="Product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

        </div>



        



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center pb-2">
              <div className="text-left font-bold text-base">Drawing Image</div>
            </div>
            <div className="space-y-2 border shadow-md  rounded-lg p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {drawingImgUrl && (drawingImgUrl!.url !== undefined && drawingImgUrl.url !== '') && (
                      <Image
                      src={drawingImgUrl!.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${drawingImgUrl!.url}` : drawingImgUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    )}
                    {(!drawingImgUrl || (drawingImgUrl.url === '')) && (
                      <Input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleDrawingImageChange(e)
                        }
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    )}
                  </div>
                  {drawingImgUrl && (drawingImgUrl!.url !== undefined && drawingImgUrl.url !== '') && (
                    <Button
                      variant={"destructive"}
                      onClick={() => deleteDrawingImage()}
                    >
                      <Trash width={20} height={20} />
                    </Button>
                  )}
                </div>
            </div>
          </div>

          
          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center pb-2">
              <div className="text-left font-bold text-base">Frequency Response Image</div>
            </div>
            <div className="space-y-2 rounded-lg border shadow-md p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {freqResponseUrl && (freqResponseUrl!.url !== undefined && freqResponseUrl.url !== '') && (
                      <Image
                      src={freqResponseUrl!.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${freqResponseUrl!.url}` : freqResponseUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    )}
                    {(!freqResponseUrl || (freqResponseUrl.url === '')) && (
                      <Input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleFrequencyResponseImageChange(e)
                        }
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    )}
                  </div>
                  {freqResponseUrl && (freqResponseUrl!.url !== undefined && freqResponseUrl.url !== '') && (
                    <Button
                      variant={"destructive"}
                      onClick={() => deleteFrequencyResponseImage()}
                    >
                      <Trash width={20} height={20} />
                    </Button>
                  )}
                </div>
            </div>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center pb-2 flex justify-between items-center">
              <div className="text-left font-bold text-base">Image Catalogues</div>
              <div
                onClick={addImageCataloguesCounter}
                className="flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors p-2 rounded-lg hover:cursor-pointer"
              >
                <CirclePlus width={20} height={20} />Add Image Catalogues
              </div>
            </div>
              {imgCataloguesUrl && imgCataloguesUrl.length > 0 && imgCataloguesUrl.map((value, index) => (
                
            <div className="space-y-2 rounded-lg border shadow-md p-2" key={index}>
                <div
                  key={value.id}
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {value.url !== '' && (
                      <Image
                      src={value.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.url}` : value.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                        className="w-32 h-fit"
                      />
                    )}
                    {value.url === '' && (
                      <Input
                        id={`image-catalogues-${index}`}
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleImageCataloguesFileChange(e, index)
                        }
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    )}
                    <Input
                      type="text"
                      defaultValue={value.name}
                      placeholder="Input this image name"
                      onChange={(e) => {
                        const updatedImageCatalogues = [...imgCataloguesUrl];
                        updatedImageCatalogues[index].name = e.target.value;
                        setImgCataloguesUrl(updatedImageCatalogues);
                      }}
                      required
                      className="border border-gray-300 p-2 rounded-md w-48"
                    />
                  </div>
                  <Button
                    variant={"destructive"}
                    onClick={() => reduceImageCataloguesCounter(index)}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                </div>      
              </div>
              ))
            }
          </div>


          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center pb-2 flex justify-between items-center">
              <div className="text-left font-bold text-base">Datasheet</div>
              <div
                onClick={addDatasheetCounter}
                className="flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors p-2 rounded-lg hover:cursor-pointer"
              >
                <CirclePlus width={20} height={20} />Add Datasheet
              </div>
            </div>
            <div className="space-y-2 rounded-lg border shadow-md p-2">
              {allDatasheet.map((value, index) => (
                <div
                  key={value.id}
                  className="flex items-center justify-between rounded-md shadow-xs py-2"
                >
                  <div className="flex items-center space-x-4">
                    {value.url !== '' && (
                      <Link
                        target="_blank"
                        href={value.url}
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline transition-colors whitespace-nowrap flex items-center gap-2"
                      >
                       <File width={20} height={20}/>  View File
                      </Link>
                    )}
                    {value.url === '' && (
                      <Input
                        id={`file-${index}`}
                        type="file"
                        accept=".pdf"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleDatasheetFileChange(e, index)
                        }
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    )}
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
                  <Button
                    variant={"destructive"}
                    onClick={() => reduceDatasheetCounter(index)}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center pb-2 flex justify-between items-center">
              <div className="text-left font-bold text-base">FRD & ZMA</div>
              <div
                onClick={addFRDZMACounter}
                className="flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors p-2 rounded-lg hover:cursor-pointer"
              >
                <CirclePlus width={20} height={20} />Add FRD & ZMA
              </div>
            </div>
            <div className="space-y-2 rounded-lg border shadow-md p-2">
              {allFRDZMA.map((value, index) => (
                <div
                  key={value.id}
                  className="flex items-center justify-between rounded-md shadow-xs py-2"
                >
                  <div className="flex items-center space-x-4">
                    {value.url !== '' && (
                      <Link
                        target="_blank"
                        href={value.url}
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline transition-colors whitespace-nowrap flex items-center gap-2"
                      >
                       <File width={20} height={20}/>  View File
                      </Link>
                    )}
                    {value.url === '' && (
                      <Input
                        id={`file-${index}`}
                        type="file"
                        accept=".pdf, .zip, .zma, .frd"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleFRDZMAFileChange(e, index)
                        }
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    )}
                    <Input
                      type="text"
                      defaultValue={value.name}
                      placeholder="PDF File name"
                      onChange={(e) => {
                        const updatedFRDZMA = [...allFRDZMA];
                        updatedFRDZMA[index].name = e.target.value;
                        setAllFRDZMA(updatedFRDZMA);
                      }}
                      required
                      className="border border-gray-300 p-2 rounded-md w-48"
                    />
                  </div>
                  <Button
                    variant={"destructive"}
                    onClick={() => reduceFRDZMACounter(index)}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                </div>
              ))}
            </div>
          </div>


          <div className="border rounded-lg p-4 shadow-lg">
            <div className="text-center pb-2 flex justify-between items-center">
              <div className="text-left font-bold text-base">3D Models</div>
              <div
                onClick={add3DModelCounter}
                className="flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors p-2 rounded-lg hover:cursor-pointer"
              >
                <CirclePlus width={20} height={20} />Add 3D Model
              </div>
            </div>
            <div className="space-y-2 rounded-lg border shadow-md p-2">
              {all3DModel.map((value, index) => (
                <div
                  key={value.id}
                  className="flex items-center justify-between rounded-md shadow-xs py-2"
                >
                  <div className="flex items-center space-x-4">
                    {value.url !== '' && (
                      <Link
                        target="_blank"
                        href={value.url}
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline transition-colors whitespace-nowrap flex items-center gap-2"
                      >
                       <File width={20} height={20}/>  View File
                      </Link>
                    )}
                    {value.url === '' && (
                      <Input
                        id={`file-${index}`}
                        type="file"
                        accept=".zip, .STEP"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handle3DModelFileChange(e, index)
                        }
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                    )}
                    <Input
                      type="text"
                      defaultValue={value.name}
                      placeholder="PDF File name"
                      onChange={(e) => {
                        const updated3DModel = [...all3DModel];
                        updated3DModel[index].name = e.target.value;
                        setAll3DModel(updated3DModel);
                      }}
                      required
                      className="border border-gray-300 p-2 rounded-md w-48"
                    />
                  </div>
                  <Button
                    variant={"destructive"}
                    onClick={() => reduce3DModelCounter(index)}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 border rounded-lg p-4 shadow-lg">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className={`flex flex-row items-center space-x-3 space-y-0 border rounded-lg p-4 shadow-lg duration-300 ease-in-out ${field.value ? 'shadow-primary/70' : ''}`}>
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
                      This product will appear on the homepage slideshow. To be displayed, add the backgorund image through the <b>Featured Products</b> menu. <Link href={'/images/admin/featured_product_placement.png'} target="blank" className="text-primary hover:underline">See here for the placement</Link>
                    </FormDescription>
                    {/* <div className="text-xs font-semibold">Note: To be displayed, you need to add the backgorund image through the &quot;Featured Products&quot; menu.</div> */}
                  </div>
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="isNewProduct"
                render={({ field }) => (
                  <FormItem className={`flex flex-row items-center space-x-3 space-y-0 border rounded-lg p-4 shadow-lg duration-300 ease-in-out ${field.value ? 'shadow-primary/70' : ''}`}>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-bold text-base">
                        New Product
                      </FormLabel>
                      <FormDescription>
                      This product will appear in <b>New Products</b> page. <Link href={'/images/admin/new-product-placement.png'} target="blank" className="text-primary hover:underline">See where this will be shown</Link>
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            {/* <FormField
              control={form.control}
              name="isCustom"
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
                      Custom Product
                    </FormLabel>
                    <FormDescription>
                      For products that require custom fields (eg: Finishing color for kits product, Custom specifications, custom description, etc).
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className={`flex flex-row items-center space-x-3 space-y-0 border rounded-lg p-4 shadow-lg duration-300 ease-in-out ${field.value ? 'shadow-primary/70' : ''}`}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold text-base">
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the website.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="isKits"
              render={({ field }) => (
                <FormItem className={`flex flex-row items-center space-x-3 space-y-0 border rounded-lg p-4 shadow-lg duration-300 ease-in-out ${field.value ? 'shadow-primary/70' : ''}`}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold text-base">
                      Kits Product
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isCoax"
              render={({ field }) => (
                <FormItem className={`flex flex-row items-center space-x-3 space-y-0 border rounded-lg p-4 shadow-lg duration-300 ease-in-out ${field.value ? 'shadow-primary/70' : ''}`}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold text-base">
                      Coaxials Product
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            </div>   
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 border rounded-lg p-4 shadow-lg">
            <FormField
              control={form.control}
              name="oemQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">OEM Quantity | <Link href={'/images/admin/oem_quantity_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm">See where this will be shown</Link></FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Insert the OEM Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="navbarNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Notes for Dropdown | <Link href={'/images/admin/dropdown_notes_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm">See where this will be shown</Link></FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Insert the notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          <Button disabled={loading} type="submit" className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
