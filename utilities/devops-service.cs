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

	//takes project info and epic title and returns an epic reference
	public static async Task<dynamic> get_epics_by_path(string project_title, string title , string iteration) {
		string url = $"{base_url}/{project_title}/{url_params}";
		string query = "{\"query\": \"SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Epic' AND [System.IterationPath] = \'"  + iteration  + "\' AND [System.Title] = \'" + title + "\'\"}";
		dynamic res = await post_api(url, query);
		dynamic res_obj = JObject.Parse(res);
		return res_obj;
	}

	//takes an epic id and returns a list of feature references 
	public static async Task<dynamic> get_features_by_epic(string project_title, string epic_id) {
		dynamic res = await get_api("https://analytics.dev.azure.com/" + org + "/" + project_title + "/_odata/v4.0-preview/workitems/?$filter=WorkItemType eq 'Epic' and WorkItemId eq " + epic_id + "&$select=WorkItemId, Title, WorkItemType&$expand=Children($select=WorkItemId, Title, WorkItemType)");
		dynamic res_obj = JObject.Parse(res);
		var features = res_obj;
		return features;
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
		Console.WriteLine($"response story from features:");

		dynamic res_obj = JObject.Parse(res);
		Console.WriteLine(res_obj);

		/*foreach(var feature in res_obj.value) {*/
		/*	foreach(var story in feature.Children) {*/
		/*		stories.Add(story);*/
		/*	}*/
		/*}*/

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
		return res_obj;
	}

	public static async Task<dynamic> create_test_plan(create_test_plan_dto test_plan, string project_title) {
		string url = $"{base_url}{project_title}/_apis/testplan/plans?api-version=7.1";
		string content = JsonConvert.SerializeObject(test_plan);
		dynamic res = await post_api(url, content);
		Console.WriteLine($"response from create test plan: \n{res}");
		return res;
	}
	public static async Task<dynamic> create_test_suite(create_test_suite_dto suite, string plan_id, string root_id) {
		string url = $"{base_url}{suite.area.name}/_apis/test/Plans/{plan_id}/suites/{root_id}?api-version=5.0";
		string content = JsonConvert.SerializeObject(suite);
		dynamic res = await post_api(url, content);
		Console.WriteLine($"response from create test suite: \n{res}");
		return "done";
	}
	public static async Task<dynamic> create_test_case() {
		return "done";
	}

	public static async Task<dynamic> create_tests(string epic_title, dynamic features, string project_title) {
		
		var new_plan = new create_test_plan_dto(epic_title, project_title);
		dynamic test_plan_res = await create_test_plan(new_plan, project_title);
		dynamic test_plan_obj = JObject.Parse(test_plan_res);

		foreach(var feat in features) {
			var new_area = new area_dto(project_title);
			var new_suite = new create_test_suite_dto((string)feat.feature_title, "StaticTestSuite",new_area);
			await create_test_suite(new_suite, (string)test_plan_obj.id, (string)test_plan_obj.rootSuite.id);
			/*foreach(var story in feat) {*/
			/*	await create_test_case(test_case);*/
			/*}*/
		}

		return "done";
	}

}
