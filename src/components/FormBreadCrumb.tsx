"use client";

import { Slash } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { steps } from "@/app/(main)/editor/steps";

interface Step {
  title: string;
  key: string;
}

interface breadCrumbprops {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function BreadcrumbWithCustomSeparator({
  currentStep,
  setCurrentStep,
}: breadCrumbprops) {
  return (
    <div className="flex justify-center gap-3">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step: Step, index: number) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button onClick={() => setCurrentStep(step.key)}>
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden">
                <Slash />
              </BreadcrumbSeparator>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
