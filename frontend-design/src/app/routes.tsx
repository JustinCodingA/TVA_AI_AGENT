import { createBrowserRouter } from "react-router";
import { UserLayout } from "./components/UserLayout";
import { ProjectSelection } from "./pages/user/ProjectSelection";
import { WorkItemCreation } from "./pages/user/WorkItemCreation";
import { InvestAnalysis } from "./pages/user/InvestAnalysis";
import { Results } from "./pages/user/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      { index: true, Component: ProjectSelection },
      { path: "create", Component: WorkItemCreation },
      { path: "analysis/:id", Component: InvestAnalysis },
      { path: "results", Component: Results },
    ],
  },
]);
