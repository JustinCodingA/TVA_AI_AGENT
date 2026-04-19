namespace TvaInvestValidator.Models
{
    public class ProjectInvestCriterion
    {
        public string Name { get; set; } = string.Empty;
        public string Letter { get; set; } = string.Empty;
        public bool Compliant { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
