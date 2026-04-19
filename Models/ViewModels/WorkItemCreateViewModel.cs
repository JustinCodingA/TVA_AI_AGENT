using System.ComponentModel.DataAnnotations;

namespace TvaInvestValidator.Models.ViewModels
{
    public class WorkItemCreateViewModel
    {
        [Required]
        [Display(Name = "Work Item Type")]
        public WorkItemType WorkItemType { get; set; }

        [Required]
        [StringLength(200)]
        [Display(Name = "Title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [Display(Name = "Description")]
        public string Description { get; set; } = string.Empty;

        [Display(Name = "Acceptance Criteria")]
        public List<string> AcceptanceCriteria { get; set; } = new() { string.Empty };

        public InvestScore? InvestScore { get; set; }

        public bool ShowAnalysis { get; set; }
    }
}
