import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Activity, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { Link } from "react-router";

export function Dashboard() {
  const stats = [
    {
      title: "Work Items Pulled",
      value: "247",
      change: "+12 today",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "INVEST Validated",
      value: "189",
      change: "76% pass rate",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Test Cases Generated",
      value: "342",
      change: "+28 today",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Flags Raised",
      value: "23",
      change: "Needs attention",
      icon: AlertTriangle,
      color: "text-amber-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "success",
      title: "User Story #1234 validated",
      description: "All INVEST criteria met",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "error",
      title: "Epic #5678 validation failed",
      description: "Missing acceptance criteria",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "success",
      title: "15 test cases pushed to Azure Test Plans",
      description: "Feature: User Authentication",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "warning",
      title: "Story #9012 flagged",
      description: "Estimable criteria needs review",
      time: "2 hours ago",
    },
  ];

  const currentProcessing = [
    {
      id: 1,
      name: "Power Grid Monitoring - Epic",
      status: "Validating INVEST criteria",
      progress: 65,
    },
    {
      id: 2,
      name: "User Story: Dashboard Analytics",
      status: "Generating BDD test cases",
      progress: 40,
    },
    {
      id: 3,
      name: "Feature: Real-time Alerts",
      status: "Pushing to Azure Test Plans",
      progress: 85,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered Azure DevOps test case generation for TVA
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`size-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Processing */}
        <Card>
          <CardHeader>
            <CardTitle>Current Processing</CardTitle>
            <CardDescription>Items being processed by the AI Agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentProcessing.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.status}</p>
                  </div>
                  <Badge variant="outline">{item.progress}%</Badge>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/work-items">
                View All Work Items <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from the AI Agent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                  <div className={`size-2 rounded-full mt-2 ${
                    activity.type === "success" ? "bg-green-600" :
                    activity.type === "error" ? "bg-red-600" :
                    "bg-amber-600"
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
              <Link to="/work-items">
                <FileText className="size-6" />
                <span>Pull New Work Items</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
              <Link to="/validation">
                <CheckCircle className="size-6" />
                <span>Run INVEST Validation</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
              <Link to="/analytics">
                <TrendingUp className="size-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
