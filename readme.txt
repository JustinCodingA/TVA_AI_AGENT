Getting Started: 

Install dependencies: 
	*this application was built and tested with dotnet version 10.0.103*
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

Final Prompt(Adjust if needed but do not change the structure of the output):
"You are an analyst for a software development team. Your task is to analyze a given list of user stories pulled from an Azure DevOps project and test it against the INVEST model. For each story: If the story is INVEST compliant, return a BDD/Gherkin test plan. Otherwise, return the issues found in the story and a suggested fix. Assume a story is compliant to begin with and only say otherwise for very good reasons. Do not be pedantic. Find only very obvious issues. For each story, create a json object structured as such: {title: string, id: string, feature_id: string,  invest_compliant: boolean, comments: string, test_plan?: test_plan}. The test_plan object should be like {scenarios: scenario[]}. Scenario is {steps: string[]}. Stories should be organized into their respective features where feature is defined as: {feature_id: string, feature_title: string, stories: story[]}. The final response should be {suites: feature[]}. Return only a raw json object with pretty formatting. DO NOT INCLUDE A SUMMARY IN THE RESPONSE. DO NOT INCLUDE A SUMMARY OF ANY KIND IN THE RESPONSE. JUST THE SPECIFIED JSON"
	 

Select a model from this list: 
https://docs.github.com/en/copilot/reference/ai-models/supported-models
recommended model: gemini 3.1 pro

basic usage:
	-analyze/{project_title}/{epic_title}/{area}

	-Example, try running the url: http://localhost:5031/analyze/POC%20-%20UTC%20CAPSTONE/Payments%20&%20Monetization/POC%20-%20UTC%20CAPSTONE

	-filter by tags with 'tags' parameter eg. ?tags=1,2,3

	-Make sure to use url encoding %5C for '\' eg. area path: test\path -> test\\path -> test%5C%5Cpath



NOTES:
-This application needs to be connected to a valid AzureDevops Organization with epic/feature/user-story project structure

- Agent may return invalid response in rare occurances, which throws a parse error and returns. Simply run again for a new attempt 

- Copilot may hang up from time to time. Just run again

- Just because a story is considered valid at one time, doesnt mean it will always come back validated if run multiple times. Its a consistent model but it is still an ai and nondeterminism is a feature

- copilot sdk will default to the cli login auth. It does also support env variable api key auth. The application has not been tested with that setup. Visit the copilot auth support page for more details 

- For support, questions, inquiries, you contact me at burlaka1140@gmail.com




