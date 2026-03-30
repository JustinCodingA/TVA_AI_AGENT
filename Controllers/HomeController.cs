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
    	await get_epics_by_path("aggy", "aggy-test-epic-2", "2");
        return View();
    }

    public async Task<string> Get_Epic(string project, string title, string iteration){
    	/*dynamic res = await get_epics_by_path("aggy-test-epic-2", """aggy\\Iteration 2""");*/
    	dynamic res = await get_epics_by_path(project, title, iteration);
	/*var options = new JsonSerializerOptions {*/
	/*	IncludeFields = true,*/
	/*};*/
	/*string res_string = JsonSerializer.Serialize(res, options);*/
	Console.WriteLine($"\n\ncontroller out raw: \n {res}");
	/*Console.WriteLine($"\n\ncontroller out string: \n {res_string}");*/
	return res;
    }

    public async Task<string> Get_Stories_By_Epic(string project, string epic_title, string iteration){
	    try {

		    //Get epic first
		    dynamic epic = await get_epics_by_path(project, epic_title, iteration);
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
		    dynamic stories = await get_stories_by_features(project, features);
		    Console.WriteLine("stories list: ");
		    List<dynamic> res = new List<dynamic>();
		    foreach(var item in stories) {
			    dynamic details = await get_story_details(project, item);
			    res.Add("{ \n\"id\": " + details.id + ",\n\"title\": \"" + details["fields"]["System.Title"] + "\",\n\"Description\": \"" + details["fields"]["System.Description"] + "\",\n\"AcceptanceCriteria\": \"" + details["fields"]["Microsoft.VSTS.Common.AcceptanceCriteria"] + "\"\n}");
			    /*res.Add("{ \n\"id\": " + details.id + ",\n\"title\": \"" + details["fields"]["System.Title"] + "\",\n\"AcceptanceCriteria\": \"" + details["fields"]["Microsoft.VSTS.Common.AcceptanceCriteria"] + "\"\n}");*/

		    }
		    dynamic analysis = await copilot_analyze(res);
		    return "success, stories in this epic: \n" + string.Join(", ", res) + "\n story analyzed: \n "  + res[0] + "\nagent response: \n" + analysis;

	    } catch (Exception e) {
		    Console.WriteLine($"Error: {e}");
		    return $"Error: {e}";
	    }
    }


    public async Task<string> Iterate(string iter) {
	    Console.WriteLine($"Iteration from url: {iter}");
	    return iter;

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
