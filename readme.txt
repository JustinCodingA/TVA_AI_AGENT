basic usage = analyze/{project_title}/{epic_title}/{iteration}
for now returns the epic and its features, currently working on creating taking each story

structure env file like: 

ORGANIZATION="{organization_title}"
PAT="{your_pat}"

for dependencies: 
	run dotnet add package {package} for each: 
		packages: 
			Newtonsoft.Json
			dotenv.net
