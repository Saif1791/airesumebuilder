import ResumePreview from "@/components/ResumePreview";
import { resumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="hidden md:flex md:w-1/2">
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
