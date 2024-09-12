import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NetworkPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Network</h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-sm"
          type="search"
          placeholder="Search alumni..."
        />
        <Button>Find Connections</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center space-x-4 p-6">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={`https://i.pravatar.cc/150?img=${i + 1}`}
                  alt="Avatar"
                />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-semibold">Alumni Name</h3>
                <p className="text-sm text-gray-500">
                  Software Engineer at Tech Co.
                </p>
                <Button size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
