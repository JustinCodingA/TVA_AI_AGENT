using TvaInvestValidator.Models;

namespace TvaInvestValidator.Services
{
    public class ProjectService : IProjectService
    {
        public List<string> GetAvailableProjects()
        {
            return new List<string>
            {
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
                "Support-Platform"
            };
        }

        public Dictionary<string, List<string>> GetProjectEpics()
        {
            return new Dictionary<string, List<string>>
            {
                ["TVA-PowerGrid"] = new List<string>
                {
                    "Real-time Grid Monitoring System",
                    "Predictive Maintenance Platform",
                    "Load Balancing Optimization",
                    "SCADA Integration Phase 2"
                },
                ["TVA-CustomerPortal"] = new List<string>
                {
                    "Customer Self-Service Portal",
                    "Mobile App Development",
                    "Billing & Payment Modernization",
                    "Energy Usage Analytics"
                },
                ["TVA-Analytics"] = new List<string>
                {
                    "Data Warehouse Migration",
                    "BI Dashboard Enhancement",
                    "Machine Learning Integration",
                    "Real-time Reporting System"
                },
                ["TVA-Infrastructure"] = new List<string>
                {
                    "Cloud Infrastructure Setup",
                    "Network Security Upgrade",
                    "Database Optimization",
                    "Disaster Recovery Planning"
                },
                ["PowerGrid-Monitoring"] = new List<string>
                {
                    "Real-time Monitoring Dashboard",
                    "Alert System Enhancement",
                    "Data Collection Optimization"
                },
                ["Grid-Optimization"] = new List<string>
                {
                    "Load Balancing Algorithm",
                    "Efficiency Improvements",
                    "Automated Response System"
                },
                ["Energy-Distribution"] = new List<string>
                {
                    "Distribution Network Upgrade",
                    "Smart Meter Integration",
                    "Outage Management System"
                },
                ["IT-Modernization"] = new List<string>
                {
                    "Legacy System Migration",
                    "API Gateway Implementation",
                    "Microservices Architecture"
                },
                ["Cloud-Migration"] = new List<string>
                {
                    "Azure Infrastructure Setup",
                    "Data Migration Phase 1",
                    "Application Containerization"
                },
                ["Security-Enhancement"] = new List<string>
                {
                    "Identity Management System",
                    "Security Audit Framework",
                    "Compliance Automation"
                },
                ["Customer-Portal-v2"] = new List<string>
                {
                    "User Interface Redesign",
                    "Account Management Features",
                    "Notification System"
                },
                ["Billing-System"] = new List<string>
                {
                    "Payment Gateway Integration",
                    "Billing Automation",
                    "Invoice Management"
                },
                ["Support-Platform"] = new List<string>
                {
                    "Ticketing System",
                    "Knowledge Base",
                    "Live Chat Integration"
                }
            };
        }

        public List<ProjectInvestCriterion> AnalyzeInvestCompliance(
            string project,
            string areaPath,
            string epic,
            string tags)
        {
            var results = new List<ProjectInvestCriterion>();

            // Independent
            var hasStructuredPath = areaPath.Contains("\\") || areaPath.Contains("/");
            var pathDepth = areaPath.Split(new[] { '\\', '/' }).Length;
            results.Add(new ProjectInvestCriterion
            {
                Name = "Independent",
                Letter = "I",
                Compliant = hasStructuredPath && pathDepth >= 2,
                Comment = hasStructuredPath && pathDepth >= 2
                    ? "Area path shows clear organizational hierarchy, indicating proper separation of concerns."
                    : "Area path should include organizational hierarchy (e.g., TVA\\PowerGrid\\Monitoring) to ensure work items can be developed independently."
            });

            // Negotiable
            var epicLower = epic.ToLower();
            var hasPhaseOrVersion = System.Text.RegularExpressions.Regex.IsMatch(epicLower, @"phase|v\d|version|iteration");
            results.Add(new ProjectInvestCriterion
            {
                Name = "Negotiable",
                Letter = "N",
                Compliant = hasPhaseOrVersion || epicLower.Contains("enhancement") || epicLower.Contains("optimization"),
                Comment = hasPhaseOrVersion || epicLower.Contains("enhancement") || epicLower.Contains("optimization")
                    ? "Epic indicates iterative development, suggesting flexibility in implementation details."
                    : "Consider choosing epics that allow for negotiation on implementation details rather than fixed deliverables."
            });

            // Valuable
            var hasBusinessFocusedEpic = System.Text.RegularExpressions.Regex.IsMatch(epicLower, @"customer|user|service|portal|billing|support|analytics");
            results.Add(new ProjectInvestCriterion
            {
                Name = "Valuable",
                Letter = "V",
                Compliant = hasBusinessFocusedEpic,
                Comment = hasBusinessFocusedEpic
                    ? "Epic clearly connects to business outcomes and user value."
                    : "Epic should clearly demonstrate business value. Consider emphasizing customer or operational benefits."
            });

            // Estimable
            var hasClearScope = epic.Split(' ').Length >= 2 && epic.Split(' ').Length <= 6;
            results.Add(new ProjectInvestCriterion
            {
                Name = "Estimable",
                Letter = "E",
                Compliant = hasClearScope,
                Comment = hasClearScope
                    ? "Epic name suggests well-defined scope that can be estimated by the development team."
                    : "Epic scope should be clear enough to estimate. Consider breaking down vague or overly broad epics."
            });

            // Small
            var tagCount = string.IsNullOrWhiteSpace(tags) ? 0 : tags.Split(',').Select(t => t.Trim()).Count(t => t.Length > 0);
            var hasReasonableTags = tagCount > 0 && tagCount <= 5;
            results.Add(new ProjectInvestCriterion
            {
                Name = "Small",
                Letter = "S",
                Compliant = hasReasonableTags || tagCount == 0,
                Comment = hasReasonableTags
                    ? "Appropriate number of tags suggests focused, manageable work scope."
                    : tagCount > 5
                    ? "Too many tags may indicate the work item is trying to address too many concerns. Consider splitting it."
                    : "Consider adding tags to help scope and categorize the work item appropriately."
            });

            // Testable
            var tagsLower = tags.ToLower();
            var hasTestableIndicators = System.Text.RegularExpressions.Regex.IsMatch(tagsLower, @"test|qa|validation|verification") ||
                                       System.Text.RegularExpressions.Regex.IsMatch(epicLower, @"system|platform|integration");
            results.Add(new ProjectInvestCriterion
            {
                Name = "Testable",
                Letter = "T",
                Compliant = hasTestableIndicators || hasStructuredPath,
                Comment = hasTestableIndicators
                    ? "Work item structure includes testability indicators such as system integration or quality validation."
                    : "Ensure work items will have clear acceptance criteria. Consider adding tags like 'testing', 'qa', or defining validation requirements."
            });

            return results;
        }
    }
}
