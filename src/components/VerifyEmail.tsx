"use client";
import { trpc } from "@/trpc/client";
import React from "react";

function VerifyEmail() {
  const {} = trpc.auth;
  return <div>VerifyEmail</div>;
}

export default VerifyEmail;
