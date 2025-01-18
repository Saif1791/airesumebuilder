import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInforForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General Information",
    component: GeneralInfoForm,
    key: "generalinfo",
  },
  {
    title: "Personal Information",
    component: PersonalInfoForm,
    key: "personalinfo",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "workexperience",
  },
];
