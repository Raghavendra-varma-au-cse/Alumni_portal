"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  college: z.string().min(2, "College name must be at least 2 characters"),
  graduationYear: z.string().regex(/^\d{4}$/, "Must be a valid year"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  major: z.string().min(2, "Major must be at least 2 characters"),
  minor: z.string().optional(),
  gpa: z
    .string()
    .regex(/^\d*\.?\d*$/, "Must be a valid GPA")
    .optional(),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Please select an industry"),
  yearsOfExperience: z.string().regex(/^\d+$/, "Must be a valid number"),
  skills: z.string().min(2, "Please enter at least one skill"),
  mentor: z.boolean().optional(),
  linkedIn: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  interests: z.string().min(2, "Please enter at least one interest"),
  achievements: z.string().optional(),
  languages: z.string().min(2, "Please enter at least one language"),
  volunteerWork: z.string().optional(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const [step, setStep] = useState(1);

  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      college: "",
      graduationYear: "",
      degree: "",
      major: "",
      minor: "",
      gpa: "",
      jobTitle: "",
      company: "",
      industry: "",
      yearsOfExperience: "",
      skills: "",
      mentor: false,
      linkedIn: "",
      twitter: "",
      github: "",
      website: "",
      bio: "",
      interests: "",
      achievements: "",
      languages: "",
      volunteerWork: "",
    },
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isStepValid = await form.trigger(fields);
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data: RegistrationData) => {
    console.log(data);
    toast({
      title: "Registration Successful",
      description: "Welcome to the Alumni Network!",
    });
  };

  const getFieldsForStep = (step: number): (keyof RegistrationData)[] => {
    switch (step) {
      case 1:
        return ["firstName", "lastName", "email", "password"];
      case 2:
        return ["college", "graduationYear", "degree", "major", "minor", "gpa"];
      case 3:
        return [
          "jobTitle",
          "company",
          "industry",
          "yearsOfExperience",
          "skills",
        ];
      case 4:
        return ["linkedIn", "twitter", "github", "website", "bio"];
      case 5:
        return [
          "interests",
          "achievements",
          "languages",
          "volunteerWork",
          "mentor",
        ];
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Alumni Registration</CardTitle>
            <CardDescription>Join our alumni network</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="University of Example"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation Year</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[...Array(30)].map((_, i) => (
                                <SelectItem
                                  key={i}
                                  value={`${new Date().getFullYear() - i}`}
                                >
                                  {new Date().getFullYear() - i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bachelor of Science"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Major</FormLabel>
                          <FormControl>
                            <Input placeholder="Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minor (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Business Administration"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gpa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GPA (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="3.8" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Tech Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="tech">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                              <SelectItem value="manufacturing">
                                Manufacturing
                              </SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="media">
                                Media & Entertainment
                              </SelectItem>
                              <SelectItem value="nonprofit">
                                Non-Profit
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="JavaScript, React, Node.js"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate skills with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="linkedIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://www.linkedin.com/in/johndoe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://twitter.com/johndoe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/johndoe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Website (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://www.johndoe.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Max 500 characters</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Interests</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="AI, Machine Learning, Web Development"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate interests with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="achievements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notable Achievements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List your notable achievements"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="English, Spanish, Mandarin"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate languages with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="volunteerWork"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Volunteer Work (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your volunteer experiences"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mentor"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I&apos;m willing to mentor other alumni
                            </FormLabel>
                            <FormDescription>
                              You can opt out at any time.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {step > 1 && (
                  <Button onClick={prevStep} variant="outline" type="button">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                )}
                {step < 5 ? (
                  <Button onClick={nextStep} type="button">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    Complete Registration{" "}
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </motion.div>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
