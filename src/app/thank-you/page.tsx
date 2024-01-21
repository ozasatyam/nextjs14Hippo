import { getServerSideUser } from "@/lib/payload-utils";
import Image from "next/image";
import React from "react";
import { cookies } from "next/headers";
import { getPayloadClient } from "@/get-payload";
import { notFound, redirect } from "next/navigation";
import { Product, ProductFile } from "@/payload-types";
import { PRODUCT_CATEGORIES } from "@/config";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function ThankYouPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block  h-80 overflow-hidden lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="Thank you for your order"
        ></Image>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
        <div className="lg:col-start-2">
          <p className="text-sm font-medium text-blue-600">Order Successful </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for Ordering
          </h1>
          {order._isPaid ? (
            <p className="mt-2 text-base text-muted-foreground">
              Your orde was processed and your assets are available to download
              below. We&apos;ve sent your receipt and order details to{" "}
              {typeof order.user !== "string" ? (
                <span className="font-medium text-gray-900 ">
                  {order.user.email}
                </span>
              ) : null}
              .
            </p>
          ) : (
            <p className="mt-2 text-base text-muted-foreground">
              We appreciate your order, and we&apos;re currenly processing it.
              So hand tight and we&apos;ll send you confirmation very soon!
            </p>
          )}
          <div className="mt-16 text-sm font-medium">
            <div className="text-muted-foreground"> Order Number</div>
            <div className="mt-2 text-gray-900">{order.id}</div>
          </div>
          <ul className="mt-6 divide-y divide-gray-200 border-gray-200 border-t text-sm font-medium text-muted-foreground">
            {(order.products as Product[]).map((product) => {
              const label = PRODUCT_CATEGORIES.find(
                (c) => c.value === product.category
              )?.label;

              const donwlaodUrl = (product.product_files as ProductFile)
                .url as string;
              const { image } = product.images[0];
              return (
                <li key={product.id} className="flex space-x-6 py-6">
                  <div className="relative h-24 w-24">
                    {typeof image !== "string" && image.url ? (
                      <Image
                        fill
                        src={image.url}
                        alt={`${product.name} image`}
                        className="flex-none rounded-md bg-gray-100 object-cover object-center"
                      />
                    ) : null}
                  </div>
                  <div className="flex-aut flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-gray-900">{product.name}</h3>
                      <p className="my-1">Category: {label}</p>
                    </div>
                    {order._isPaid ? (
                      <a
                        href={donwlaodUrl}
                        download={product.name}
                        className="text-blue-600 hover:underline underline-offset-2"
                      >
                        Download asset
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default ThankYouPage;
