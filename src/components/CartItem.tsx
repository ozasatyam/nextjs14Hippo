import { PRODUCT_CATEGORIES } from "@/config";
import { Product } from "@/payload-types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartItem({ product }: { product: Product }) {
  const { image } = product.images[0];
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>
            <span className="line-clamp-1 text-sm capitalize text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;