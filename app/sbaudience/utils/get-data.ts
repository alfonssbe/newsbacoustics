
import { cache } from "react"
import getAllFeaturedProducts from "@/app/actions/get-all-featured-products";
import getAllNavbarContent from "@/app/actions/get-all-navbar-content";


export const getFeaturedProducts = cache(async (path: string) => {
    return await getAllFeaturedProducts(path)
})

export const getAllNavbarContentUtils = cache(async (path: string) => {
    return await getAllNavbarContent(path)
})
