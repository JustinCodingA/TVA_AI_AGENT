import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Save, Key, Database, Bell, Zap } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const [autoValidation, setAutoValidation] = useState(true);
  const [autoGeneration, setAutoGeneration] = useState(true);
  const [autoPush, setAutoPush] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure Azure DevOps integration and AI Agent behavior
        </p>
      </div>

      <Tabs defaultValue="connection" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connection">Azure Connection</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="validation">Validation Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Azure Connection Tab */}
        <TabsContent value="connection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="size-5" />
                Azure DevOps Connection
              </CardTitle>
              <CardDescription>
                Configure your Azure DevOps organization and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-url">Organization URL</Label>
                <Input 
                  id="org-url" 
                  placeholder="https://dev.azure.com/tva"
                  defaultValue="https://dev.azure.com/tva"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">Project Name</Label>
                <Input 
                  id="project" 
                  placeholder="TVA-PowerGrid"
                  defaultValue="TVA-PowerGrid"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pat">Personal Access Token</Label>
                <Input 
                  id="pat" 
                  type="password"
                  placeholder="••••••••••••••••••••"
                  defaultValue="mock_token_12345"
                />
                <p className="text-xs text-muted-foreground">
                  Required scopes: Work Items (Read, Write), Test Management (Read, Write)
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Connection Status</p>
                  <p className="text-sm text-muted-foreground">
                    Last verified: April 1, 2026 at 10:23 AM
                  </p>
                </div>
                <Badge variant="default" className="bg-green-600">Connected</Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Test Connection</Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5" />
                Data Sync Settings
              </CardTitle>
              <CardDescription>
                Configure how work items are pulled and synchronized
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sync-frequency">Sync Frequency</Label>
                <Select defaultValue="15min">
                  <SelectTrigger id="sync-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="30min">Every 30 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-item-types">Work Item Types to Pull</Label>
                <div className="flex gap-2">
                  <Badge>User Story</Badge>
                  <Badge>Epic</Badge>
                  <Badge>Feature</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click to configure which types to include
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area-path">Area Path Filter</Label>
                <Input 
                  id="area-path" 
                  placeholder="TVA\PowerGrid\*"
                  defaultValue="TVA\PowerGrid\*"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="size-5" />
                Automation Rules
              </CardTitle>
              <CardDescription>
                Configure automated workflows and AI Agent behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-validation">Automatic INVEST Validation</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically validate new work items against INVEST criteria
                  </p>
                </div>
                <Switch 
                  id="auto-validation"
                  checked={autoValidation}
                  onCheckedChange={setAutoValidation}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-generation">Automatic Test Case Generation</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate BDD test cases for work items that pass validation
                  </p>
                </div>
                <Switch 
                  id="auto-generation"
                  checked={autoGeneration}
                  onCheckedChange={setAutoGeneration}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-push">Automatic Push to Azure Test Plans</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically push generated test cases without manual review
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">Use with caution</Badge>
                </div>
                <Switch 
                  id="auto-push"
                  checked={autoPush}
                  onCheckedChange={setAutoPush}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="validation-threshold">Validation Pass Threshold</Label>
                <Select defaultValue="100">
                  <SelectTrigger id="validation-threshold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100% (All criteria must pass)</SelectItem>
                    <SelectItem value="83">83% (5 of 6 criteria)</SelectItem>
                    <SelectItem value="67">67% (4 of 6 criteria)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Minimum percentage of INVEST criteria that must pass for auto-processing
                </p>
              </div>

              <Button onClick={handleSaveSettings}>
                <Save className="size-4 mr-2" />
                Save Automation Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Validation Rules Tab */}
        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>INVEST Criteria Weights</CardTitle>
              <CardDescription>
                Customize the importance of each INVEST criterion (future feature)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Independent", "Negotiable", "Valuable", "Estimable", "Small", "Testable"].map((criterion) => (
                <div key={criterion} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{criterion}</Label>
                    <span className="text-sm text-muted-foreground">Standard Weight</span>
                  </div>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-4">
                Custom weighting will be available in a future update. Currently all criteria are equally weighted.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Model Configuration</CardTitle>
              <CardDescription>
                Advanced settings for AI Agent behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confidence">Confidence Threshold</Label>
                <Select defaultValue="high">
                  <SelectTrigger id="confidence">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (90%+)</SelectItem>
                    <SelectItem value="medium">Medium (75%+)</SelectItem>
                    <SelectItem value="low">Low (60%+)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Minimum AI confidence required for automatic decisions
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-scenarios">Test Scenario Depth</Label>
                <Select defaultValue="comprehensive">
                  <SelectTrigger id="test-scenarios">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (1-2 scenarios)</SelectItem>
                    <SelectItem value="standard">Standard (2-4 scenarios)</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive (4-6 scenarios)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what events trigger notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about AI Agent activity
                  </p>
                </div>
                <Switch 
                  id="notifications-enabled"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              {notifications && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Notify me when:</h4>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-validation">INVEST validation completes</Label>
                      <Switch id="notify-validation" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-failure">Validation failures occur</Label>
                      <Switch id="notify-failure" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-generation">Test cases are generated</Label>
                      <Switch id="notify-generation" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-push">Test cases are pushed to Azure</Label>
                      <Switch id="notify-push" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-flags">New flags are raised</Label>
                      <Switch id="notify-flags" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-insights">New AI insights are detected</Label>
                      <Switch id="notify-insights" />
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email">Notification Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your.email@tva.gov"
                  defaultValue="operator@tva.gov"
                />
              </div>

              <Button onClick={handleSaveSettings}>
                <Save className="size-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
