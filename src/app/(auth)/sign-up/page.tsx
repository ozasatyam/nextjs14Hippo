"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from 'react-hook-form';

function page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href={"/sign-in"}
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4"></ArrowRight>
            </Link>
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className={cn({ "focus-visible:ring-red-500": true })}
                    placeholder="you@example.com"
                  ></Input>
                </div>
                <div className="grip gap-1 py-2">
                  <Label htmlFor="password">Email</Label>
                  <Input
                    className={cn({ "focus-visible:ring-red-500": true })}
                    placeholder="password"
                  ></Input>
                </div>
                <Button>Sign Up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;