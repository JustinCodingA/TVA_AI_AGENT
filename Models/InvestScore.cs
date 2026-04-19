namespace TvaInvestValidator.Models
{
    public class InvestCriterion
    {
        public string Name { get; set; } = string.Empty;
        public int Score { get; set; }
        public string Feedback { get; set; } = string.Empty;
        public List<string> Suggestions { get; set; } = new List<string>();
    }

    public class InvestScore
    {
        public InvestCriterion Independent { get; set; } = new();
        public InvestCriterion Negotiable { get; set; } = new();
        public InvestCriterion Valuable { get; set; } = new();
        public InvestCriterion Estimable { get; set; } = new();
        public InvestCriterion Small { get; set; } = new();
        public InvestCriterion Testable { get; set; } = new();

        public int CalculateOverallScore()
        {
            var scores = new[] {
                Independent.Score,
                Negotiable.Score,
                Valuable.Score,
                Estimable.Score,
                Small.Score,
                Testable.Score
            };
            return (int)Math.Round(scores.Average());
        }

        public string GetScoreColor(int score)
        {
            if (score >= 80) return "success";
            if (score >= 60) return "warning";
            return "danger";
        }

        public string GetScoreIcon(int score)
        {
            if (score >= 80) return "✓";
            if (score >= 60) return "!";
            return "✗";
        }
    }
}
