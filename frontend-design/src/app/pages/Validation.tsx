import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { CheckCircle, XCircle, AlertCircle, Play, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface InvestCriteria {
  name: string;
  description: string;
  passed: boolean;
  details: string;
}

interface ValidationResult {
  id: string;
  title: string;
  type: string;
  overallScore: number;
  criteria: InvestCriteria[];
}

export function Validation() {
  const [selectedItem, setSelectedItem] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const mockValidationResults: ValidationResult[] = [
    {
      id: "1234",
      title: "As a TVA operator, I want to view real-time power grid status",
      type: "User Story",
      overallScore: 100,
      criteria: [
        {
          name: "Independent",
          description: "Can be developed independently of other stories",
          passed: true,
          details: "Story has no dependencies on other work items and can be completed in isolation.",
        },
        {
          name: "Negotiable",
          description: "Details can be negotiated during development",
          passed: true,
          details: "Story provides flexibility in implementation details while maintaining clear goals.",
        },
        {
          name: "Valuable",
          description: "Provides value to the user or business",
          passed: true,
          details: "Clear business value: enables operators to monitor grid status in real-time.",
        },
        {
          name: "Estimable",
          description: "Can be estimated for effort",
          passed: true,
          details: "Story is well-defined with clear acceptance criteria allowing accurate estimation.",
        },
        {
          name: "Small",
          description: "Small enough to be completed in one sprint",
          passed: true,
          details: "Estimated at 5 story points, fits within 2-week sprint.",
        },
        {
          name: "Testable",
          description: "Can be tested with clear success criteria",
          passed: true,
          details: "Acceptance criteria clearly define testable outcomes.",
        },
      ],
    },
    {
      id: "1237",
      title: "As a manager, I want to generate monthly performance reports",
      type: "User Story",
      overallScore: 67,
      criteria: [
        {
          name: "Independent",
          description: "Can be developed independently of other stories",
          passed: true,
          details: "Story can be developed independently.",
        },
        {
          name: "Negotiable",
          description: "Details can be negotiated during development",
          passed: true,
          details: "Implementation details are flexible.",
        },
        {
          name: "Valuable",
          description: "Provides value to the user or business",
          passed: true,
          details: "Provides reporting capabilities for management.",
        },
        {
          name: "Estimable",
          description: "Can be estimated for effort",
          passed: false,
          details: "Missing key details about report format, data sources, and complexity. Cannot accurately estimate effort.",
        },
        {
          name: "Small",
          description: "Small enough to be completed in one sprint",
          passed: true,
          details: "Appears to be appropriately scoped.",
        },
        {
          name: "Testable",
          description: "Can be tested with clear success criteria",
          passed: false,
          details: "Acceptance criteria are vague. Need specific requirements for report content and format.",
        },
      ],
    },
  ];

  const handleRunValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      toast.success("INVEST validation completed for 8 work items");
      if (mockValidationResults.length > 0) {
        setSelectedItem(mockValidationResults[0]);
      }
    }, 3000);
  };

  const passedCount = mockValidationResults.filter(r => r.overallScore === 100).length;
  const failedCount = mockValidationResults.filter(r => r.overallScore < 100).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">INVEST Validation</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered validation of user stories against INVEST criteria
          </p>
        </div>
        <Button onClick={handleRunValidation} disabled={isValidating}>
          <Play className={`size-4 mr-2 ${isValidating ? "animate-pulse" : ""}`} />
          {isValidating ? "Validating..." : "Run Validation"}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Validated
            </CardTitle>
            <CheckCircle className="size-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockValidationResults.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Work items analyzed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Passed
            </CardTitle>
            <CheckCircle className="size-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{passedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">All criteria met</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed
            </CardTitle>
            <XCircle className="size-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{failedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validation Results List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Validation Results</CardTitle>
            <CardDescription>Select an item to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-3">
                {mockValidationResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => setSelectedItem(result)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedItem?.id === result.id
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {result.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {result.overallScore === 100 ? (
                          <CheckCircle className="size-4 text-green-600" />
                        ) : (
                          <XCircle className="size-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium">{result.overallScore}%</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium line-clamp-2">{result.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">ID: {result.id}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Detailed View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Validation Details</CardTitle>
            <CardDescription>
              {selectedItem ? `${selectedItem.type} #${selectedItem.id}` : "Select an item to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedItem ? (
              <div className="space-y-6">
                {/* Story Title */}
                <div>
                  <h3 className="font-semibold mb-2">Story Title</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.title}</p>
                </div>

                {/* Overall Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Overall INVEST Score</h3>
                    <span className="text-2xl font-bold">{selectedItem.overallScore}%</span>
                  </div>
                  <Progress value={selectedItem.overallScore} className="h-3" />
                </div>

                {/* Criteria Details */}
                <div>
                  <h3 className="font-semibold mb-4">INVEST Criteria Breakdown</h3>
                  <div className="space-y-4">
                    {selectedItem.criteria.map((criterion) => (
                      <Card key={criterion.name} className={criterion.passed ? "border-green-200" : "border-red-200"}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {criterion.passed ? (
                                <CheckCircle className="size-5 text-green-600" />
                              ) : (
                                <XCircle className="size-5 text-red-600" />
                              )}
                              <CardTitle className="text-base">{criterion.name}</CardTitle>
                            </div>
                            <Badge variant={criterion.passed ? "default" : "destructive"}>
                              {criterion.passed ? "Passed" : "Failed"}
                            </Badge>
                          </div>
                          <CardDescription className="mt-2">{criterion.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className={`text-sm p-3 rounded-md ${
                            criterion.passed ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                          }`}>
                            {criterion.details}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  {selectedItem.overallScore === 100 ? (
                    <Button className="flex-1">
                      Proceed to Test Generation <ArrowRight className="size-4 ml-2" />
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1">
                        Export Issues Report
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Send for Review
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <AlertCircle className="size-12 mx-auto mb-4 opacity-50" />
                  <p>Select a work item from the list to view validation details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
