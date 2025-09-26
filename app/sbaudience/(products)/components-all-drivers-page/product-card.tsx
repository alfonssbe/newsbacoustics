"use client";

import React from "react";
import Link from "next/link";
import { ProductsSBAudience } from "@/app/types";
import { LazyImageClickableSBAudience } from "../../components/lazyImageclickablesbaudience";

interface ReviewCard {
  data: ProductsSBAudience;
  hovered: boolean;
}

const ProductCard: React.FC<ReviewCard> = React.memo(
  ({ data, hovered }) => {
    return (
      <Link
        href={{
          pathname: `/sbaudience/products/${data?.slug}`,
        }}
        className="bg-white group cursor-pointer"
      >  

        <div className="flex flex-col items-center justify-center text-center relative p-4" style={{ aspectRatio: "1/1" }}>
      
          <LazyImageClickableSBAudience
            src={data.coverUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${data.coverUrl}` : data.coverUrl}
            alt={data.name}
            width={500}
            height={500}
            classname={'w-fit h-full object-contain'}
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg lg:text-xl font-bold text-center pb-2 z-10">
            {data.name}
          </h2>
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if data or hovered changes
    return (
      prevProps.data.slug === nextProps.data.slug &&
      prevProps.hovered === nextProps.hovered
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
