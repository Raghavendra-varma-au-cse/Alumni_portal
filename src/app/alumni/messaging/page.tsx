"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Hash,
  AtSign,
  Users,
  Settings,
  PlusCircle,
  Send,
  Paperclip,
  Smile,
  Bell,
  Search,
  Video,
  Phone,
  Mic,
  Headphones,
  UserPlus,
  MoreVertical,
  Pin,
  Trash2,
  Edit,
  Flag,
  Lock,
} from "lucide-react";

// Mock data (in a real app, this would come from an API)
const currentUser = {
  id: "1",
  name: "John Doe",
  avatar: "/placeholder-avatar-1.jpg",
  status: "online",
  role: "admin",
};

const channels = [
  { id: "1", name: "general", type: "text", isPrivate: false },
  { id: "2", name: "job-opportunities", type: "text", isPrivate: false },
  { id: "3", name: "alumni-events", type: "text", isPrivate: false },
  { id: "4", name: "voice-lounge", type: "voice", isPrivate: false },
  { id: "5", name: "admin-only", type: "text", isPrivate: true },
];

const directMessages = [
  {
    id: "2",
    name: "Jane Smith",
    avatar: "/placeholder-avatar-2.jpg",
    status: "online",
    role: "moderator",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar: "/placeholder-avatar-3.jpg",
    status: "offline",
    role: "member",
  },
  {
    id: "4",
    name: "Alice Williams",
    avatar: "/placeholder-avatar-4.jpg",
    status: "idle",
    role: "member",
  },
];

const initialMessages = [
  {
    id: "1",
    userId: "2",
    content: "Hey everyone! Excited to connect with fellow alumni!",
    timestamp: "2023-06-15T10:30:00Z",
    reactions: [{ emoji: "👍", count: 2 }],
  },
  {
    id: "2",
    userId: "3",
    content: "Welcome! It's great to see so many familiar faces here.",
    timestamp: "2023-06-15T10:35:00Z",
    reactions: [],
  },
  {
    id: "3",
    userId: "1",
    content:
      "Thanks for the warm welcome! Looking forward to catching up with everyone.",
    timestamp: "2023-06-15T10:40:00Z",
    reactions: [{ emoji: "❤️", count: 1 }],
  },
];

export default function MessagingPage() {
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        userId: currentUser.id,
        content: messageInput,
        timestamp: new Date().toISOString(),
        reactions: [],
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
      // In a real app, you'd send this message to your backend here
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleReaction = (messageId, emoji) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions: [...msg.reactions, { emoji, count: 1 }] }
          : msg,
      ),
    );
    // In a real app, you'd update this reaction in your backend
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId),
    );
    toast({ title: "Message deleted" });
    // In a real app, you'd delete this message from your backend
  };

  const handleEditMessage = (messageId, newContent) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, content: newContent } : msg,
      ),
    );
    toast({ title: "Message edited" });
    // In a real app, you'd update this message in your backend
  };

  const handlePinMessage = (messageId) => {
    toast({ title: "Message pinned" });
    // In a real app, you'd update the message's pinned status in your backend
  };

  const handleFlagMessage = (messageId) => {
    toast({ title: "Message flagged for review" });
    // In a real app, you'd send a report to moderators
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-muted flex flex-col">
        {/* Server name and settings */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Alumni Network</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/alumni/messaging/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <Separator />
        {/* Channels */}
        <ScrollArea className="flex-grow">
          <div className="p-2">
            <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
              Channels
            </h3>
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={
                  activeChannel.id === channel.id ? "secondary" : "ghost"
                }
                className="w-full justify-start mb-1"
                onClick={() => setActiveChannel(channel)}
              >
                {channel.type === "text" ? (
                  <Hash className="mr-2 h-4 w-4" />
                ) : (
                  <Users className="mr-2 h-4 w-4" />
                )}
                {channel.name}
                {channel.isPrivate && <Lock className="ml-auto h-4 w-4" />}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => router.push("/alumni/messaging/create-channel")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Channel
            </Button>
          </div>
          <Separator className="my-2" />
          {/* Direct Messages */}
          <div className="p-2">
            <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
              Direct Messages
            </h3>
            {directMessages.map((dm) => (
              <Button
                key={dm.id}
                variant="ghost"
                className="w-full justify-start mb-1"
                onClick={() => setActiveChannel(dm)}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={dm.avatar} alt={dm.name} />
                  <AvatarFallback>
                    {dm.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {dm.name}
                <span
                  className={`ml-auto h-2 w-2 rounded-full ${
                    dm.status === "online"
                      ? "bg-green-500"
                      : dm.status === "idle"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                  }`}
                />
              </Button>
            ))}
          </div>
        </ScrollArea>
        {/* User info */}
        <div className="p-4 bg-background flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">
              {currentUser.status}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/alumni/messaging/profile")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-grow flex flex-col">
        {/* Channel header */}
        <div className="p-4 bg-background flex justify-between items-center border-b">
          <div className="flex items-center">
            {activeChannel.type === "text" ? (
              <Hash className="mr-2 h-5 w-5" />
            ) : (
              <AtSign className="mr-2 h-5 w-5" />
            )}
            <h2 className="text-lg font-semibold">{activeChannel.name}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                router.push(`/alumni/messaging/members/${activeChannel.id}`)
              }
            >
              <Users className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8 w-40" placeholder="Search" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => {
            const sender =
              directMessages.find((dm) => dm.id === message.userId) ||
              currentUser;
            return (
              <div key={message.id} className="mb-4 group">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={sender.avatar} alt={sender.name} />
                    <AvatarFallback>
                      {sender.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">
                      {sender.name}{" "}
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </p>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center mt-1">
                      {message.reactions.map((reaction, index) => (
                        <Badge key={index} variant="secondary" className="mr-1">
                          {reaction.emoji} {reaction.count}
                        </Badge>
                      ))}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <Smile className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <div className="grid grid-cols-6 gap-2 p-2">
                            {["👍", "❤️", "😂", "😮", "😢", "😡"].map(
                              (emoji) => (
                                <Button
                                  key={emoji}
                                  variant="ghost"
                                  className="text-lg"
                                  onClick={() =>
                                    handleReaction(message.id, emoji)
                                  }
                                >
                                  {emoji}
                                </Button>
                              ),
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePinMessage(message.id)}
                    >
                      <Pin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleEditMessage(message.id, "Edited message content")
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFlagMessage(message.id)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Message input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-background border-t flex items-center space-x-2"
        >
          <Button type="button" variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Message #${activeChannel.name}`}
            className="flex-grow"
          />
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
