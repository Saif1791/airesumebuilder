/* eslint-disable @typescript-eslint/no-unused-vars */
import { socialSchema, socialValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect } from "react";
import { EditorFormProps } from "@/lib/types";

export default function SocialInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<socialValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      github: resumeData.github || "",
      linkedin: resumeData.linkedin || "",
      X: resumeData.X || "",
      medium: resumeData.medium || "",
      portfolio: resumeData.portfolio || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return () => unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Social Profiles</h2>
        <p className="text-sm text-muted-foreground">
          Add your social media profiles
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          <div className="flex grow gap-10">
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="www.github.com/saif1791"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormDescription>
                    Paste the whole URL: e.g. https://github.com/Saif1791
                  </FormDescription>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="www.linkedin.com/in/saif1791"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="X"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter)</FormLabel>
                <FormControl>
                  <Input placeholder="www.x.com/saif1793" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medium</FormLabel>
                <FormControl>
                  <Input placeholder="Medium.com/@saifsep17" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://saifwebdevportfolio.vercel.app/"
                    {...field}
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
