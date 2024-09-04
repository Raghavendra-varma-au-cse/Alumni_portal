"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

export default function CustomizationPage() {
  const [primaryColor, setPrimaryColor] = useState('#007bff')
  const [fontSize, setFontSize] = useState(16)
  const [darkMode, setDarkMode] = useState(false)

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving customization settings...')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Customize Portal</h1>
      <Tabs defaultValue="theme">
        <TabsList className="mb-4">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Base Font Size</Label>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
                <span>{fontSize}px</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Label htmlFor="dark-mode">Enable Dark Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout Customization</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add layout customization options here */}
              <p>Layout customization options go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Customization</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add content customization options here */}
              <p>Content customization options go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}