using Microsoft.AspNetCore.Mvc;
using TvaInvestValidator.Models;
using TvaInvestValidator.Models.ViewModels;
using TvaInvestValidator.Services;

namespace TvaInvestValidator.Controllers
{
    public class WorkItemsController : Controller
    {
        private readonly IWorkItemService _workItemService;

        public WorkItemsController(IWorkItemService workItemService)
        {
            _workItemService = workItemService;
        }

        [HttpGet]
        public IActionResult Index(string searchQuery = "", string filterType = "all")
        {
            var allItems = _workItemService.GetAllWorkItems();
            var filtered = _workItemService.FilterWorkItems(allItems, searchQuery, filterType);

            var model = new WorkItemsListViewModel
            {
                SearchQuery = searchQuery,
                FilterType = filterType,
                WorkItems = allItems,
                FilteredItems = filtered
            };

            return View(model);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var model = new WorkItemCreateViewModel();
            return View(model);
        }

        [HttpPost]
        public IActionResult Analyze(WorkItemCreateViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View("Create", model);
            }

            model.InvestScore = _workItemService.AnalyzeWorkItem(
                model.Title,
                model.Description,
                model.AcceptanceCriteria
            );

            model.ShowAnalysis = true;

            return View("Create", model);
        }

        [HttpPost]
        public IActionResult Submit(WorkItemCreateViewModel model)
        {
            if (!ModelState.IsValid || model.InvestScore == null)
            {
                return View("Create", model);
            }

            var overallScore = model.InvestScore.CalculateOverallScore();
            if (overallScore < 70)
            {
                ModelState.AddModelError("", "Score too low. Please improve the work item before submission.");
                model.ShowAnalysis = true;
                return View("Create", model);
            }

            // In a real application, save to database or send to Azure DevOps
            TempData["SuccessMessage"] = "Work item submitted successfully!";
            return RedirectToAction("Results");
        }

        [HttpGet]
        public IActionResult Results()
        {
            return View();
        }

        [HttpPost]
        public IActionResult PullFromAzureDevOps()
        {
            // Simulate pulling from Azure DevOps
            TempData["SuccessMessage"] = "Successfully pulled 8 work items from Azure DevOps";
            return RedirectToAction("Index");
        }
    }
}
