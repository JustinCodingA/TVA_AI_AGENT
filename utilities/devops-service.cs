/*using System.Net.Http.Json*/
using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using dotenv.net;
using TVA_AI_AGENT.dto;

namespace TVA_AI_AGENT.Service;


static class ADO {

	static string org = Environment.GetEnvironmentVariable("ORGANIZATION");
	static string pat = Environment.GetEnvironmentVariable("PAT");
	static string base_url = $"https://dev.azure.com/{org}/";
	static string analytics_base_url = $"https://analytics.dev.azure.com/{org}";
	static string url_params = "_apis/wit/wiql?api-version=7.0";

	//used to make GET calls
	public static async Task<dynamic> get_api(string url) {
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Authorization", $"Bearer {pat}");
		HttpResponseMessage response = await client.GetAsync(url);
		var body = await response.Content.ReadAsStringAsync();
		return body;
	}

	//used to make POST calls
	public static async Task<dynamic> post_api(string url, string query) {
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Authorization", $"Bearer {pat}");
		var req_body = new StringContent(query, Encoding.UTF8, "application/json");
		HttpResponseMessage response = await client.PostAsync(url, req_body);
		var body = await response.Content.ReadAsStringAsync();
		return body;
	}

	//used to make POST calls with json patch contetn
	public static async Task<dynamic> post_api_with_patch(string url, string query) {
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Authorization", $"Bearer {pat}");
		var req_body = new StringContent(query, Encoding.UTF8, "application/json-patch+json");
		HttpResponseMessage response = await client.PostAsync(url, req_body);
		var body = await response.Content.ReadAsStringAsync();
		return body;
	}

	public static string epic_query_builder(string title, string[] tags, string area){
		string query = "{\"query\": \"SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Epic'  AND [System.Title] = \'" + title + "\'";
		/*if(tags.Length == 0) {*/
		/*	return query + "}";*/
		/*}*/
		/*query += $" AND [System.Tags] contains \'{tags[0]}\'";*/
		/*if(tags.Length > 1) {*/
		/*	foreach(var tag in tags) {*/
		/*		query += $" OR [System.Tags] contains \'{tag}\'";*/
		/*	}*/
		/*}*/
		query += $" AND [System.AreaPath] = \'{area}\'\"" + "}";
		Console.WriteLine($"Epic query debug: {query}");
		return query;

	}

	//takes project info and epic title and returns an epic reference
	public static async Task<dynamic> get_epics_by_area(string project_title, string title, string area, string[] tags) {

		string url = $"{base_url}{project_title}/_apis/wit/wiql?api-version=7.0";
		string query = epic_query_builder(title, tags, area);
		dynamic res = await post_api(url, query);
		dynamic res_obj = JObject.Parse(res);
		return res_obj;
	}




	//takes an epic id and returns a list of feature references 
	public static async Task<dynamic> get_features_by_epic(string project_title, string epic_id) {
		dynamic res = await get_api("https://analytics.dev.azure.com/" + org + "/" + project_title + "/_odata/v4.0-preview/workitems/?$filter=WorkItemType eq 'Epic' and WorkItemId eq " + epic_id + "&$select=WorkItemId, Title, WorkItemType&$expand=Children($select=WorkItemId, Title, WorkItemType)");
		dynamic res_obj = JObject.Parse(res);
		return res_obj;
	}

	//takes list of features references and returns a list of references to all stories across the features 
	public static async Task<dynamic> get_stories_by_features(string project_title, dynamic features) {
		List<dynamic> stories = new List<dynamic>();
		var get_story_ids_query_pt1 = $"{analytics_base_url}/{project_title}/_odata/v4.0-preview/workitems/?$filter=WorkItemId in (";
		var get_story_ids_query_pt2 = ")&$select=WorkItemId, Title, WorkItemType&$expand=Children($select=WorkItemId, Title, WorkItemType)";

		//id, title
		var feature_map = new Dictionary<int, string>();
		foreach (var feat in features.value[0].Children) {
			//must cast to c# type from JValue
			feature_map.Add((int)feat.WorkItemId, (string)feat.Title);
			get_story_ids_query_pt1 += $"{(string)feat.WorkItemId},";
		}
		get_story_ids_query_pt1 = get_story_ids_query_pt1.TrimEnd(',');

		dynamic res = await get_api($"{get_story_ids_query_pt1}{get_story_ids_query_pt2}");

		dynamic res_obj = JObject.Parse(res);

		return res_obj.value;
	}

	//takes given story reference and gets all detailed fields
	public static async Task<dynamic> get_story_details(string project_title, dynamic story) {
		string url = $"{base_url}{project_title}/_apis/wit/workitems/{(string)story.WorkItemId}?api-version=7.0";
			dynamic res = await get_api(url);
		dynamic res_obj = JObject.Parse(res);
		Console.WriteLine($"\nStory id: {res_obj.id}");
		Console.WriteLine($"Story title: {res_obj.fields["System.Title"]}");
		Console.WriteLine("story description:");
		Console.WriteLine(res_obj["fields"]["System.Description"]);
		Console.WriteLine("story acceptance criteria:");
		Console.WriteLine(res_obj["fields"]["Microsoft.VSTS.Common.AcceptanceCriteria"]);
		Console.WriteLine("story tags:");
		Console.WriteLine(JsonConvert.SerializeObject(res_obj["fields"]["System.Tags"]));
		return res_obj;
	}

