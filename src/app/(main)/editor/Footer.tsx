import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";

interface footerProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function Footer({ currentStep, setCurrentStep }: footerProps) {
  const previousStep = steps.find((_, index) => {
    return steps[index + 1]?.key === currentStep;
  })?.key;

  const nextStep = steps.find((_, index) => {
    return steps[index - 1]?.key === currentStep;
  })?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Link href="/resumes">Resumes</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
}
