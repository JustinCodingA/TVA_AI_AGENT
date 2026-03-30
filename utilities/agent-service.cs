using System;
using System.Net.Http;
using System.Text;
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
		string content = "{"  + "\"instructions\": \"" + agent_instructions+ "\", \"input\": "+ stories[0] +  "}";
		await using var client = new CopilotClient();
		await client.StartAsync();
		
		await using var session = await client.CreateSessionAsync(new SessionConfig {
				Model = "gpt-5",
				OnPermissionRequest = PermissionHandler.ApproveAll,
				});

		var done = new TaskCompletionSource();

		var reply = await session.SendAndWaitAsync(new MessageOptions { Prompt = content });
		var message = reply?.Data.Content;
		Console.WriteLine($"\nAssistant: {message}\n");
		return message;


	}

}
