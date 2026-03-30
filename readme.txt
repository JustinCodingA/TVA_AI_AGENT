basic usage:
	-analyze/{project_title}/{epic_title}/{iteration}
		for now returns the epic and its features, currently working on creating taking each story

	-Example, try running the url: http://localhost:5031/analyze/POC%20-%20UTC%20CAPSTONE/Payments%20&%20Monetization/POC%20-%20UTC%20CAPSTONE

	-Make sure to use url encoding chars such as %20 for space and %5C for '\' etc.

	-For this current version, make sure the iteration is included


Structure .env file exaclty like: 
	ORGANIZATION="{azure_devops_organization_title}" (assume case sensitive for now)
	PAT="{your_personal_access_token}"
	AGENT_INSTRUCTIONS="You are an analyst for a software development team. Your task is to analyze a given user story pulled from an Azure DevOps project and test it against the INVEST model. If the story is INVEST compiant, return a BDD/Gherkin test plan. Otherwise, return the issues found in the story and a suggested fix. Assume a story is compliant to begin and only say otherwise for very good reasons. Return only the suggested fixes or the test plan, given the decision made." 
	!!NOTE - Current agent instructions needs work. Still too sensitive and is non-compliance flagging valid stories. Inconsistent behavior for a single story run mutiple times. Adjust this as needed.


For dependencies: 
	run dotnet add package {package} for each: 
		packages: 
			Newtonsoft.Json
			dotenv.net
			GitHub.Copilot.SDK

For Agent setup:
	install github copilot-cli
	login to copilot cli
