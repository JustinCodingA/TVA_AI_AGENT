import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Download, RefreshCw, Search, Filter } from "lucide-react";
import { toast } from "sonner";

type WorkItemType = "User Story" | "Epic" | "Feature";
type WorkItemStatus = "New" | "Active" | "Resolved" | "Closed";

interface WorkItem {
  id: string;
  type: WorkItemType;
  title: string;
  status: WorkItemStatus;
  assignedTo: string;
  priority: string;
  lastUpdated: string;
  investStatus?: "Passed" | "Failed" | "Pending";
}

export function WorkItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const mockWorkItems: WorkItem[] = [
    {
      id: "1234",
      type: "User Story",
      title: "As a TVA operator, I want to view real-time power grid status",
      status: "Active",
      assignedTo: "John Smith",
      priority: "High",
      lastUpdated: "2026-03-31",
      investStatus: "Passed",
    },
    {
      id: "1235",
      type: "Epic",
      title: "Power Grid Monitoring System Enhancement",
      status: "Active",
      assignedTo: "Sarah Johnson",
      priority: "High",
      lastUpdated: "2026-03-30",
      investStatus: "Passed",
    },
    {
      id: "1236",
      type: "Feature",
      title: "Automated Alert System for Grid Anomalies",
      status: "New",
      assignedTo: "Mike Davis",
      priority: "Medium",
      lastUpdated: "2026-03-29",
      investStatus: "Pending",
    },
    {
      id: "1237",
      type: "User Story",
      title: "As a manager, I want to generate monthly performance reports",
      status: "Active",
      assignedTo: "Lisa Chen",
      priority: "Medium",
      lastUpdated: "2026-03-28",
      investStatus: "Failed",
    },
    {
      id: "1238",
      type: "Feature",
      title: "Integration with SCADA Systems",
      status: "New",
      assignedTo: "Robert Taylor",
      priority: "High",
      lastUpdated: "2026-03-27",
      investStatus: "Pending",
    },
    {
      id: "1239",
      type: "User Story",
      title: "As a technician, I want to access historical data for analysis",
      status: "Resolved",
      assignedTo: "Emma Wilson",
      priority: "Low",
      lastUpdated: "2026-03-26",
      investStatus: "Passed",
    },
    {
      id: "1240",
      type: "Epic",
      title: "Customer Portal Modernization",
      status: "Active",
      assignedTo: "David Martinez",
      priority: "Medium",
      lastUpdated: "2026-03-25",
      investStatus: "Passed",
    },
    {
      id: "1241",
      type: "User Story",
      title: "As a customer, I want to view my energy consumption trends",
      status: "New",
      assignedTo: "Jennifer Lee",
      priority: "Medium",
      lastUpdated: "2026-03-24",
      investStatus: "Pending",
    },
  ];

  const filteredItems = mockWorkItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.includes(searchQuery);
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handlePullWorkItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully pulled 8 work items from Azure DevOps");
    }, 2000);
  };

  const getStatusBadgeVariant = (status: WorkItemStatus) => {
    switch (status) {
      case "Active":
        return "default";
      case "New":
        return "secondary";
      case "Resolved":
        return "outline";
      default:
        return "outline";
    }
  };

  const getInvestBadgeVariant = (status?: string) => {
    switch (status) {
      case "Passed":
        return "default";
      case "Failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Work Items</h1>
          <p className="text-muted-foreground mt-1">
            User stories, epics, and features from Azure DevOps
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePullWorkItems} disabled={isLoading}>
            <RefreshCw className={`size-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Pull from Azure DevOps
          </Button>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="User Story">User Story</SelectItem>
                <SelectItem value="Epic">Epic</SelectItem>
                <SelectItem value="Feature">Feature</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Work Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Work Items ({filteredItems.length})</CardTitle>
          <CardDescription>
            Showing {filteredItems.length} of {mockWorkItems.length} items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>INVEST</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getInvestBadgeVariant(item.investStatus)}>
                      {item.investStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
