"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Award } from "lucide-react";

export default function SkillsPage() {
  const [skills, setSkills] = useState([
    { id: 1, name: "Leadership", level: 80 },
    { id: 2, name: "Communication", level: 90 },
    { id: 3, name: "Problem Solving", level: 85 },
    { id: 4, name: "Teamwork", level: 95 },
  ]);

  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  const [certifications, setCertifications] = useState([
    "Project Management Professional (PMP)",
    "Certified Information Systems Security Professional (CISSP)",
  ]);
  const [newCertification, setNewCertification] = useState("");

  const handleSkillChange = (
    id: number,
    field: "name" | "level",
    value: string | number,
  ) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
  };

  const addSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { id: Date.now(), ...newSkill }]);
      setNewSkill({ name: "", level: 50 });
      toast({
        title: "Skill Added",
        description: `${newSkill.name} has been added to your skills.`,
      });
    }
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
    toast({
      title: "Skill Removed",
      description: "The skill has been removed from your profile.",
    });
  };

  const addCertification = () => {
    if (newCertification) {
      setCertifications([...certifications, newCertification]);
      setNewCertification("");
      toast({
        title: "Certification Added",
        description: `${newCertification} has been added to your certifications.`,
      });
    }
  };

  const removeCertification = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert));
    toast({
      title: "Certification Removed",
      description: "The certification has been removed from your profile.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Skills & Certifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
            <CardDescription>
              Assess and update your professional skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`skill-${skill.id}`}>{skill.name}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Slider
                  id={`skill-${skill.id}`}
                  min={0}
                  max={100}
                  step={1}
                  value={[skill.level]}
                  onValueChange={([value]) =>
                    handleSkillChange(skill.id, "level", value)
                  }
                />
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex space-x-2 w-full">
              <Input
                placeholder="New skill name"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
              />
              <Select
                value={newSkill.level.toString()}
                onValueChange={(value) =>
                  setNewSkill({ ...newSkill, level: parseInt(value) })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">Beginner</SelectItem>
                  <SelectItem value="50">Intermediate</SelectItem>
                  <SelectItem value="75">Advanced</SelectItem>
                  <SelectItem value="100">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={addSkill}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>
              Add your professional certifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    {cert}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(cert)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex space-x-2 w-full">
              <Input
                placeholder="New certification"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
              />
              <Button onClick={addCertification}>Add</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
