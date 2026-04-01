namespace TVA_AI_AGENT.dto;
	//names must match devops expected payload
	public record create_test_plan_dto(string name, string areaPath);

	public record area_dto(string name);
	public record create_test_suite_dto(string name, string suiteType, area_dto area);

	public record create_test_case_dto(string name);





