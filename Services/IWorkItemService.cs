using TvaInvestValidator.Models;

namespace TvaInvestValidator.Services
{
    public interface IWorkItemService
    {
        List<WorkItem> GetAllWorkItems();
        List<WorkItem> FilterWorkItems(List<WorkItem> items, string searchQuery, string filterType);
        InvestScore AnalyzeWorkItem(string title, string description, List<string> acceptanceCriteria);
    }
}
