"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Gift,
  DollarSign,
  FileText,
  Users,
  Shield,
} from "lucide-react";

// Mock data for demonstration purposes
const mockDonations = [
  { id: 1, amount: 500, date: "2023-05-15", campaign: "Annual Fund" },
  { id: 2, amount: 1000, date: "2023-07-01", campaign: "Scholarship Fund" },
  { id: 3, amount: 250, date: "2023-09-10", campaign: "Library Renovation" },
];

const mockAchievements = [
  { id: 1, title: "Distinguished Alumni Award", year: 2022 },
  { id: 2, title: "Volunteer of the Year", year: 2021 },
];

const mockCertificates = [
  {
    id: 1,
    title: "Advanced Leadership Program",
    issuer: "University Leadership Institute",
    year: 2023,
  },
  {
    id: 2,
    title: "Data Science Specialization",
    issuer: "Online Learning Platform",
    year: 2022,
  },
];

export default function UpdateProfilePage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St, Anytown, USA",
    birthDate: "1985-05-15",
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    company: "Tech Innovations Inc.",
    jobTitle: "Senior Software Engineer",
    industry: "Technology",
    yearsOfExperience: "10",
  });
  const [educationInfo, setEducationInfo] = useState({
    degree: "Bachelor of Science",
    major: "Computer Science",
    graduationYear: "2007",
  });
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: true,
    showPhone: false,
    showAddress: false,
    showBirthDate: false,
    showProfessionalInfo: true,
    showEducationInfo: true,
  });
  const [mentorshipInfo, setMentorshipInfo] = useState({
    isMentor: false,
    mentorshipAreas: [],
    mentorshipAvailability: "",
    menteeCapacity: "",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleProfessionalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfessionalInfo({
      ...professionalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEducationInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEducationInfo({ ...educationInfo, [e.target.name]: e.target.value });
  };

  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    });
  };

  const handleMentorshipChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setMentorshipInfo({ ...mentorshipInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    console.log("Updated Profile:", {
      personalInfo,
      professionalInfo,
      educationInfo,
      privacySettings,
      mentorshipInfo,
    });
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const getMembershipType = (totalDonations: number) => {
    if (totalDonations >= 5000) return "Platinum";
    if (totalDonations >= 2500) return "Gold";
    if (totalDonations >= 1000) return "Silver";
    return "Bronze";
  };

  const totalDonations = mockDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0,
  );
  const membershipType = getMembershipType(totalDonations);

  return (
    <form onSubmit={handleSubmit} className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Update Your Alumni Profile
      </h1>

      <Tabs defaultValue="personal" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  required
                />
                <div className="flex items-center mt-2">
                  <Switch
                    id="showEmail"
                    checked={privacySettings.showEmail}
                    onCheckedChange={() => handlePrivacyToggle("showEmail")}
                  />
                  <label
                    htmlFor="showEmail"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Show email on public profile
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
                <div className="flex items-center mt-2">
                  <Switch
                    id="showPhone"
                    checked={privacySettings.showPhone}
                    onCheckedChange={() => handlePrivacyToggle("showPhone")}
                  />
                  <label
                    htmlFor="showPhone"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Show phone on public profile
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                />
                <div className="flex items-center mt-2">
                  <Switch
                    id="showAddress"
                    checked={privacySettings.showAddress}
                    onCheckedChange={() => handlePrivacyToggle("showAddress")}
                  />
                  <label
                    htmlFor="showAddress"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Show address on public profile
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birth Date
                </label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={personalInfo.birthDate}
                  onChange={handlePersonalInfoChange}
                />
                <div className="flex items-center mt-2">
                  <Switch
                    id="showBirthDate"
                    checked={privacySettings.showBirthDate}
                    onCheckedChange={() => handlePrivacyToggle("showBirthDate")}
                  />
                  <label
                    htmlFor="showBirthDate"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Show birth date on public profile
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Update your career details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={professionalInfo.company}
                  onChange={handleProfessionalInfoChange}
                />
              </div>
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={professionalInfo.jobTitle}
                  onChange={handleProfessionalInfoChange}
                />
              </div>
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Industry
                </label>
                <Input
                  id="industry"
                  name="industry"
                  value={professionalInfo.industry}
                  onChange={handleProfessionalInfoChange}
                />
              </div>
              <div>
                <label
                  htmlFor="yearsOfExperience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years of Experience
                </label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={professionalInfo.yearsOfExperience}
                  onChange={handleProfessionalInfoChange}
                />
              </div>
              <div className="flex items-center mt-4">
                <Switch
                  id="showProfessionalInfo"
                  checked={privacySettings.showProfessionalInfo}
                  onCheckedChange={() =>
                    handlePrivacyToggle("showProfessionalInfo")
                  }
                />
                <label
                  htmlFor="showProfessionalInfo"
                  className="ml-2 text-sm text-gray-600"
                >
                  Show professional information on public profile
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Mentorship Information</CardTitle>
              <CardDescription>
                Set your preferences for mentoring other alumni
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Switch
                  id="isMentor"
                  checked={mentorshipInfo.isMentor}
                  onCheckedChange={(checked) =>
                    setMentorshipInfo({ ...mentorshipInfo, isMentor: checked })
                  }
                />
                <label
                  htmlFor="isMentor"
                  className="ml-2 text-sm text-gray-600"
                >
                  I want to be a mentor
                </label>
              </div>
              {mentorshipInfo.isMentor && (
                <>
                  <div>
                    <label
                      htmlFor="mentorshipAreas"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mentorship Areas
                    </label>
                    <Select
                      name="mentorshipAreas"
                      value={mentorshipInfo.mentorshipAreas.join(",")}
                      onValueChange={(value) =>
                        setMentorshipInfo({
                          ...mentorshipInfo,
                          mentorshipAreas: value.split(","),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select areas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career">Career Advice</SelectItem>
                        <SelectItem value="technical">
                          Technical Skills
                        </SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="entrepreneurship">
                          Entrepreneurship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="mentorshipAvailability"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Availability
                    </label>
                    <Select
                      name="mentorshipAvailability"
                      value={mentorshipInfo.mentorshipAvailability}
                      onValueChange={(value) =>
                        setMentorshipInfo({
                          ...mentorshipInfo,
                          mentorshipAvailability: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="menteeCapacity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Mentees
                    </label>
                    <Input
                      id="menteeCapacity"
                      name="menteeCapacity"
                      type="number"
                      value={mentorshipInfo.menteeCapacity}
                      onChange={handleMentorshipChange}
                      min="1"
                      max="5"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education Information</CardTitle>
              <CardDescription>
                Update your educational background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-gray-700"
                >
                  Degree
                </label>
                <Input
                  id="degree"
                  name="degree"
                  value={educationInfo.degree}
                  onChange={handleEducationInfoChange}
                />
              </div>
              <div>
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-gray-700"
                >
                  Major
                </label>
                <Input
                  id="major"
                  name="major"
                  value={educationInfo.major}
                  onChange={handleEducationInfoChange}
                />
              </div>
              <div>
                <label
                  htmlFor="graduationYear"
                  className="block text-sm font-medium text-gray-700"
                >
                  Graduation Year
                </label>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  value={educationInfo.graduationYear}
                  onChange={handleEducationInfoChange}
                />
              </div>
              <div className="flex items-center mt-4">
                <Switch
                  id="showEducationInfo"
                  checked={privacySettings.showEducationInfo}
                  onCheckedChange={() =>
                    handlePrivacyToggle("showEducationInfo")
                  }
                />
                <label
                  htmlFor="showEducationInfo"
                  className="ml-2 text-sm text-gray-600"
                >
                  Show education information on public profile
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements and Certifications</CardTitle>
              <CardDescription>
                Showcase your accomplishments and credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="achievements">
                  <AccordionTrigger>Achievements</AccordionTrigger>
                  <AccordionContent>
                    {mockAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="mb-4 p-4 border rounded-md"
                      >
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">
                          Year: {achievement.year}
                        </p>
                      </div>
                    ))}
                    <Button className="mt-4">Add New Achievement</Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="certificates">
                  <AccordionTrigger>Certificates</AccordionTrigger>
                  <AccordionContent>
                    {mockCertificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="mb-4 p-4 border rounded-md"
                      >
                        <h4 className="font-semibold">{certificate.title}</h4>
                        <p className="text-sm text-gray-600">
                          Issuer: {certificate.issuer}
                        </p>
                        <p className="text-sm text-gray-600">
                          Year: {certificate.year}
                        </p>
                      </div>
                    ))}
                    <Button className="mt-4">Add New Certificate</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Donation History and Membership</CardTitle>
              <CardDescription>
                View your contribution history and current membership status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Current Membership:{" "}
                  <Badge variant="outline">{membershipType}</Badge>
                </h3>
                <p className="text-sm text-gray-600">
                  Total Donations: ${totalDonations}
                </p>
              </div>
              <h4 className="font-semibold mb-2">Recent Donations</h4>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {mockDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="mb-4 p-2 border-b last:border-b-0"
                  >
                    <p className="font-medium">
                      ${donation.amount} - {donation.campaign}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {donation.date}
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4 flex justify-between">
                <Button variant="outline">View All Donations</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Invoices</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Donation Invoices</DialogTitle>
                      <DialogDescription>
                        Here are your donation invoices for tax purposes.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      {mockDonations.map((donation) => (
                        <div
                          key={donation.id}
                          className="mb-4 p-2 border-b last:border-b-0"
                        >
                          <p className="font-medium">Invoice #{donation.id}</p>
                          <p className="text-sm">Amount: ${donation.amount}</p>
                          <p className="text-sm">Date: {donation.date}</p>
                          <p className="text-sm">
                            Campaign: {donation.campaign}
                          </p>
                          <Button variant="link" className="p-0 h-auto">
                            Download PDF
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button type="submit" size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
}
