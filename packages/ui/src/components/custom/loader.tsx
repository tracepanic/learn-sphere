import { cn } from "@workspace/ui/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ size = 30, className = "" }) => {
  return (
    <div
      className={cn(
        "mt-10 flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <Loader2 className="animate-spin text-gray-500" size={size} />
    </div>
  );
};

export default Loader;
