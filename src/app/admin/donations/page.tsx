"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Download, PlusCircle, Edit, Trash2 } from "lucide-react";

export default function DonationsPage() {
  const [donations, setDonations] = useState([
    {
      id: 1,
      donor: "John Doe",
      amount: 1000,
      date: "2023-05-15",
      campaign: "Scholarship Fund",
      status: "Processed",
    },
    {
      id: 2,
      donor: "Jane Smith",
      amount: 5000,
      date: "2023-05-10",
      campaign: "Library Expansion",
      status: "Pending",
    },
    {
      id: 3,
      donor: "Bob Johnson",
      amount: 2500,
      date: "2023-05-08",
      campaign: "Research Grant",
      status: "Processed",
    },
    {
      id: 4,
      donor: "Alice Brown",
      amount: 10000,
      date: "2023-05-05",
      campaign: "Athletic Center",
      status: "Processed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("");

  const filteredDonations = donations.filter(
    (donation) =>
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCampaign === "" || donation.campaign === filterCampaign),
  );

  const campaigns = [new Set(donations.map((d) => d.campaign))];

  const handleDeleteDonation = (id: any) => {
    setDonations(donations.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Donations Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Donation Statistics</CardTitle>
          <CardDescription>Overview of donation metrics</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {donations
                  .reduce((sum, d) => sum + d.amount, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Largest Donation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.max(...donations.map((d) => d.amount)).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Donation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {(
                  donations.reduce((sum, d) => sum + d.amount, 0) /
                  donations.length
                ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Track and manage alumni donations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donations"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterCampaign} onValueChange={setFilterCampaign}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Campaigns</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign} value={campaign}>
                    {campaign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Donation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Donation</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new donation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="donor" className="text-right">
                        Donor
                      </Label>
                      <Input id="donor" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input id="amount" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="campaign" className="text-right">
                        Campaign
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select campaign" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign} value={campaign}>
                              {campaign}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Donation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">
                      {donation.donor}
                    </TableCell>
                    <TableCell>${donation.amount.toLocaleString()}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>{donation.campaign}</TableCell>
                    <TableCell>{donation.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDonation(donation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
