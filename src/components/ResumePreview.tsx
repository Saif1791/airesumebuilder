import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import { useRef } from "react";

interface ResumePreviewProps {
  resumeData: resumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div style={{ zoom: (1 / 794) * width }}>
        <h1 className="p-6 text-3xl font-bold">
          This size should change with the size of the container
        </h1>
      </div>
    </div>
  );
}
