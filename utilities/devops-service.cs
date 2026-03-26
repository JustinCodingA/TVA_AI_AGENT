/*using System.Net.Http.Json*/
using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;
using dotenv.net;

namespace TVA_AI_AGENT.Service;


//TODO: write all devops related methods here ie. fetch stories, insert tests, etc.
static class ADO {

	static string org = Environment.GetEnvironmentVariable("ORGANIZATION");
	static string pat = Environment.GetEnvironmentVariable("PAT");
	static string base_url = $"https://dev.azure.com/{org}/";
	static string url_params = "_apis/wit/wiql?api-version=7.0";

	public static async Task<dynamic> get_api(string url) {
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Authorization", $"Bearer {pat}");
		HttpResponseMessage response = await client.GetAsync(url);
		var body = await response.Content.ReadAsStringAsync();
		return body;
	}

	public static async Task<dynamic> post_api(string project, string query) {
		string url = $"{base_url}/{project}/{url_params}";
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Authorization", $"Bearer {pat}");
		var req_body = new StringContent(query, Encoding.UTF8, "application/json");
		HttpResponseMessage response = await client.PostAsync(url, req_body);
		var body = await response.Content.ReadAsStringAsync();
		return body;
	}


	public static async Task<dynamic> get_epics_by_path(string project, string title , string iteration) {
		string query = "{\"query\": \"SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Epic' AND [System.IterationPath] = \'"  + iteration  + "\' AND [System.Title] = \'" + title + "\'\"}";
		dynamic res = await post_api(project, query);
		dynamic res_obj = JObject.Parse(res);
		return res_obj;
	}

	public static async Task<dynamic> get_features_by_epic(string project_title, string epic_id) {
		dynamic res = await get_api("https://analytics.dev.azure.com/" + org + "/" + project_title + "/_odata/v4.0-preview/workitems/?$filter=WorkItemType eq 'Epic' and WorkItemId eq " + epic_id + "&$select=WorkItemId, Title, WorkItemType&$expand=Children($select=WorkItemId, Title, WorkItemType)");
		dynamic res_obj = JObject.Parse(res);
		var features = res_obj;
		return features;
	}

	public static async Task<dynamic> get_stories_by_features(dynamic features) {
		List<dynamic> stories = new List<dynamic>();
		return "";
	}

}
