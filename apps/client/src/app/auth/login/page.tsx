"use client";

import { apiRequest } from "@/utils/api";
import { constructUrl } from "@/utils/helper";
import { createSession, getSession } from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  name: string;
  username: string;
  accessInfo: string;
  accessToken: string;
};

const schema = z.object({
  username: z
    .string()
    .regex(/^[a-z0-9_]{5,30}$/, { message: "Invalid username" }),
  password: z.string().min(8).max(255),
});

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    await apiRequest<LoginRequest, LoginResponse>({
      url: await constructUrl("auth/login"),
      method: "POST",
      data: values,
      loadingMessage: "Logging in...",
      successMessage: "Login successful",
      errorMessage: "Something went wrong",
      onSuccess: async (data) => {
        await createSession({
          name: data.name,
          username: data.username,
          accessInfo: data.accessInfo,
          accessToken: data.accessToken,
        });

        const session = await getSession();

        switch (session?.user.type) {
          case "ADMIN":
            router.push("/admin");
            break;
        }
      },
      onError: () => null,
    });
  };

  return (
    <Card className="max-w-lg mx-auto px-4 mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        <CardDescription>
          Enter your username and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="john_doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full mt-5"
            >
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
