using System.ComponentModel.DataAnnotations;

namespace TvaInvestValidator.Models
{
    public enum WorkItemType
    {
        UserStory,
        Epic,
        Feature
    }

    public enum WorkItemStatus
    {
        New,
        Active,
        Resolved,
        Closed
    }

    public enum InvestStatus
    {
        Passed,
        Failed,
        Pending
    }

    public class WorkItem
    {
        public string Id { get; set; } = string.Empty;

        [Required]
        public WorkItemType Type { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public List<string> AcceptanceCriteria { get; set; } = new List<string>();

        public WorkItemStatus Status { get; set; }

        public string AssignedTo { get; set; } = string.Empty;

        public string Priority { get; set; } = string.Empty;

        public DateTime LastUpdated { get; set; }

        public InvestStatus? InvestStatusValue { get; set; }

        public string Project { get; set; } = string.Empty;

        public string AreaPath { get; set; } = string.Empty;

        public string Epic { get; set; } = string.Empty;

        public List<string> Tags { get; set; } = new List<string>();
    }
}
