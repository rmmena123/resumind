import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

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

const scoreColorConfig: Record<ScoreStatus, { textColor: string }> = {
  good: { textColor: "text-badge-green-text" },
  average: { textColor: "text-badge-yellow-text" },
  bad: { textColor: "text-badge-red-text" },
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const status = getScoreStatus(score);
  const { textColor } = scoreColorConfig[status];

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center max-[375px]:flex-col max-[375px]:items-start">
          <p className="text-2xl max-sm:text-xl">{title}</p>
          <ScoreBadge score={score} />
        </div>

        <p className={`text-2xl font-semibold ${textColor}`}>{score}</p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  const summaryCategories = [
    { title: "Tone & Style", score: feedback.toneAndStyle.score },
    { title: "Content", score: feedback.content.score },
    { title: "Structure", score: feedback.structure.score },
    { title: "Skills", score: feedback.skills.score },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8 max-[450px]:flex-wrap">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below
          </p>
        </div>
      </div>

      {summaryCategories.map((category) => (
        <Category key={category.title} {...category} />
      ))}
    </div>
  );
};

export default Summary;
