import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SocialLink from "./SocialLink";

interface ResumePreviewProps {
  resumeData: resumeValues;
  className?: string;
}

interface ResumeSectionProps {
  resumeData: resumeValues;
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
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
      </div>
    </div>
  );
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    github,
    linkedin,
    X,
    medium,
    portfolio,
  } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectURL = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectURL) {
      setPhotoSrc(objectURL);
    }
    if (photo === null) {
      setPhotoSrc(null);
    }

    return () => URL.revokeObjectURL(objectURL);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt="Display Photo"
          width={100}
          height={100}
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {(firstName || lastName) && firstName + " " + lastName}{" "}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " | " : ""}
          {phone}
          {phone && email ? " | " : ""} <a href={`mailto:${email}`}>{email}</a>
        </p>
        <div className="flex flex-row flex-wrap gap-4 text-xs">
          {github && (
            <div className="flex items-center gap-2">
              <Github />
              <SocialLink socialLink={github} />
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin />
              <SocialLink socialLink={linkedin} />
            </div>
          )}
          {X && (
            <div className="flex items-center gap-2">
              <Twitter />
              <SocialLink socialLink={X} />
            </div>
          )}
          {medium && (
            <div className="flex items-center gap-2">
              Medium:
              <SocialLink socialLink={medium} />
            </div>
          )}
          {portfolio && (
            <div className="flex items-center gap-2">
              Portfolio:
              <SocialLink socialLink={portfolio} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;
  console.log("Summary:", summary);

  if (
    !summary ||
    summary === undefined ||
    summary === "" ||
    summary.length <= 0
  ) {
    return null;
  } else {
    return (
      <>
        <hr className="border-2" />
        <div className="break-inside-avoid space-y-3">
          <p className="text-lg font-semibold">Professional Profile</p>
          <div className="text-sm">
            <p className="whitespace-pre-wrap break-words">{summary}</p>
          </div>
        </div>
      </>
    );
  }
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => exp && Object.values(exp).filter(Boolean).length > 0,
  );

  if (workExperiencesNotEmpty?.length === 0) return null;

  return (
    <>
      <hr className="border-2" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Professional Profile</p>
        <div className="text-sm">
          <p className="whitespace-pre-wrap break-words">
            {workExperiences?.map((workExperience) => (
              <>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold">{workExperience?.company}</p>
                    <div className="flex flex-row">
                      <p>{workExperience?.startDate}</p>
                      <p> - </p>
                      <p>{workExperience?.endDate}</p>
                    </div>
                  </div>
                  <p className="text-xs">{workExperience?.position}</p>
                  <p>{workExperience?.description}</p>
                </div>
              </>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
