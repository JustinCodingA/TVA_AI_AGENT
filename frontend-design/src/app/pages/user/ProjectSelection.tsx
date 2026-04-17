import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Lightbulb, Target, CheckCircle, Building2, AlertCircle, Check, X, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

interface InvestCriterion {
  name: string;
  letter: string;
  compliant: boolean;
  comment: string;
}

export function ProjectSelection() {
  const [selectedProject, setSelectedProject] = useState("");
  const [areaPath, setAreaPath] = useState("");
  const [selectedEpic, setSelectedEpic] = useState("");
  const [tags, setTags] = useState("");
  const [analysisResults, setAnalysisResults] = useState<InvestCriterion[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockProjects = [
    "TVA-PowerGrid",
    "TVA-CustomerPortal",
    "TVA-Analytics",
    "TVA-Infrastructure",
    "PowerGrid-Monitoring",
    "Grid-Optimization",
    "Energy-Distribution",
    "IT-Modernization",
    "Cloud-Migration",
    "Security-Enhancement",
    "Customer-Portal-v2",
    "Billing-System",
    "Support-Platform",
  ];

  const mockEpics: Record<string, string[]> = {
    "TVA-PowerGrid": [
      "Real-time Grid Monitoring System",
      "Predictive Maintenance Platform",
      "Load Balancing Optimization",
      "SCADA Integration Phase 2",
    ],
    "TVA-CustomerPortal": [
      "Customer Self-Service Portal",
      "Mobile App Development",
      "Billing & Payment Modernization",
      "Energy Usage Analytics",
    ],
    "TVA-Analytics": [
      "Data Warehouse Migration",
      "BI Dashboard Enhancement",
      "Machine Learning Integration",
      "Real-time Reporting System",
    ],
    "TVA-Infrastructure": [
      "Cloud Infrastructure Setup",
      "Network Security Upgrade",
      "Database Optimization",
      "Disaster Recovery Planning",
    ],
    "PowerGrid-Monitoring": [
      "Real-time Monitoring Dashboard",
      "Alert System Enhancement",
      "Data Collection Optimization",
    ],
    "Grid-Optimization": [
      "Load Balancing Algorithm",
      "Efficiency Improvements",
      "Automated Response System",
    ],
    "Energy-Distribution": [
      "Distribution Network Upgrade",
      "Smart Meter Integration",
      "Outage Management System",
    ],
    "IT-Modernization": [
      "Legacy System Migration",
      "API Gateway Implementation",
      "Microservices Architecture",
    ],
    "Cloud-Migration": [
      "Azure Infrastructure Setup",
      "Data Migration Phase 1",
      "Application Containerization",
    ],
    "Security-Enhancement": [
      "Identity Management System",
      "Security Audit Framework",
      "Compliance Automation",
    ],
    "Customer-Portal-v2": [
      "User Interface Redesign",
      "Account Management Features",
      "Notification System",
    ],
    "Billing-System": [
      "Payment Gateway Integration",
      "Billing Automation",
      "Invoice Management",
    ],
    "Support-Platform": [
      "Ticketing System",
      "Knowledge Base",
      "Live Chat Integration",
    ],
  };

  const getAvailableEpics = () => {
    if (!selectedProject) return [];
    return mockEpics[selectedProject] || [];
  };

  const analyzeInvestCompliance = (): InvestCriterion[] => {
    const results: InvestCriterion[] = [];

    // Independent - Check if area path shows clear organizational structure
    const hasStructuredPath = areaPath.includes("\\") || areaPath.includes("/");
    const pathDepth = areaPath.split(/[\\\/]/).length;
    results.push({
      name: "Independent",
      letter: "I",
      compliant: hasStructuredPath && pathDepth >= 2,
      comment: hasStructuredPath && pathDepth >= 2
        ? "Area path shows clear organizational hierarchy, indicating proper separation of concerns."
        : "Area path should include organizational hierarchy (e.g., TVA\\PowerGrid\\Monitoring) to ensure work items can be developed independently."
    });

    // Negotiable - Check if project and epic combination allows for flexibility
    const epicName = selectedEpic.toLowerCase();
    const hasPhaseOrVersion = /phase|v\d|version|iteration/.test(epicName);
    results.push({
      name: "Negotiable",
      letter: "N",
      compliant: hasPhaseOrVersion || epicName.includes("enhancement") || epicName.includes("optimization"),
      comment: hasPhaseOrVersion || epicName.includes("enhancement") || epicName.includes("optimization")
        ? "Epic indicates iterative development, suggesting flexibility in implementation details."
        : "Consider choosing epics that allow for negotiation on implementation details rather than fixed deliverables."
    });

    // Valuable - Check if epic and project alignment shows business value
    const hasBusinessFocusedEpic = /customer|user|service|portal|billing|support|analytics/.test(epicName);
    results.push({
      name: "Valuable",
      letter: "V",
      compliant: hasBusinessFocusedEpic,
      comment: hasBusinessFocusedEpic
        ? "Epic clearly connects to business outcomes and user value."
        : "Epic should clearly demonstrate business value. Consider emphasizing customer or operational benefits."
    });

    // Estimable - Check if scope seems reasonable
    const hasClearScope = epicName.split(" ").length >= 2 && epicName.split(" ").length <= 6;
    results.push({
      name: "Estimable",
      letter: "E",
      compliant: hasClearScope,
      comment: hasClearScope
        ? "Epic name suggests well-defined scope that can be estimated by the development team."
        : "Epic scope should be clear enough to estimate. Consider breaking down vague or overly broad epics."
    });

    // Small - Check if tags and structure suggest manageable size
    const tagCount = tags ? tags.split(",").map(t => t.trim()).filter(t => t.length > 0).length : 0;
    const hasReasonableTags = tagCount > 0 && tagCount <= 5;
    results.push({
      name: "Small",
      letter: "S",
      compliant: hasReasonableTags || tagCount === 0,
      comment: hasReasonableTags
        ? "Appropriate number of tags suggests focused, manageable work scope."
        : tagCount > 5
        ? "Too many tags may indicate the work item is trying to address too many concerns. Consider splitting it."
        : "Consider adding tags to help scope and categorize the work item appropriately."
    });

    // Testable - Check if structure supports testing
    const hasTestableIndicators = /test|qa|validation|verification/.test(tags.toLowerCase()) || 
                                   /system|platform|integration/.test(epicName);
    results.push({
      name: "Testable",
      letter: "T",
      compliant: hasTestableIndicators || hasStructuredPath,
      comment: hasTestableIndicators
        ? "Work item structure includes testability indicators such as system integration or quality validation."
        : "Ensure work items will have clear acceptance criteria. Consider adding tags like 'testing', 'qa', or defining validation requirements."
    });

    return results;
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      const results = analyzeInvestCompliance();
      setAnalysisResults(results);
      setIsAnalyzing(false);
    }, 1500);
  };

  const isFormComplete = selectedProject && areaPath && selectedEpic;
  const allCompliant = analysisResults?.every(r => r.compliant) ?? false;
  const compliantCount = analysisResults?.filter(r => r.compliant).length ?? 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Tennessee Valley Authority INVEST Criteria Validator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create high-quality user stories, epics, and features with AI-powered guidance.
          Our assistant ensures your work items meet INVEST criteria for better project outcomes.
        </p>
      </div>

      {/* Project Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="size-5" />
            Configure Your Work Item
          </CardTitle>
          <CardDescription>
            Select your project details to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="project">
              Project *
            </Label>
            <Select 
              value={selectedProject} 
              onValueChange={(value) => {
                setSelectedProject(value);
                setSelectedEpic("");
                setAnalysisResults(null);
              }}
            >
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project..." />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Path */}
          <div className="space-y-2">
            <Label htmlFor="area-path">
              Area Path *
            </Label>
            <Input
              id="area-path"
              placeholder="e.g., TVA\PowerGrid\Monitoring or Project\Team\Component"
              value={areaPath}
              onChange={(e) => {
                setAreaPath(e.target.value);
                setAnalysisResults(null);
              }}
              disabled={!selectedProject}
            />
            <p className="text-xs text-muted-foreground">
              Enter the area path where this work item should be organized
            </p>
          </div>

          {/* Epic Selection */}
          <div className="space-y-2">
            <Label htmlFor="epic">
              Epic *
            </Label>
            <Select 
              value={selectedEpic} 
              onValueChange={(value) => {
                setSelectedEpic(value);
                setAnalysisResults(null);
              }}
              disabled={!selectedProject}
            >
              <SelectTrigger id="epic">
                <SelectValue placeholder={selectedProject ? "Select an epic..." : "Select project first"} />
              </SelectTrigger>
              <SelectContent>
                {getAvailableEpics().map((epic) => (
                  <SelectItem key={epic} value={epic}>
                    {epic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!selectedProject && (
              <p className="text-xs text-muted-foreground">
                Select a project to view available epics
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="e.g., frontend, critical, security"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
                setAnalysisResults(null);
              }}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Add multiple tags separated by commas to help categorize this work item
            </p>
          </div>

          <Alert>
            <Lightbulb className="size-4" />
            <AlertTitle>Getting Started</AlertTitle>
            <AlertDescription>
              Fill in all required fields (*) to analyze your work item configuration against INVEST criteria.
            </AlertDescription>
          </Alert>

          <Button 
            onClick={handleAnalyze}
            disabled={!isFormComplete || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="size-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="size-4 mr-2" />
                Analyze INVEST Compliance
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <Card className={allCompliant ? "border-green-200 bg-green-50/50" : "border-yellow-200 bg-yellow-50/50"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {allCompliant ? (
                <CheckCircle className="size-5 text-green-600" />
              ) : (
                <AlertCircle className="size-5 text-yellow-600" />
              )}
              AI Analysis Results
            </CardTitle>
            <CardDescription>
              {allCompliant
                ? "All INVEST criteria are met! This work item is ready for development."
                : `${compliantCount} of 6 INVEST criteria met. Review the feedback below to improve your work item.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResults.map((criterion) => (
              <div
                key={criterion.letter}
                className={`p-4 rounded-lg border-2 ${
                  criterion.compliant
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`size-10 rounded-full ${
                    criterion.compliant ? "bg-green-600" : "bg-red-600"
                  } text-white flex items-center justify-center font-bold flex-shrink-0`}>
                    {criterion.letter}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{criterion.name}</h3>
                      {criterion.compliant ? (
                        <div className="flex items-center gap-1 text-green-700 text-sm font-medium">
                          <Check className="size-4" />
                          Compliant
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-700 text-sm font-medium">
                          <X className="size-4" />
                          Not Compliant
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{criterion.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* INVEST Overview */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="size-5 text-blue-600" />
            What is INVEST?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            INVEST is a set of criteria that helps create effective user stories. Our AI Assistant will evaluate your work items against these six principles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { letter: "I", name: "Independent", desc: "Can be developed separately" },
              { letter: "N", name: "Negotiable", desc: "Details can be discussed" },
              { letter: "V", name: "Valuable", desc: "Provides clear business value" },
              { letter: "E", name: "Estimable", desc: "Can be sized accurately" },
              { letter: "S", name: "Small", desc: "Fits within a sprint" },
              { letter: "T", name: "Testable", desc: "Has clear acceptance criteria" },
            ].map((item) => (
              <div key={item.letter} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.letter}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: CheckCircle,
            title: "Instant Feedback",
            description: "Get real-time AI analysis as you configure"
          },
          {
            icon: Lightbulb,
            title: "Smart Suggestions",
            description: "Receive actionable improvement recommendations"
          },
          {
            icon: Target,
            title: "Quality Assurance",
            description: "Ensure all work items meet INVEST standards"
          },
        ].map((benefit) => (
          <Card key={benefit.title} className="text-center">
            <CardContent className="pt-6">
              <benefit.icon className="size-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}