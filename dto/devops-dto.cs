namespace TVA_AI_AGENT.dto;
	public record area_dto(string name);
	//names must match devops expected payload
	public record create_test_plan_dto(string name, string areaPath);

	public record create_test_suite_dto(string name, string suiteType, area_dto area);

	public record create_test_case_dto(string name);

	public record patch_json(string op, string path, string value);

	public record work_item_dto(int id);
	public record suite_case_link_dto(List<string> pointAssignments, work_item_dto workItem);





