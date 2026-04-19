using Microsoft.AspNetCore.Mvc;
using TvaInvestValidator.Models;
using TvaInvestValidator.Models.ViewModels;
using TvaInvestValidator.Services;

namespace TvaInvestValidator.Controllers
{
    public class ProjectController : Controller
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public IActionResult Configure()
        {
            var model = new ProjectConfigViewModel
            {
                AvailableProjects = _projectService.GetAvailableProjects(),
                ProjectEpics = _projectService.GetProjectEpics()
            };

            return View(model);
        }

        [HttpPost]
        public IActionResult Analyze(ProjectConfigViewModel model)
        {
            if (!ModelState.IsValid)
            {
                model.AvailableProjects = _projectService.GetAvailableProjects();
                model.ProjectEpics = _projectService.GetProjectEpics();
                return View("Configure", model);
            }

            model.AnalysisResults = _projectService.AnalyzeInvestCompliance(
                model.SelectedProject,
                model.AreaPath,
                model.SelectedEpic,
                model.Tags
            );

            model.AvailableProjects = _projectService.GetAvailableProjects();
            model.ProjectEpics = _projectService.GetProjectEpics();

            return View("Configure", model);
        }
    }
}
