namespace TvaInvestValidator.Models.ViewModels
{
    public class WorkItemsListViewModel
    {
        public string SearchQuery { get; set; } = string.Empty;
        public string FilterType { get; set; } = "all";
        public List<WorkItem> WorkItems { get; set; } = new();
        public List<WorkItem> FilteredItems { get; set; } = new();
    }
}
