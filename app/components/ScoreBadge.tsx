import { cn } from "~/lib/utils";

const GOOD_SCORE_THRESHOLD = 70;
const AVERAGE_SCORE_THRESHOLD = 50;

type ScoreStatus = "good" | "average" | "bad";

const getScoreStatus = (score: number): ScoreStatus => {
  if (score >= GOOD_SCORE_THRESHOLD) {
    return "good";
  }
  if (score >= AVERAGE_SCORE_THRESHOLD) {
    return "average";
  }
  return "bad";
};

const scoreConfig: Record<ScoreStatus, { className: string; text: string }> = {
  good: {
    className: "bg-badge-green text-badge-green-text",
    text: "Strong",
  },
  average: {
    className: "bg-badge-yellow text-badge-yellow-text",
    text: "Good Start",
  },
  bad: {
    className: "bg-badge-red text-badge-red-text",
    text: "Needs Work",
  },
};

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const status = getScoreStatus(score);
  const { className, text } = scoreConfig[status];

  return (
    <div className={cn("px-3 py-1 rounded-full", className)}>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

export default ScoreBadge;
