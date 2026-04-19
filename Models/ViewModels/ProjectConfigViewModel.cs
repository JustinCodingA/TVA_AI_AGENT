using System.ComponentModel.DataAnnotations;

namespace TvaInvestValidator.Models.ViewModels
{
    public class ProjectConfigViewModel
    {
        [Required]
        [Display(Name = "Project")]
        public string SelectedProject { get; set; } = string.Empty;

        [Required]
        [Display(Name = "Area Path")]
        public string AreaPath { get; set; } = string.Empty;

        [Required]
        [Display(Name = "Epic")]
        public string SelectedEpic { get; set; } = string.Empty;

        [Display(Name = "Tags")]
        public string Tags { get; set; } = string.Empty;

        public List<ProjectInvestCriterion>? AnalysisResults { get; set; }

        public List<string> AvailableProjects { get; set; } = new();
        public Dictionary<string, List<string>> ProjectEpics { get; set; } = new();
    }
}
