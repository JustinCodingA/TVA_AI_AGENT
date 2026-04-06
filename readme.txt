Getting Started: 

Install dependencies: 
	run dotnet add package {package} for each: 
		Newtonsoft.Json
		dotenv.net
		GitHub.Copilot.SDK

Complete Agent setup:
	install github copilot-cli
	login to copilot cli

Create and structure .env file exactly like within project root: 
	ORGANIZATION="{azure_devops_organization_title}" 
	PAT="{your_personal_access_token}"
	AGENT_INSTRUCTIONS="{Updated Prompt}" 
	AGENT_MODEL="{model}"

Select the most recent prompt from this document:
https://docs.google.com/document/d/11osk-FNgkc4PpRi0in43gouQsyGPZAZMBG7xsugeus8/edit?usp=sharing

Select a model from this list: 
https://docs.github.com/en/copilot/reference/ai-models/supported-models
recommended model: gemini 3.1 pro

basic usage:
	-analyze/{project_title}/{epic_title}/{area}

	-Example, try running the url: http://localhost:5031/analyze/POC%20-%20UTC%20CAPSTONE/Payments%20&%20Monetization/POC%20-%20UTC%20CAPSTONE

	-filter by tags with 'tags' parameter eg. ?tags=1,2,3

	-Make sure to use url encoding %5C for '\' eg. area path: test/path -> test\\path -> test%5C%5Cpath



NOTES:

- Make sure the prompt is the most recent prompt available. The success of the operation depends on the agent returning a properly structured response

- Agent may return invalid response in rare occurances, which throws a parse error and returns. Simply run again for a new attempt 

- Copilot may hang up from time to time. Just run again

- Just because a story is considered valid at one time, doesnt mean it will always come back validated if run multiple times. Its a consistent model but it is still an ai and nondeterminism is a feature



