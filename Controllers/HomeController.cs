using System.Diagnostics;
using System.Text.Json;
using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using TVA_AI_AGENT.Models;
using static TVA_AI_AGENT.Service.ADO;
using static TVA_AI_AGENT.Service.Agent;


namespace TVA_AI_AGENT.Controllers;

public class HomeController : Controller
{
    public async Task<IActionResult> Index(){
        return View();
    }

    public async Task<IActionResult> Area(){
	    string projects = await get_projects();
	    /*string epics = await get_epics_by_area_project(project, area);*/
	    /*return JsonConvert.SerializeObject(projects, Formatting.Indented);*/
	    return Json(projects);

		
    }

    public async Task<IActionResult> Get_Projects() {
	    try{
		    string projects = await get_projects();
		    return Json(projects);



	    } catch (Exception e) {
		    return Json("error");
	    }

    }

    public async Task<IActionResult> Get_Epics_By_Project_Area(string area, string project) {
	    try {

		    string epics = await get_epics_by_area_project(project, area);
		    return Json(epics);

	    } catch (Exception e) {
		    return Json("Error");
	    }
    }

    public async Task<string> Get_Epics_By_Area_Project() {
	    return "done";
    }


    public async Task<string> Analyze_Stories_By_Epic(string project, string epic_title, string area, string tags){
	    try {

		    dynamic tag_list;
		    if(tags != null) {
			    tag_list = tags.Split(",");
		    } else {
			    tag_list = new string[0];
		    }

		    Console.WriteLine($"area passed: {area}");


		    //Get epic first
		    dynamic epic = await get_epic_by_title(project, epic_title, area);
		    Console.WriteLine($"epics response: \n{epic}");
		    if (epic.workItems.Count < 1) {
			    return "no epic found";
		    }

		    //Get features from epic
		    dynamic features = await get_features_by_epic(project, epic.workItems[0].id.ToString());
		    Console.WriteLine($"features response: \n{features}");
		    string features_string = JsonConvert.SerializeObject(features);
		    if (features.value.Count < 1) {
			    return "no stories found\n" + features_string;
		    }

		    //Get stories from all features in epic
		    dynamic feature_stories_obj = await get_stories_by_features(project, features);
		    //test

		    List<dynamic> stories = new List<dynamic>();
		    foreach(var feature in feature_stories_obj) {
			    foreach(var story in feature.Children) {
				    stories.Add(story);
			    }
		    }
		    //test
		    List<dynamic> res = new List<dynamic>();
		    foreach(var item in stories) {
			    dynamic details = await get_story_details(project, item);
			    res.Add("{ \n\"id\": " + details.id + ",\n\"title\": \"" + details["fields"]["System.Title"] + "\",\n\"Description\": \"" + details["fields"]["System.Description"] + "\",\n\"AcceptanceCriteria\": \"" + details["fields"]["Microsoft.VSTS.Common.AcceptanceCriteria"] + "\"\n}");

		    }
		    if(res.Count < 1) {
			    return "not stories in this epic";
		    }

		    //send stories to be analyzed by agent
		    dynamic analysis = await copilot_analyze(res, feature_stories_obj);
		    dynamic analysis_obj = JObject.Parse(analysis);
		    dynamic create_test_res = await create_tests((string)features.value[0].Title, analysis_obj.suites, project, area);
		    return "success, stories in this epic: \n" + string.Join(", ", res) + "\n story analyzed: \n "  + res[0] + "\nagent response: \n" + analysis + "\ncreate_test_plan_res: \n" + create_test_res;




	    } catch (Exception e) {

		    Console.WriteLine($"Error: {e}");
		    return $"Error: {e}";

	    }
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
