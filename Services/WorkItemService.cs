using TvaInvestValidator.Models;

namespace TvaInvestValidator.Services
{
    public class WorkItemService : IWorkItemService
    {
        public List<WorkItem> GetAllWorkItems()
        {
            // Mock data - in production, this would fetch from Azure DevOps or database
            return new List<WorkItem>
            {
                new WorkItem
                {
                    Id = "1234",
                    Type = WorkItemType.UserStory,
                    Title = "As a TVA operator, I want to view real-time power grid status",
                    Status = WorkItemStatus.Active,
                    AssignedTo = "John Smith",
                    Priority = "High",
                    LastUpdated = new DateTime(2026, 3, 31),
                    InvestStatusValue = InvestStatus.Passed
                },
                new WorkItem
                {
                    Id = "1235",
                    Type = WorkItemType.Epic,
                    Title = "Power Grid Monitoring System Enhancement",
                    Status = WorkItemStatus.Active,
                    AssignedTo = "Sarah Johnson",
                    Priority = "High",
                    LastUpdated = new DateTime(2026, 3, 30),
                    InvestStatusValue = InvestStatus.Passed
                },
                new WorkItem
                {
                    Id = "1236",
                    Type = WorkItemType.Feature,
                    Title = "Automated Alert System for Grid Anomalies",
                    Status = WorkItemStatus.New,
                    AssignedTo = "Mike Davis",
                    Priority = "Medium",
                    LastUpdated = new DateTime(2026, 3, 29),
                    InvestStatusValue = InvestStatus.Pending
                },
                new WorkItem
                {
                    Id = "1237",
                    Type = WorkItemType.UserStory,
                    Title = "As a manager, I want to generate monthly performance reports",
                    Status = WorkItemStatus.Active,
                    AssignedTo = "Lisa Chen",
                    Priority = "Medium",
                    LastUpdated = new DateTime(2026, 3, 28),
                    InvestStatusValue = InvestStatus.Failed
                },
                new WorkItem
                {
                    Id = "1238",
                    Type = WorkItemType.Feature,
                    Title = "Integration with SCADA Systems",
                    Status = WorkItemStatus.New,
                    AssignedTo = "Robert Taylor",
                    Priority = "High",
                    LastUpdated = new DateTime(2026, 3, 27),
                    InvestStatusValue = InvestStatus.Pending
                },
                new WorkItem
                {
                    Id = "1239",
                    Type = WorkItemType.UserStory,
                    Title = "As a technician, I want to access historical data for analysis",
                    Status = WorkItemStatus.Resolved,
                    AssignedTo = "Emma Wilson",
                    Priority = "Low",
                    LastUpdated = new DateTime(2026, 3, 26),
                    InvestStatusValue = InvestStatus.Passed
                },
                new WorkItem
                {
                    Id = "1240",
                    Type = WorkItemType.Epic,
                    Title = "Customer Portal Modernization",
                    Status = WorkItemStatus.Active,
                    AssignedTo = "David Martinez",
                    Priority = "Medium",
                    LastUpdated = new DateTime(2026, 3, 25),
                    InvestStatusValue = InvestStatus.Passed
                },
                new WorkItem
                {
                    Id = "1241",
                    Type = WorkItemType.UserStory,
                    Title = "As a customer, I want to view my energy consumption trends",
                    Status = WorkItemStatus.New,
                    AssignedTo = "Jennifer Lee",
                    Priority = "Medium",
                    LastUpdated = new DateTime(2026, 3, 24),
                    InvestStatusValue = InvestStatus.Pending
                }
            };
        }

        public List<WorkItem> FilterWorkItems(List<WorkItem> items, string searchQuery, string filterType)
        {
            return items.Where(item =>
            {
                var matchesSearch = string.IsNullOrWhiteSpace(searchQuery) ||
                                   item.Title.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                                   item.Id.Contains(searchQuery, StringComparison.OrdinalIgnoreCase);

                var matchesType = filterType == "all" || item.Type.ToString() == filterType;

                return matchesSearch && matchesType;
            }).ToList();
        }

        public InvestScore AnalyzeWorkItem(string title, string description, List<string> acceptanceCriteria)
        {
            var score = new InvestScore();
            var titleLower = title.ToLower();
            var descriptionLower = description.ToLower();
            var validCriteria = acceptanceCriteria.Where(ac => !string.IsNullOrWhiteSpace(ac)).ToList();

            // Independent
            score.Independent = new InvestCriterion
            {
                Name = "Independent",
                Score = titleLower.Contains("depend") ? 60 : 95,
                Feedback = titleLower.Contains("depend")
                    ? "This work item mentions dependencies, which may indicate it's not fully independent."
                    : "This work item appears to be independent and can be developed separately.",
                Suggestions = titleLower.Contains("depend")
                    ? new List<string> { "Consider breaking dependencies into separate work items", "Review if this can be completed without waiting for other items" }
                    : new List<string>()
            };

            // Negotiable
            score.Negotiable = new InvestCriterion
            {
                Name = "Negotiable",
                Score = description.Length > 100 ? 90 : 70,
                Feedback = description.Length > 100
                    ? "Good level of detail while leaving room for implementation discussion."
                    : "Consider adding more context to allow for negotiation during implementation.",
                Suggestions = description.Length > 100
                    ? new List<string>()
                    : new List<string> { "Add more details about the 'why' rather than the 'how'" }
            };

            // Valuable
            var hasValueKeywords = descriptionLower.Contains("user") ||
                                  descriptionLower.Contains("customer") ||
                                  descriptionLower.Contains("business");
            score.Valuable = new InvestCriterion
            {
                Name = "Valuable",
                Score = hasValueKeywords ? 95 : 65,
                Feedback = hasValueKeywords
                    ? "Clear business or user value is articulated."
                    : "The business value could be more explicit.",
                Suggestions = hasValueKeywords
                    ? new List<string>()
                    : new List<string> { "Explain why this is valuable to users or the business", "Add context about the problem being solved" }
            };

            // Estimable
            var isEstimable = description.Length > 50 && validCriteria.Count >= 2;
            score.Estimable = new InvestCriterion
            {
                Name = "Estimable",
                Score = isEstimable ? 90 : 60,
                Feedback = isEstimable
                    ? "Sufficient detail provided for estimation."
                    : "More details needed for accurate estimation.",
                Suggestions = isEstimable
                    ? new List<string>()
                    : new List<string> { "Add specific acceptance criteria", "Clarify technical requirements" }
            };

            // Small
            var isSmall = description.Length < 500 && title.Split(' ').Length < 15;
            score.Small = new InvestCriterion
            {
                Name = "Small",
                Score = isSmall ? 85 : 55,
                Feedback = isSmall
                    ? "Scope appears appropriate for completion within a sprint."
                    : "This work item may be too large. Consider breaking it down.",
                Suggestions = isSmall
                    ? new List<string>()
                    : new List<string> { "Break into smaller, focused work items", "Extract epic or feature elements" }
            };

            // Testable
            var isTestable = validCriteria.Count >= 2;
            score.Testable = new InvestCriterion
            {
                Name = "Testable",
                Score = isTestable ? 95 : 50,
                Feedback = isTestable
                    ? "Clear acceptance criteria make this testable."
                    : "Add specific acceptance criteria to make this testable.",
                Suggestions = isTestable
                    ? new List<string>()
                    : new List<string> { "Add measurable acceptance criteria", "Define clear success conditions", "Use 'Given-When-Then' format" }
            };

            return score;
        }
    }
}
