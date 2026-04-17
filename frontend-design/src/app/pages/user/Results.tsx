import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { CheckCircle, Home, Plus, Download } from "lucide-react";

export function Results() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="size-16 rounded-full bg-green-600 mx-auto flex items-center justify-center">
              <CheckCircle className="size-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-900">Work Item Submitted Successfully!</h1>
              <p className="text-green-700 mt-2">
                Your work item has been validated and meets INVEST criteria standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Summary</CardTitle>
          <CardDescription>Your work item is ready for the development team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Work Item ID</p>
              <p className="font-semibold">#WI-1342</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="default" className="bg-green-600">Validated</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">INVEST Score</p>
              <p className="font-semibold text-green-600">87%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">1.</span>
                <span>Your work item will be reviewed by the project manager</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">2.</span>
                <span>AI-generated BDD test cases will be created automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">3.</span>
                <span>The item will be added to the project backlog</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">4.</span>
                <span>You'll receive a notification once it's scheduled for a sprint</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => navigate("/")}>
          <Home className="size-4 mr-2" />
          Back to Home
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="size-4 mr-2" />
          Download Summary
        </Button>
        <Button className="flex-1" onClick={() => navigate("/create")}>
          <Plus className="size-4 mr-2" />
          Create Another
        </Button>
      </div>

      {/* Tip */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-2">💡 Pro Tip</p>
            <p className="text-blue-700">
              Well-defined work items that meet INVEST criteria lead to 35% faster sprint completion rates and better team collaboration. Keep up the great work!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
