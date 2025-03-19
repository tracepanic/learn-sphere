import { cn } from "@workspace/ui/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ size = 30, className = "" }) => {
  return (
    <div className={cn("flex justify-center mt-10 items-center h-full w-full", className)}>
      <Loader2 className="animate-spin text-gray-500" size={size} />
    </div>
  );
};

export default Loader;
