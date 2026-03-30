using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using dotenv.net;
using GitHub.Copilot.SDK;
namespace TVA_AI_AGENT.Service;

static class Agent {


	static string agent_instructions = Environment.GetEnvironmentVariable("AGENT_INSTRUCTIONS");
	static string base_url = $"https://api.openai.com/v1/responses";
	static string url_params = "_apis/wit/wiql?api-version=7.0";
	static string open_ai_token = Environment.GetEnvironmentVariable("AGENT_KEY");

	public static async Task<dynamic> get_open_ai(string url, string content) {
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Authorization", $"Bearer {open_ai_token}");
		HttpResponseMessage response = await client.PostAsync(url, new StringContent(content, Encoding.UTF8, "application/json"));
		var body = await response.Content.ReadAsStringAsync();
		return body;
	}

	public static async Task<dynamic> analyze_story(dynamic stories) {
		string content = "{"  + "\"instructions\": \"" + agent_instructions+ "\", \"input\": "+ stories[0] +  "}";
		Console.WriteLine($"json sent: \n{content}");
		dynamic res = await get_open_ai(base_url, stories[0]);
		return res;
	}


	public static async Task<dynamic> copilot_analyze(dynamic stories) {
		string stories_json = JsonSerializer.Serialize(stories);
		string content = "{"  + "\"instructions\": \"" + agent_instructions+ "\", \"stories\": "+ stories_json +  "}";
		await using var client = new CopilotClient();
		await client.StartAsync();
		
		await using var session = await client.CreateSessionAsync(new SessionConfig {
				Model = "claude sonnet 4.5",
				OnPermissionRequest = PermissionHandler.ApproveAll,
				});

		var done = new TaskCompletionSource();

		var reply = await session.SendAndWaitAsync(new MessageOptions { Prompt = content }, TimeSpan.FromSeconds(300));
		var message = reply?.Data.Content.Trim(new char[] {'`', 'j', 's', 'o', 'n'});

		/*dynamic message_obj = JObject.Parse(message);*/
		/*var message_info = message_obj.GetType().GetProperties();*/
		/*foreach( var prop in message_info) {*/
		/*	Console.WriteLine($"message property: {prop}");*/
		/*}*/
		Console.WriteLine($"\nAssistant: {message}\n");
		return message;


	}

}
