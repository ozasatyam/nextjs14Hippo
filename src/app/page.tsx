import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";
const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description: "Get you assetes delivery in seconds in email use right away",
  },
  {
    name: "Gauranted Qulity",
    Icon: CheckCircle,
    description:
      "Every assets on our platform is verified by our team to ensure out highest quliety, and if you dont like it we have 30 return policy",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural enviromental",
  },
];
export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your Marketplace for high-quality
            <span className="text-gray-500"> Digital Assets</span>.
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome To NextHippo. Our quility Team promise the Quility and
            Security with guaranty . Feel free to browse and let us know what
            you think.
          </p>
          <div className="flex flex-col self-center sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browes Trending
            </Link>
            <Button variant={"ghost"}> Our quility promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid   grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0  ">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center "
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <div className="text-base font-medium textgray-900">
                    {perk.name}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
