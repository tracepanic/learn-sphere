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
import { Loader } from "@workspace/ui/components/custom/loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type GetGeneralSettingsRes = {
  name: string;
  description: string | null;
  website: string | null;
};

type UpdateGeneralSettingsRes = GetGeneralSettingsRes & {};

const schema = z.object({
  name: z.string().min(5).max(255),
  description: z.string().min(15).max(500),
  website: z.string().url().min(5).max(255),
});

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GetGeneralSettingsRes | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data ? data.name : "",
      description: data ? (data.description ?? "") : "",
      website: data ? (data.website ?? "") : "",
    },
  });

  useEffect(() => {
    (async function fetchData() {
      await apiRequest<null, GetGeneralSettingsRes>({
        url: await constructUrl("/settings/admin/general"),
        method: "GET",
        silent: true,
        onSuccess: (data) => {
          setData(data);
          form.reset({
            name: data.name,
            description: data.description ?? "",
            website: data.website ?? "",
          });
        },
        onError: (error) => {
          setError(error);
          toast.error(error);
        },
      });

      setLoading(false);
    })();
  }, []);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await apiRequest<z.infer<typeof schema>, UpdateGeneralSettingsRes>({
      url: await constructUrl("/settings/admin/general"),
      method: "PUT",
      data,
      loadingMessage: "Updating general settings...",
      successMessage: "Settings updated successfully!",
      errorMessage: "Failed to update settings",
      onSuccess: (data) => {
        setData(data);
        form.reset({
          name: data.name,
          description: data.description ?? "",
          website: data.website ?? "",
        });
      },
      onError: () => null,
    });
  };

  if (error) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold">General Settings</h1>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            School Information
          </CardTitle>
          <CardDescription>
            Update your school&apos;s basic information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Learning Academy"
                        className="max-w-lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Description</FormLabel>
                    <FormControl>
                      <Textarea className="max-w-lg" {...field}></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        className="max-w-lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full sm:w-44 mt-5"
              >
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
