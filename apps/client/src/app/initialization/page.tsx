"use client";

import { apiRequest } from "@/utils/api";
import { constructUrl } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Loader from "@workspace/ui/components/custom/loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type CheckInitResponse = {
  value: boolean;
};

type CreateLMSRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
  school: string;
};

type CreateLMSResponse = {
  success: boolean;
};

const adminSchema = z.object({
  name: z.string().min(5).max(255),
  email: z.string().email().min(5).max(255),
  username: z
    .string()
    .regex(/^[a-z0-9_]{5,30}$/, { message: "Invalid username" }),
  password: z.string().min(8).max(255),
});

const schoolSchema = z.object({
  name: z.string().min(5).max(255),
});

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admin");

  const router = useRouter();

  useEffect(() => {
    (async function checkInit() {
      await apiRequest<null, CheckInitResponse>({
        url: await constructUrl("/init"),
        method: "GET",
        silent: true,
        onSuccess: (data) => {
          if (data.value === false) {
            toast.error("LMS already initialized");
            router.push("/");
          }
        },
        onError: () => null,
      });

      setLoading(false);
    })();
  }, []);

  const adminForm = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const schoolForm = useForm<z.infer<typeof schoolSchema>>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
    },
  });

  const onAdminSubmit = () => {
    setActiveTab("school");
  };

  const onSchoolSubmit = async (values: z.infer<typeof schoolSchema>) => {
    const data: CreateLMSRequest = {
      name: adminForm.getValues("name"),
      email: adminForm.getValues("email"),
      username: adminForm.getValues("username"),
      password: adminForm.getValues("password"),
      school: values.name,
    };

    await apiRequest<CreateLMSRequest, CreateLMSResponse>({
      url: await constructUrl("/init"),
      method: "POST",
      data,
      loadingMessage: "Initializing LMS...",
      successMessage: "LMS initialized successfully",
      errorMessage: "System already initialized",
      onSuccess: (data) => {
        if (data.success) {
          router.push("/auth/login");
        }
      },
      onError: () => null,
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Card className="max-w-lg mx-auto px-4 mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Initialize Your LMS
        </CardTitle>
        <CardDescription>
          Set up your admin account and school details to initialize your
          learning managment system and get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin Details</TabsTrigger>
            <TabsTrigger value="school" disabled={!adminForm.formState.isValid}>
              School Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin" className="mt-10">
            <Form {...adminForm}>
              <form
                onSubmit={adminForm.handleSubmit(onAdminSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={adminForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={adminForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={adminForm.control}
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
                  control={adminForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter secure password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={schoolForm.formState.isSubmitting}
                  className="w-full mt-5"
                >
                  Continue to School Details <MoveRight />
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="school" className="mt-10">
            <Form {...schoolForm}>
              <form
                onSubmit={schoolForm.handleSubmit(onSchoolSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={schoolForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Learning Academy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={schoolForm.formState.isSubmitting}
                  className="w-full mt-5"
                >
                  Initialize LMS
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
