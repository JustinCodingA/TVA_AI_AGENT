import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Lightbulb,
  ArrowRight,
  Plus,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

interface InvestScore {
  independent: { score: number; feedback: string; suggestions: string[] };
  negotiable: { score: number; feedback: string; suggestions: string[] };
  valuable: { score: number; feedback: string; suggestions: string[] };
  estimable: { score: number; feedback: string; suggestions: string[] };
  small: { score: number; feedback: string; suggestions: string[] };
  testable: { score: number; feedback: string; suggestions: string[] };
}

export function WorkItemCreation() {
  const navigate = useNavigate();
  const [workItemType, setWorkItemType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>([""]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [investScore, setInvestScore] = useState<InvestScore | null>(null);

  const handleAnalyze = () => {
    if (!workItemType || !title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockScore: InvestScore = {
        independent: {
          score: title.toLowerCase().includes("depend") ? 60 : 95,
          feedback: title.toLowerCase().includes("depend") 
            ? "This work item mentions dependencies, which may indicate it's not fully independent."
            : "This work item appears to be independent and can be developed separately.",
          suggestions: title.toLowerCase().includes("depend")
            ? ["Consider breaking dependencies into separate work items", "Review if this can be completed without waiting for other items"]
            : []
        },
        negotiable: {
          score: description.length > 100 ? 90 : 70,
          feedback: description.length > 100
            ? "Good level of detail while leaving room for implementation discussion."
            : "Consider adding more context to allow for negotiation during implementation.",
          suggestions: description.length > 100 ? [] : ["Add more details about the 'why' rather than the 'how'"]
        },
        valuable: {
          score: description.toLowerCase().includes("user") || description.toLowerCase().includes("customer") || description.toLowerCase().includes("business") ? 95 : 65,
          feedback: description.toLowerCase().includes("user") || description.toLowerCase().includes("customer") || description.toLowerCase().includes("business")
            ? "Clear business or user value is articulated."
            : "The business value could be more explicit.",
          suggestions: description.toLowerCase().includes("user") || description.toLowerCase().includes("customer") || description.toLowerCase().includes("business")
            ? []
            : ["Explain why this is valuable to users or the business", "Add context about the problem being solved"]
        },
        estimable: {
          score: description.length > 50 && acceptanceCriteria.filter(ac => ac.trim()).length >= 2 ? 90 : 60,
          feedback: description.length > 50 && acceptanceCriteria.filter(ac => ac.trim()).length >= 2
            ? "Sufficient detail provided for estimation."
            : "More details needed for accurate estimation.",
          suggestions: description.length > 50 && acceptanceCriteria.filter(ac => ac.trim()).length >= 2
            ? []
            : ["Add specific acceptance criteria", "Clarify technical requirements"]
        },
        small: {
          score: description.length < 500 && title.split(" ").length < 15 ? 85 : 55,
          feedback: description.length < 500 && title.split(" ").length < 15
            ? "Scope appears appropriate for completion within a sprint."
            : "This work item may be too large. Consider breaking it down.",
          suggestions: description.length < 500 && title.split(" ").length < 15
            ? []
            : ["Break into smaller, focused work items", "Extract epic or feature elements"]
        },
        testable: {
          score: acceptanceCriteria.filter(ac => ac.trim()).length >= 2 ? 95 : 50,
          feedback: acceptanceCriteria.filter(ac => ac.trim()).length >= 2
            ? "Clear acceptance criteria make this testable."
            : "Add specific acceptance criteria to make this testable.",
          suggestions: acceptanceCriteria.filter(ac => ac.trim()).length >= 2
            ? []
            : ["Add measurable acceptance criteria", "Define clear success conditions", "Use 'Given-When-Then' format"]
        }
      };

      setInvestScore(mockScore);
      setShowAnalysis(true);
      setIsAnalyzing(false);
      toast.success("AI analysis complete!");
    }, 2000);
  };

  const addAcceptanceCriteria = () => {
    setAcceptanceCriteria([...acceptanceCriteria, ""]);
  };

  const removeAcceptanceCriteria = (index: number) => {
    setAcceptanceCriteria(acceptanceCriteria.filter((_, i) => i !== index));
  };

  const updateAcceptanceCriteria = (index: number, value: string) => {
    const updated = [...acceptanceCriteria];
    updated[index] = value;
    setAcceptanceCriteria(updated);
  };

  const calculateOverallScore = () => {
    if (!investScore) return 0;
    const scores = Object.values(investScore).map(item => item.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="size-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="size-5 text-amber-600" />;
    return <XCircle className="size-5 text-red-600" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create Work Item</h1>
        <p className="text-muted-foreground mt-1">
          Enter your user story, epic, or feature details. The AI Assistant will analyze it against INVEST criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Work Item Details</CardTitle>
            <CardDescription>Fill in the information about your work item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Work Item Type *</Label>
              <Select value={workItemType} onValueChange={setWorkItemType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-story">User Story</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder={
                  workItemType === "user-story" 
                    ? "As a [user], I want to [action] so that [benefit]"
                    : workItemType === "epic"
                    ? "High-level initiative or goal"
                    : "Feature name"
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {workItemType === "user-story" && (
                <p className="text-xs text-muted-foreground">
                  Tip: Use the user story format for clarity
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed context, background, and requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                {description.length} characters • Aim for clear, concise descriptions
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Acceptance Criteria</Label>
                <Button variant="outline" size="sm" onClick={addAcceptanceCriteria}>
                  <Plus className="size-4 mr-2" />
                  Add Criteria
                </Button>
              </div>
              <div className="space-y-2">
                {acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Acceptance criteria ${index + 1}...`}
                      value={criteria}
                      onChange={(e) => updateAcceptanceCriteria(index, e.target.value)}
                    />
                    {acceptanceCriteria.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAcceptanceCriteria(index)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Define specific, measurable conditions for completion
              </p>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !workItemType || !title || !description}
              className="w-full"
              size="lg"
            >
              <Sparkles className={`size-4 mr-2 ${isAnalyzing ? "animate-pulse" : ""}`} />
              {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
            </Button>
          </CardContent>
        </Card>

        {/* INVEST Quick Reference */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">INVEST Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { letter: "I", name: "Independent", desc: "Self-contained work" },
                { letter: "N", name: "Negotiable", desc: "Flexible implementation" },
                { letter: "V", name: "Valuable", desc: "Clear business value" },
                { letter: "E", name: "Estimable", desc: "Can be sized" },
                { letter: "S", name: "Small", desc: "Fits in one sprint" },
                { letter: "T", name: "Testable", desc: "Clear success criteria" },
              ].map((item) => (
                <div key={item.letter} className="flex gap-2">
                  <div className="size-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.letter}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Alert>
            <Lightbulb className="size-4" />
            <AlertTitle>Writing Tips</AlertTitle>
            <AlertDescription className="text-xs space-y-1 mt-2">
              <p>• Focus on the user's need, not the solution</p>
              <p>• Keep it simple and focused</p>
              <p>• Include clear acceptance criteria</p>
              <p>• Avoid technical jargon</p>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Analysis Results */}
      {showAnalysis && investScore && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-purple-600" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>INVEST criteria evaluation with suggestions</CardDescription>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(calculateOverallScore())}`}>
                  {calculateOverallScore()}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {Object.entries(investScore).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(value.score)}
                        <span className="font-medium capitalize">{key}</span>
                      </div>
                      <span className={`font-bold ${getScoreColor(value.score)}`}>
                        {value.score}%
                      </span>
                    </div>
                    <Progress value={value.score} className="h-2" />
                    <p className="text-sm text-muted-foreground">{value.feedback}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="detailed" className="space-y-6">
                {Object.entries(investScore).map(([key, value]) => (
                  <Card key={key} className={value.score >= 80 ? "border-green-200" : value.score >= 60 ? "border-amber-200" : "border-red-200"}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base capitalize flex items-center gap-2">
                          {getScoreIcon(value.score)}
                          {key}
                        </CardTitle>
                        <Badge variant={value.score >= 80 ? "default" : value.score >= 60 ? "secondary" : "destructive"}>
                          {value.score}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Analysis</p>
                        <p className="text-sm text-muted-foreground">{value.feedback}</p>
                      </div>
                      
                      {value.suggestions.length > 0 && (
                        <div className={`p-3 rounded-md ${value.score >= 80 ? "bg-green-50" : value.score >= 60 ? "bg-amber-50" : "bg-red-50"}`}>
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Lightbulb className="size-4" />
                            Suggestions for Improvement
                          </p>
                          <ul className="space-y-1">
                            {value.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" className="flex-1" onClick={() => setShowAnalysis(false)}>
                Revise Work Item
              </Button>
              <Button 
                className="flex-1"
                disabled={calculateOverallScore() < 70}
                onClick={() => navigate("/results")}
              >
                {calculateOverallScore() >= 70 ? (
                  <>
                    Submit Work Item
                    <ArrowRight className="size-4 ml-2" />
                  </>
                ) : (
                  "Score too low - Improve first"
                )}
              </Button>
            </div>

            {calculateOverallScore() < 70 && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="size-4" />
                <AlertTitle>Action Required</AlertTitle>
                <AlertDescription>
                  Your work item needs improvement before submission. Review the suggestions above and revise your work item to meet INVEST criteria.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
