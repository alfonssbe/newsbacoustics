
import { cache } from "react"
import getProduct from "../actions/get-one-product";
import getAllFeaturedProducts from "../actions/get-all-featured-products";
import getKitsFinishingProduct from "../actions/get-one-kits-finishing-props";
import getCustomProduct from "../actions/get-one-custom-props";
import getAllNavbarContent from "../actions/get-all-navbar-content";
import getSingleMetadata from "../actions/get-metadata-single-product";
import getMultipleDatasheetProduct from "../actions/get-one-multiple-datasheet";


export const getSingleProduct = cache(async(slug :string) =>{
    return await getProduct(slug)
}) 
  
export const getFeaturedProducts = cache(async (path: string) => {
    return await getAllFeaturedProducts(path)
})

export const getCustomProps = cache(async(slug :string) =>{
    return await getCustomProduct(slug)
}) 

export const getMultipleDatasheet = cache(async(slug :string) =>{
    return await getMultipleDatasheetProduct(slug)
}) 

export const getKitsFinishing = cache(async(slug :string) =>{
    return await getKitsFinishingProduct(slug)
}) 

export const getAllNavbarContentUtils = cache(async (path: string) => {
    return await getAllNavbarContent(path)
})

export const getMetadataSingleProduct = cache(async(productSlug :string) =>{
    return await getSingleMetadata(productSlug)
}) 