	public static string steps_builder(int i, JArray steps) {
		if(i == steps.Count) {
			return "";
		}
		return $"<step id=\"{i+2}\" type=\"ActionStep\"><parameterizedString isformatted=\"true\">&lt;DIV&gt;&lt;P&gt;{steps[i]}&lt;/P&gt;&lt;/DIV&gt;</parameterizedString><parameterizedString isformatted=\"true\">&lt;DIV&gt;&lt;P&gt;&lt;BR/&gt;&lt;/P&gt;&lt;/DIV&gt;</parameterizedString><description/></step>" + steps_builder(i+1, steps);
	}

	public static async Task<dynamic> create_test_plan(create_test_plan_dto test_plan, string project_title) {
		string url = $"{base_url}{project_title}/_apis/testplan/plans?api-version=7.1";
		string content = JsonConvert.SerializeObject(test_plan);
		string raw_body = "{\"name\": \"" + test_plan.name + "\", \"areaPath\": \"" + test_plan.areaPath + "\"}";
		dynamic res = await post_api(url, raw_body);
		Console.WriteLine($"test plan res:\n{res}");
		return res;
	}
	public static async Task<dynamic> create_test_suite(create_test_suite_dto suite, string plan_id, string root_id, String project_title) {
		string url = $"{base_url}{project_title}/_apis/test/Plans/{plan_id}/suites/{root_id}?api-version=5.0";
		string content = JsonConvert.SerializeObject(suite);
		dynamic res = await post_api(url, content);
		dynamic res_obj = JObject.Parse(res);
		Console.WriteLine($"test suite res:\n{res}");
		return res_obj;
	}
	public static async Task<dynamic> create_test_case(string project_title, string story_title, dynamic scenario, string area_path) {
		string url = $"{base_url}{project_title}/_apis/wit/workitems/$Test%20Case?api-version=7.1";
		string steps = steps_builder(0, scenario.steps);
		steps = $"<steps id=\"0\" last=\"{((int)scenario.steps.Count + 1).ToString()}\">{steps}</steps>";
		var title = new patch_json("add", "/fields/System.Title", $"{story_title}");
		var area = new patch_json("add", "/fields/System.AreaPath", area_path);
		var test_steps = new patch_json("add", "/fields/Microsoft.VSTS.TCM.Steps", steps);
		List<patch_json> patch = new List<patch_json>{title, area, test_steps};
		string content = JsonConvert.SerializeObject(patch);
		string res = await post_api_with_patch(url, content);
		dynamic res_obj = JObject.Parse(res);
		Console.WriteLine($"test case res:\n{res}");

		return res_obj;
	}

	//assign an existing test case to a suite
	public static async Task<dynamic> link_test_suite(string plan_id, string suite_id, int case_id, string project_title){
		string url = $"{base_url}{project_title}/_apis/testplan/Plans/{plan_id}/Suites/{suite_id}/TestCase?api-version=7.1";
		var case_dto = new work_item_dto(case_id);
		List<string> pointAssignments = new List<string>();
		List<suite_case_link_dto> content = new List<suite_case_link_dto>();
		var link_dto = new suite_case_link_dto(pointAssignments, case_dto);
		content.Add(link_dto);
		dynamic res = await post_api(url, JsonConvert.SerializeObject(content));
		dynamic res_obj = JObject.Parse(res);
		return res;
	}

	//workflow for creating tests: create test plan, create test suite for each feature, create test case for each valid story, link test case to suite
	public static async Task<dynamic> create_tests(string epic_title, dynamic features, string project_title, string area) {
	
		//test plan
		var new_area = new area_dto(area);
		var new_plan = new create_test_plan_dto(epic_title, new_area.name);
		dynamic test_plan_res = await create_test_plan(new_plan, project_title);
		dynamic test_plan_obj = JObject.Parse(test_plan_res);

		//test suite
		foreach(var feat in features) {
			var new_suite = new create_test_suite_dto((string)feat.feature_title, "StaticTestSuite",new_area);
			dynamic suite_res = await create_test_suite(new_suite, (string)test_plan_obj.id, (string)test_plan_obj.rootSuite.id, project_title);
			foreach(var story in feat.stories) {
				if (!(bool)story.invest_compliant){
					continue;
				}
				//test case + link
				foreach(var scenario in story.test_plan.scenarios){
					dynamic case_res = await create_test_case(project_title, (string)story.title, scenario, area);
					dynamic link_res = await link_test_suite((string)test_plan_obj.id, (string)suite_res.value[0].id, (int)case_res.id, project_title);

				}
			}
		}

		return "done";
	}

}
