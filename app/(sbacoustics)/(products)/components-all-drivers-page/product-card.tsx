"use client";

import React from "react";
import Link from "next/link";
import { Products } from "@/app/types";
import { LazyImageClickable } from "@/components/lazyImageclickable";

interface ReviewCard {
  data: Products;
  hovered: boolean;
}

const ProductCard: React.FC<ReviewCard> = React.memo(
  ({ data, hovered }) => {
    return (
      <Link
        href={{
          pathname: `/products/${data?.slug}`,
        }}
        className="bg-white group cursor-pointer"
      >  

        <div className="flex flex-col items-center justify-center text-center relative p-4" style={{ aspectRatio: "1/1" }}>
      
          <LazyImageClickable
            src={data.coverUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${data.coverUrl}` : data.coverUrl}
            alt={data.name}
            width={500}
            height={500}
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
