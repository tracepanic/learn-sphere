import { Card, CardHeader } from "@workspace/ui/components/card";
import { ShieldAlert } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <ShieldAlert className="h-12 w-12 text-red-600" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
