import Image from "next/image";
import Link from "next/link";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  ArrowRight,
  BarChart,
  BookOpen,
  CheckCircle,
  Github,
  Shield,
  Users,
} from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <section className="grid w-full gap-6 pt-16 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Open Source Learning Management System
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Empower your educational journey with a free, flexible, and
              feature-rich platform built by the community, for the community.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/docs">
              <Button size="lg" className="gap-1">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
        <div className="mx-auto hidden w-full max-w-[500px] lg:block lg:max-w-none">
          <div className="aspect-video overflow-hidden rounded-xl bg-muted/50">
            <Image
              src="/cover.jpg"
              width={1280}
              height={720}
              alt="Dashboard preview"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-72">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="px-5">Featues</Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to create exceptional learning experiences
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Our platform combines powerful tools with intuitive design to make
              teaching and learning more effective.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border border-input bg-background p-6 shadow transition-all hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Course Management</h3>
            <p className="text-muted-foreground">
              Create, organize, and deliver engaging courses with our intuitive
              content management system.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-input bg-background p-6 shadow transition-all hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Student Engagement</h3>
            <p className="text-muted-foreground">
              Foster collaboration with discussion forums, live sessions, and
              interactive assignments.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-input bg-background p-6 shadow transition-all hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Analytics & Insights</h3>
            <p className="text-muted-foreground">
              Track student progress and course effectiveness with comprehensive
              analytics tools.
            </p>
          </div>
          {/* <div className="flex flex-col gap-2 rounded-lg border border-input bg-background p-6 shadow transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Multilingual Support</h3>
              <p className="text-muted-foreground">
                Reach a global audience with built-in translation and
                localization capabilities.
              </p>
            </div> */}
          <div className="flex flex-col gap-2 rounded-lg border border-input bg-background p-6 shadow transition-all hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure & Private</h3>
            <p className="text-muted-foreground">
              Protect your data and your students privacy with our
              security-first approach.
            </p>
          </div>
          {/* <div className="flex flex-col gap-2 rounded-lg border border-input bg-background p-6 shadow transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Extensible</h3>
              <p className="text-muted-foreground">
                Customize and extend functionality with our plugin system and
                open API.
              </p>
            </div> */}
        </div>
      </section>

      <section className="w-full py-12 pt-80 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Image
                src="/giphy.gif"
                width={800}
                height={800}
                unoptimized
                alt="Open source collaboration"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="px-5">Open Source</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Built by the community, for the community
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Our LMS is 100% open source, giving you complete freedom to
                  use, modify, and contribute.
                </p>
              </div>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Free to use forever, no hidden costs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Transparent development process</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Active community of contributors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>No vendor lock-in, own your data</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Customizable to fit your specific needs</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  target="_blank"
                  href="https://github.com/tracepanic/learn-sphere"
                >
                  <Button variant="outline" className="gap-1">
                    <Github className="h-4 w-4" /> View on GitHub
                  </Button>
                </Link>
                <Button variant="ghost">Join our community</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-80 w-full rounded-t-2xl bg-muted/50 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto flex justify-center px-4 md:px-6">
          <div className="flex max-w-[800px] flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your learning experience?
              </h2>
              {/* <p className="mx-auto mt-10 max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Join  educators and institutions already using our
                platform.
              </p> */}
            </div>
            <Link href="/docs" className="mx-auto mt-10">
              <Button size="lg" className="gap-1">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
