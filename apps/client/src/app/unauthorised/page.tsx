"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import Loader from "@workspace/ui/components/custom/loader";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Unauthorised />
    </Suspense>
  );
}

function Unauthorised() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "/";

  const getAttemptedRole = () => {
    if (origin.startsWith("/admin")) return "the administrators";
    if (origin.startsWith("/teacher")) return "the teachers";
    if (origin.startsWith("/student")) return "the students";
    return "the requested";
  };

  return (
    <Card className="max-w-lg mx-auto px-4 mt-10">
      <CardHeader className="pb-0">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <ShieldAlert className="h-12 w-12 text-red-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Restricted</h1>
        <div className="space-y-2 text-slate-700">
          <p className="text-lg">
            You don&apos;t have permission to access {getAttemptedRole()} area.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/">Home Page</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
