import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Textarea } from "../components/ui/textarea";
import { 
  FileCode, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Copy,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface TestCase {
  id: string;
  workItemId: string;
  workItemTitle: string;
  feature: string;
  scenarios: Scenario[];
  status: "Generated" | "Pushed" | "Error";
  errorMessage?: string;
}

interface Scenario {
  name: string;
  given: string[];
  when: string[];
  then: string[];
}

export function TestGeneration() {
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  const mockTestCases: TestCase[] = [
    {
      id: "TC-001",
      workItemId: "1234",
      workItemTitle: "As a TVA operator, I want to view real-time power grid status",
      feature: "Real-time Power Grid Monitoring",
      status: "Generated",
      scenarios: [
        {
          name: "Operator views current grid status",
          given: [
            "the operator is logged into the system",
            "the power grid monitoring dashboard is available",
          ],
          when: [
            "the operator navigates to the grid status page",
          ],
          then: [
            "the system displays real-time power grid data",
            "all grid zones are visible on the map",
            "current load levels are shown for each zone",
            "the data is updated every 5 seconds",
          ],
        },
        {
          name: "Grid status updates automatically",
          given: [
            "the operator is viewing the grid status page",
            "real-time data streaming is enabled",
          ],
          when: [
            "grid conditions change",
          ],
          then: [
            "the dashboard automatically refreshes",
            "updated values are displayed without manual refresh",
            "a visual indicator shows the last update timestamp",
          ],
        },
      ],
    },
    {
      id: "TC-002",
      workItemId: "1236",
      workItemTitle: "Automated Alert System for Grid Anomalies",
      feature: "Grid Anomaly Detection and Alerting",
      status: "Generated",
      scenarios: [
        {
          name: "System detects grid anomaly",
          given: [
            "the anomaly detection system is running",
            "grid sensors are operational",
          ],
          when: [
            "a power fluctuation exceeds normal thresholds",
          ],
          then: [
            "an alert is generated within 2 seconds",
            "the alert is sent to on-duty operators",
            "the alert includes anomaly details and location",
          ],
        },
      ],
    },
    {
      id: "TC-003",
      workItemId: "1237",
      workItemTitle: "As a manager, I want to generate monthly performance reports",
      feature: "Performance Reporting",
      status: "Error",
      errorMessage: "Missing required fields: Report format specification, data source definitions. Cannot generate comprehensive test cases without complete acceptance criteria.",
      scenarios: [],
    },
  ];

  const handleGenerateTests = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Generated 5 new test cases in BDD format");
    }, 3000);
  };

  const handlePushToAzure = (testCase: TestCase) => {
    if (testCase.status === "Error") {
      toast.error("Cannot push test case with errors");
      return;
    }
    
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      toast.success(`Test case ${testCase.id} pushed to Azure Test Plans`);
    }, 2000);
  };

  const handleCopyGherkin = (testCase: TestCase) => {
    const gherkin = generateGherkinText(testCase);
    navigator.clipboard.writeText(gherkin);
    toast.success("Gherkin syntax copied to clipboard");
  };

  const generateGherkinText = (testCase: TestCase): string => {
    let gherkin = `Feature: ${testCase.feature}\n\n`;
    
    testCase.scenarios.forEach((scenario) => {
      gherkin += `  Scenario: ${scenario.name}\n`;
      scenario.given.forEach((step) => {
        gherkin += `    Given ${step}\n`;
      });
      scenario.when.forEach((step) => {
        gherkin += `    When ${step}\n`;
      });
      scenario.then.forEach((step) => {
        gherkin += `    Then ${step}\n`;
      });
      gherkin += `\n`;
    });
    
    return gherkin;
  };

  const generatedCount = mockTestCases.filter(t => t.status === "Generated").length;
  const pushedCount = mockTestCases.filter(t => t.status === "Pushed").length;
  const errorCount = mockTestCases.filter(t => t.status === "Error").length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Test Generation</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered BDD test case generation in Gherkin format
          </p>
        </div>
        <Button onClick={handleGenerateTests} disabled={isGenerating}>
          <Sparkles className={`size-4 mr-2 ${isGenerating ? "animate-pulse" : ""}`} />
          {isGenerating ? "Generating..." : "Generate Test Cases"}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Generated
            </CardTitle>
            <FileCode className="size-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{generatedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to push</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pushed to Azure
            </CardTitle>
            <CheckCircle className="size-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pushedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">In Test Plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Errors
            </CardTitle>
            <XCircle className="size-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{errorCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Cases List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Generated Test Cases</CardTitle>
            <CardDescription>Select to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {mockTestCases.map((testCase) => (
                  <button
                    key={testCase.id}
                    onClick={() => setSelectedTest(testCase)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedTest?.id === testCase.id
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-mono text-sm font-medium">{testCase.id}</span>
                      <Badge variant={
                        testCase.status === "Generated" ? "default" :
                        testCase.status === "Pushed" ? "secondary" :
                        "destructive"
                      }>
                        {testCase.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium line-clamp-2 mb-1">{testCase.feature}</p>
                    <p className="text-xs text-muted-foreground">
                      Work Item: {testCase.workItemId}
                    </p>
                    {testCase.scenarios.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {testCase.scenarios.length} scenario{testCase.scenarios.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Test Case Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Test Case Details</CardTitle>
            <CardDescription>
              {selectedTest ? `${selectedTest.id} - ${selectedTest.feature}` : "Select a test case to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTest ? (
              <div className="space-y-6">
                {/* Error Message */}
                {selectedTest.status === "Error" && selectedTest.errorMessage && (
                  <Alert variant="destructive">
                    <AlertTriangle className="size-4" />
                    <AlertDescription>
                      <strong>Error:</strong> {selectedTest.errorMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Work Item Info */}
                <div>
                  <h3 className="font-semibold mb-2">Source Work Item</h3>
                  <div className="bg-accent p-3 rounded-md text-sm">
                    <p className="font-medium">#{selectedTest.workItemId}</p>
                    <p className="text-muted-foreground mt-1">{selectedTest.workItemTitle}</p>
                  </div>
                </div>

                {/* Gherkin/BDD View */}
                {selectedTest.scenarios.length > 0 && (
                  <Tabs defaultValue="formatted" className="w-full">
                    <TabsList>
                      <TabsTrigger value="formatted">Formatted View</TabsTrigger>
                      <TabsTrigger value="gherkin">Gherkin Syntax</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="formatted" className="space-y-4">
                      <div className="space-y-4">
                        {selectedTest.scenarios.map((scenario, idx) => (
                          <Card key={idx}>
                            <CardHeader>
                              <CardTitle className="text-base">
                                Scenario: {scenario.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-blue-600 mb-2">Given</p>
                                <ul className="space-y-1 ml-4">
                                  {scenario.given.map((step, i) => (
                                    <li key={i} className="text-sm text-muted-foreground">
                                      • {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-purple-600 mb-2">When</p>
                                <ul className="space-y-1 ml-4">
                                  {scenario.when.map((step, i) => (
                                    <li key={i} className="text-sm text-muted-foreground">
                                      • {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-green-600 mb-2">Then</p>
                                <ul className="space-y-1 ml-4">
                                  {scenario.then.map((step, i) => (
                                    <li key={i} className="text-sm text-muted-foreground">
                                      • {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="gherkin">
                      <div className="relative">
                        <Textarea
                          value={generateGherkinText(selectedTest)}
                          readOnly
                          className="font-mono text-sm h-[400px]"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => handleCopyGherkin(selectedTest)}
                        >
                          <Copy className="size-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  {selectedTest.status === "Generated" && (
                    <>
                      <Button 
                        className="flex-1"
                        onClick={() => handlePushToAzure(selectedTest)}
                        disabled={isPushing}
                      >
                        <Upload className="size-4 mr-2" />
                        {isPushing ? "Pushing..." : "Push to Azure Test Plans"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleCopyGherkin(selectedTest)}
                      >
                        <Copy className="size-4 mr-2" />
                        Copy
                      </Button>
                    </>
                  )}
                  {selectedTest.status === "Error" && (
                    <Button variant="outline" className="flex-1">
                      Return to Work Items for Review
                    </Button>
                  )}
                  {selectedTest.status === "Pushed" && (
                    <div className="flex-1 flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="size-5" />
                      <span className="font-medium">Successfully pushed to Azure Test Plans</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <FileCode className="size-12 mx-auto mb-4 opacity-50" />
                  <p>Select a test case from the list to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
