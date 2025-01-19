/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { EditorFormProps } from "@/lib/types";
import { educationValues, educationSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { GripHorizontal, TrashIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<educationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [{}],
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "education",
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [fields]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        education: values.education?.filter((edu) => edu !== undefined) || [],
      });
    });
    return () => unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your educational qualifications
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <EducationField
              key={field.id}
              index={index}
              form={form}
              remove={remove}
              ref={inputRef}
              move={move}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                  grade: "",
                })
              }
            >
              Add another qualification
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationFieldProps {
  form: UseFormReturn<educationValues>;
  index: number;
  remove: (index: number) => void;
  ref: React.Ref<HTMLInputElement>;
  move: (from: number, to: number) => void;
}

function EducationField({
  form,
  index,
  remove,
  ref,
  move,
}: EducationFieldProps) {
  return (
    <div className="flex flex-col space-y-3 rounded-md border bg-background p-3">
      <div className="flex flex-row justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <div className="flex gap-4">
          <GripHorizontal
            className="size-5 cursor-grab text-muted-foreground"
            onDrag={() => move(index, index + 1)}
          />
          <TrashIcon
            className="size-5 cursor-pointer text-muted-foreground"
            onClick={() => remove(index)}
          />
        </div>
      </div>
      <FormField
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input
                placeholder="Degree"
                {...field}
                autoFocus={true}
                ref={ref}
              />
            </FormControl>

            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      <FormField
        name={`education.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input placeholder="University/College Name" {...field} />
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-2">
        <FormField
          name={`education.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  placeholder="Start Date"
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </FormControl>
              <FormMessage></FormMessage>
              <FormDescription>Format: YYYY-MM-DD</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name={`education.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  placeholder="End Date"
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  pattern="\d{4}-\d{2}-\d{2}" //YYYY-MM-DD
                />
              </FormControl>
              <FormDescription>Format: YYYY-MM-DD</FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </div>
      <FormField
        name={`education.${index}.grade`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grade</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Grade"
                {...field}
                className="resize-none"
                rows={4}
              />
            </FormControl>
            <FormDescription>Grade in either % or CGPA</FormDescription>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
