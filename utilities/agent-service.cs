using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using dotenv.net;
using GitHub.Copilot.SDK;

namespace TvaInvestValidator.Services;

static class Agent
{
	static string agent_instructions = Environment.GetEnvironmentVariable("AGENT_INSTRUCTIONS") ?? "";
	static string agent_model = Environment.GetEnvironmentVariable("AGENT_MODEL") ?? "gpt-4";

	public static async Task<dynamic> copilot_analyze(dynamic stories, dynamic feature_story_map)
	{
		string stories_json = JsonSerializer.Serialize(stories);
		string content = "{" + "\"instructions\": \"" + agent_instructions + "\", \"stories\": " + stories_json + ", \"feature_story_map\": " + feature_story_map + "}";
		await using var client = new CopilotClient();
		await client.StartAsync();
		
		await using var session = await client.CreateSessionAsync(new SessionConfig
		{
			Model = agent_model,
			OnPermissionRequest = PermissionHandler.ApproveAll,
		});

		var done = new TaskCompletionSource();

		var reply = await session.SendAndWaitAsync(new MessageOptions { Prompt = content }, TimeSpan.FromSeconds(300));
		var message = reply?.Data.Content.Trim(new char[] { '`', 'j', 's', 'o', 'n' }) ?? "";

		Console.WriteLine($"\nAssistant: {message}\n");
		return message;
	}
}
