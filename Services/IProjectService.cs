using TvaInvestValidator.Models;

namespace TvaInvestValidator.Services
{
    public interface IProjectService
    {
        List<string> GetAvailableProjects();
        Dictionary<string, List<string>> GetProjectEpics();
        List<ProjectInvestCriterion> AnalyzeInvestCompliance(
            string project,
            string areaPath,
            string epic,
            string tags
        );
    }
}
