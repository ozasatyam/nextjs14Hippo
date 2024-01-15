"use client";
import { TqueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import React from "react";
import ProductListing from "./ProductLising";
interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TqueryValidator;
}
function ProductReel(props: ProductReelProps) {
  const { title, subtitle, href, query } = props;

  const FALLBACK_LIMIT = 4;

  const { data: queryResult, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastpage) => lastpage.nextPage,
      }
    );
  const products = queryResult?.pages.flatMap((page) => page.items);
  let map: (Product | null)[] = [];
  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop The Collection <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10">
            {map.map((product, i) => (
              <ProductListing
                index={i}
                product={product}
                key={`product-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductReel;
