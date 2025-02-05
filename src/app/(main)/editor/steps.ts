import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInforForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import SocialInfoForm from "./forms/SocialsForm";

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
    title: "Social Links",
    component: SocialInfoForm,
    key: "socialinfo",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "workexperience",
  },
  {
    title: "Educational Qualification",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skills",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
