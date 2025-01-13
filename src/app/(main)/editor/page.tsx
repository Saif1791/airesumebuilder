"use client";

import Footer from "./Footer";
import FormBreadCrumb from "@/components/FormBreadCrumb";
import { steps } from "./steps";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { resumeValues } from "@/lib/validation";

export default function Page() {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0]?.key;

  const [resumeData, setResumeData] = useState<resumeValues>({});

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState({}, "", `?${newSearchParams.toString()}`);
  };

  const BreadForm = steps?.find((step) => {
    return step.key === currentStep;
  })?.component;

  return (
    <div className="my-6 flex grow flex-col">
      <header className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-semibold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative mt-10 grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full space-y-10 overflow-y-auto md:w-1/2">
            <FormBreadCrumb
              currentStep={currentStep}
              setCurrentStep={setStep}
            />
            {BreadForm && (
              <BreadForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r"></div>
          <div className="hidden md:flex md:w-1/2">
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
