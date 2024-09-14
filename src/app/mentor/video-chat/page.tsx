"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Share2,
  Users,
  FileText,
  Send,
  Hand,
  MoreVertical,
  Settings,
  Presentation,
  Maximize,
  MicIcon,
  Circle,
  CircleAlertIcon,
  CircleCheck,
} from "lucide-react";

export default function MentorVideoChat() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [raisedHands, setRaisedHands] = useState([]);

  // Simulating a connection event
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          sender: "You",
          content:
            "Welcome to our mentoring session! How can I help you today?",
        },
        {
          id: 2,
          sender: "Student",
          content:
            "Hi! I wanted to discuss my recent project and get some feedback.",
        },
      ]);
      setRaisedHands([{ id: 1, name: "John Doe" }]);
    }, 1000);
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "You", content: newMessage },
      ]);
      setNewMessage("");
    }
  };

  const handleRaisedHand = (id) => {
    setRaisedHands(raisedHands.filter((hand) => hand.id !== id));
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Mentor Video Chat Session</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Video Call with Student John Doe</CardTitle>
              <Button variant="outline" size="icon">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="aspect-video bg-muted flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">
                Student&apos;s video stream would appear here
              </p>
            </div>
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-primary flex items-center justify-center">
              <p className="text-primary-foreground">Your view</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? (
                  <VideoOff className="h-4 w-4" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
              >
                <Presentation
                  className={`h-4 w-4 ${isScreenSharing ? "text-green-500" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Circle
                  className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`}
                />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Adjust Settings
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Configure your audio and video settings.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-output">Sound Output</Label>
                        <Select>
                          <SelectTrigger id="sound-output">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="speakers">Speakers</SelectItem>
                            <SelectItem value="headphones">
                              Headphones
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="microphone">Microphone</Label>
                        <Select>
                          <SelectTrigger id="microphone">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="built-in">
                              Built-in Microphone
                            </SelectItem>
                            <SelectItem value="external">
                              External Microphone
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button variant="destructive" size="icon">
              <PhoneOff className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="chat">
              <CardHeader>
                <CardTitle>Session Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full pr-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${message.sender === "You" ? "justify-end" : ""}`}
                    >
                      {message.sender !== "You" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt={message.sender}
                          />
                          <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-2 max-w-[70%] ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button size="icon" onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </TabsContent>
            <TabsContent value="participants">
              <CardHeader>
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src="/placeholder-mentor.jpg"
                            alt="You"
                          />
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">You (Mentor)</p>
                          <p className="text-sm text-muted-foreground">Host</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src="/placeholder-student.jpg"
                            alt="John Doe"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe (Student)</p>
                          <p className="text-sm text-muted-foreground">
                            Participant
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MicOff className="h-4 w-4 mr-2" />
                          Mute
                        </Button>
                        <Button variant="outline" size="sm">
                          <VideoOff className="h-4 w-4 mr-2" />
                          Stop Video
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <h4 className="font-medium mb-2">Raised Hands</h4>
                  {raisedHands.length > 0 ? (
                    raisedHands.map((hand) => (
                      <div
                        key={hand.id}
                        className="flex items-center justify-between mb-2"
                      >
                        <span>{hand.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRaisedHand(hand.id)}
                        >
                          Address
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No raised hands
                    </p>
                  )}
                </div>
              </CardFooter>
            </TabsContent>
            <TabsContent value="notes">
              <CardHeader>
                <CardTitle>Session Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <textarea
                    className="w-full h-full p-2 bg-muted rounded-md"
                    placeholder="Take notes during the session..."
                  />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
