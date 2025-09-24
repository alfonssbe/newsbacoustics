"use client"

import dynamic from "next/dynamic";
import PageLoader from "../../../components/pageLoader";

const DynamicMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function DistributorPageClient() {
  return (
    <>
      <PageLoader duration={1000}/>
      <DynamicMap/>
    </>
  )
}
