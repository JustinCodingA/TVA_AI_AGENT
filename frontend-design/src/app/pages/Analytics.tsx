import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export function Analytics() {
  const investValidationData = [
    { name: "Independent", passed: 42, failed: 8 },
    { name: "Negotiable", passed: 45, failed: 5 },
    { name: "Valuable", passed: 48, failed: 2 },
    { name: "Estimable", passed: 35, failed: 15 },
    { name: "Small", passed: 40, failed: 10 },
    { name: "Testable", passed: 38, failed: 12 },
  ];

  const timelineData = [
    { month: "Oct", workItems: 45, testCases: 78, validated: 38 },
    { month: "Nov", workItems: 52, testCases: 89, validated: 44 },
    { month: "Dec", workItems: 48, testCases: 82, validated: 40 },
    { month: "Jan", workItems: 58, testCases: 98, validated: 49 },
    { month: "Feb", workItems: 63, testCases: 107, validated: 53 },
    { month: "Mar", workItems: 70, testCases: 118, validated: 59 },
  ];

  const workItemTypeData = [
    { name: "User Stories", value: 142, color: "#3b82f6" },
    { name: "Epics", value: 38, color: "#8b5cf6" },
    { name: "Features", value: 67, color: "#10b981" },
  ];

  const aiFindings = [
    {
      id: 1,
      severity: "high",
      title: "Recurring INVEST Failure Pattern",
      description: "15 user stories in the 'Customer Portal' epic consistently fail the 'Estimable' criteria. Common issue: Missing acceptance criteria detail.",
      recommendation: "Create a template for acceptance criteria to ensure completeness.",
      impact: "Affecting 30% of stories in this epic",
    },
    {
      id: 2,
      severity: "medium",
      title: "Test Case Generation Efficiency",
      description: "Stories with well-defined acceptance criteria generate 40% more comprehensive test scenarios.",
      recommendation: "Prioritize improving story quality before test generation.",
      impact: "Could increase test coverage by 25%",
    },
    {
      id: 3,
      severity: "medium",
      title: "Sprint Velocity Correlation",
      description: "Teams working with INVEST-validated stories show 35% higher sprint completion rates.",
      recommendation: "Make INVEST validation mandatory before sprint planning.",
      impact: "Potential 15% increase in delivery speed",
    },
    {
      id: 4,
      severity: "low",
      title: "Dependency Detection",
      description: "AI identified 8 stories marked as 'Independent' that have implicit dependencies on infrastructure work.",
      recommendation: "Review and add proper dependencies in Azure DevOps.",
      impact: "Prevents potential sprint blockers",
    },
  ];

  const flags = [
    {
      id: 1,
      workItemId: "1245",
      title: "Data Visualization Dashboard",
      issue: "Story has grown too large (estimated 21 points)",
      type: "size",
      raisedAt: "2026-04-01 09:23",
    },
    {
      id: 2,
      workItemId: "1267",
      title: "Legacy System Integration",
      issue: "Missing testable acceptance criteria",
      type: "testability",
      raisedAt: "2026-04-01 08:45",
    },
    {
      id: 3,
      workItemId: "1289",
      title: "Performance Optimization",
      issue: "Vague requirements - not estimable",
      type: "estimability",
      raisedAt: "2026-03-31 16:30",
    },
    {
      id: 4,
      workItemId: "1302",
      title: "Security Audit Implementation",
      issue: "Strong dependencies on 3 other stories",
      type: "independence",
      raisedAt: "2026-03-31 14:12",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Analytics & AI Findings</h1>
        <p className="text-muted-foreground mt-1">
          Insights and patterns detected by the AI Agent
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success Rate
            </CardTitle>
            <TrendingUp className="size-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76%</div>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Processing Time
            </CardTitle>
            <Clock className="size-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4s</div>
            <p className="text-xs text-green-600 mt-1">-0.3s improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Test Coverage
            </CardTitle>
            <Target className="size-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89%</div>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Flags
            </CardTitle>
            <AlertTriangle className="size-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{flags.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="charts">Visual Analytics</TabsTrigger>
          <TabsTrigger value="flags">Flags</TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="space-y-4">
            {aiFindings.map((finding) => (
              <Alert 
                key={finding.id}
                className={
                  finding.severity === "high" ? "border-red-200 bg-red-50" :
                  finding.severity === "medium" ? "border-amber-200 bg-amber-50" :
                  "border-blue-200 bg-blue-50"
                }
              >
                <div className="flex items-start gap-3">
                  {finding.severity === "high" ? (
                    <AlertTriangle className="size-5 text-red-600 mt-0.5" />
                  ) : finding.severity === "medium" ? (
                    <AlertTriangle className="size-5 text-amber-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="size-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <AlertTitle className="mb-0">{finding.title}</AlertTitle>
                      <Badge 
                        variant={
                          finding.severity === "high" ? "destructive" :
                          finding.severity === "medium" ? "default" :
                          "secondary"
                        }
                      >
                        {finding.severity}
                      </Badge>
                    </div>
                    <AlertDescription className="space-y-2">
                      <p>{finding.description}</p>
                      <div className="bg-white/50 p-3 rounded-md mt-2">
                        <p className="text-sm font-medium mb-1">💡 Recommendation</p>
                        <p className="text-sm">{finding.recommendation}</p>
                      </div>
                      <p className="text-sm italic">Impact: {finding.impact}</p>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* INVEST Criteria Performance */}
            <Card>
              <CardHeader>
                <CardTitle>INVEST Criteria Performance</CardTitle>
                <CardDescription>Pass/Fail breakdown by criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={investValidationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="passed" fill="#10b981" name="Passed" />
                    <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Work Item Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Work Item Distribution</CardTitle>
                <CardDescription>By type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={workItemTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {workItemTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Timeline Trends */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>6-Month Trend Analysis</CardTitle>
                <CardDescription>Work items, test cases, and validations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="workItems" stroke="#3b82f6" name="Work Items" strokeWidth={2} />
                    <Line type="monotone" dataKey="testCases" stroke="#8b5cf6" name="Test Cases" strokeWidth={2} />
                    <Line type="monotone" dataKey="validated" stroke="#10b981" name="Validated" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Flags Tab */}
        <TabsContent value="flags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Flags</CardTitle>
              <CardDescription>Issues detected by the AI Agent requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flags.map((flag) => (
                  <div key={flag.id} className="border border-border rounded-lg p-4 hover:bg-accent transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="font-mono">
                            #{flag.workItemId}
                          </Badge>
                          <Badge variant={
                            flag.type === "size" ? "destructive" :
                            flag.type === "testability" ? "default" :
                            flag.type === "estimability" ? "secondary" :
                            "outline"
                          }>
                            {flag.type}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{flag.title}</h4>
                      </div>
                      <AlertTriangle className="size-5 text-amber-600" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{flag.issue}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Raised: {flag.raisedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
