"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Search,
  UserPlus,
  MessageSquare,
  MapPin,
  Loader2,
  RefreshCw,
} from "lucide-react";

const sampleAlumniData = [
  {
    id: 1,
    name: "Alice Johnson",
    graduationYear: "2015",
    jobTitle: "Software Engineer",
    company: "Tech Corp",
    industry: "Technology",
    country: "United States",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 2,
    name: "Bob Smith",
    graduationYear: "2018",
    jobTitle: "Data Analyst",
    company: "Data Insights Inc.",
    industry: "Data Science",
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 3,
    name: "Carol Williams",
    graduationYear: "2020",
    jobTitle: "Product Manager",
    company: "Innovate Co.",
    industry: "Technology",
    country: "Canada",
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: 4,
    name: "David Brown",
    graduationYear: "2017",
    jobTitle: "Marketing Specialist",
    company: "Brand Builders",
    industry: "Marketing",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: 5,
    name: "Eva Martinez",
    graduationYear: "2019",
    jobTitle: "UX Designer",
    company: "Design Masters",
    industry: "Design",
    country: "Spain",
    lat: 40.4168,
    lng: -3.7038,
  },
];

export default function AlumniNetworkPage() {
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState(sampleAlumniData);
  const [filteredAlumni, setFilteredAlumni] = useState(sampleAlumniData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [maxDistance, setMaxDistance] = useState(5000);
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  const initMap = useCallback(() => {
    if (mapRef.current) return; // Map already initialized

    mapRef.current = L.map("map", {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 6,
      maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    updateMarkers();
  }, []);

  const updateMarkers = useCallback(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredAlumni.forEach((alum) => {
      const marker = L.circleMarker([alum.lat, alum.lng], {
        radius: 5,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .addTo(mapRef.current!)
        .bindPopup(
          `<strong>${alum.name}</strong><br>${alum.jobTitle} at ${alum.company}<br>${alum.country}`,
        );

      marker.on("mouseover", function (e) {
        this.openPopup();
      });
      marker.on("mouseout", function (e) {
        this.closePopup();
      });

      markersRef.current.push(marker);
    });
  }, [filteredAlumni]);

  useEffect(() => {
    initMap();
    return () => {
      if (mapRef.current) {
        //mapRef.current.remove();
      }
    };
  }, [initMap]);

  useEffect(() => {
    updateMarkers();
  }, [filteredAlumni, updateMarkers]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real application, you would fetch data from your backend here
    const newData = sampleAlumniData.map((item) => ({
      ...item,
      lat: item.lat + (Math.random() - 0.5) * 10,
      lng: item.lng + (Math.random() - 0.5) * 10,
    }));
    setAlumni(newData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    // Simulating getting user's location
    setUserLocation({ lat: 37.7749, lng: -122.4194 });
  }, [fetchData]);

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  useEffect(() => {
    const filtered = alumni.filter((alum) => {
      const matchesSearch =
        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear =
        filterYear === "all" || alum.graduationYear === filterYear;
      const matchesIndustry =
        filterIndustry === "all" || alum.industry === filterIndustry;
      const matchesDistance =
        !showNearbyOnly ||
        (userLocation &&
          calculateDistance(
            userLocation.lat,
            userLocation.lng,
            alum.lat,
            alum.lng,
          ) <= maxDistance);
      return matchesSearch && matchesYear && matchesIndustry && matchesDistance;
    });
    setFilteredAlumni(filtered);
  }, [
    alumni,
    searchTerm,
    filterYear,
    filterIndustry,
    showNearbyOnly,
    maxDistance,
    userLocation,
  ]);

  const handleConnect = (alumName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${alumName}.`,
    });
  };

  const handleMessage = (alumName: string) => {
    toast({
      title: "Message Sent",
      description: `You've opened a chat with ${alumName}.`,
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Alumni Network</h1>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search alumni by name, job title, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-2/3">
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>
              <SelectValue placeholder="Graduation Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
              <SelectItem value="2018">2018</SelectItem>
              <SelectItem value="2017">2017</SelectItem>
              <SelectItem value="2016">2016</SelectItem>
              <SelectItem value="2015">2015</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="nearby-only"
            checked={showNearbyOnly}
            onCheckedChange={setShowNearbyOnly}
          />
          <Label htmlFor="nearby-only">Show Nearby Alumni Only</Label>
        </div>
        {showNearbyOnly && (
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <Label htmlFor="max-distance">Max Distance: {maxDistance} km</Label>
            <Slider
              id="max-distance"
              min={100}
              max={10000}
              step={100}
              value={[maxDistance]}
              onValueChange={([value]) => setMaxDistance(value)}
              className="w-[200px]"
            />
          </div>
        )}
        <Button onClick={fetchData} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <Card className="w-full h-[500px] mb-8">
        <CardHeader>
          <CardTitle>Alumni World Map</CardTitle>
        </CardHeader>
        <CardContent className="relative h-[calc(100%-5rem)]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          <div id="map" className="w-full h-full"></div>
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
            <p className="text-sm font-semibold">
              Total Alumni: {filteredAlumni.length}
            </p>
            <p className="text-sm font-semibold">
              Countries Shown:{" "}
              {new Set(filteredAlumni.map((a) => a.country)).size}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <Card key={alum.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`/placeholder-avatar-${alum.id}.jpg`}
                    alt={alum.name}
                  />
                  <AvatarFallback>
                    {alum.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{alum.name}</CardTitle>
                  <CardDescription>
                    Class of {alum.graduationYear}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{alum.jobTitle}</p>
              <p className="text-sm text-gray-600 mb-2">{alum.company}</p>
              <Badge>{alum.industry}</Badge>
              {userLocation && (
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {Math.round(
                    calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      alum.lat,
                      alum.lng,
                    ),
                  )}{" "}
                  km away
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConnect(alum.name)}
              >
                <UserPlus className="mr-2 h-4 w-4" /> Connect
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMessage(alum.name)}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
