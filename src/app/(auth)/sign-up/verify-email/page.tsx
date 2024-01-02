import Image from "next/image";
import React from "react";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function VerifyEmailPage({ searchParams }: PageProps) {
  const token = searchParams.token;
  return (
    <div className="contrainer relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6"></div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                fill
                alt="Hippo email send Imge"
                src={"hippo-email-sent.png"}
              />
            </div>
            <h3 className="font-semibold text-2xl"> Check Your Email</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
