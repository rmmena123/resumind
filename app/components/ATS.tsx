import { cn } from "~/lib/utils";

const GOOD_SCORE_THRESHOLD = 70;
const WARNING_SCORE_THRESHOLD = 50;

type ScoreStatus = "good" | "warning" | "bad";

const getScoreStatus = (score: number): ScoreStatus => {
  if (score >= GOOD_SCORE_THRESHOLD) {
    return "good";
  }
  if (score >= WARNING_SCORE_THRESHOLD) {
    return "warning";
  }
  return "bad";
};

const scoreStatusConfig: Record<
  ScoreStatus,
  { gradientClass: string; icon: string; altText: string }
> = {
  good: {
    gradientClass: "from-green-100",
    icon: "/icons/ats-good.svg",
    altText: "Good score ATS",
  },
  warning: {
    gradientClass: "from-yellow-100",
    icon: "/icons/ats-warning.svg",
    altText: "Warning score ATS",
  },
  bad: {
    gradientClass: "from-red-100",
    icon: "/icons/ats-bad.svg",
    altText: "Bad score ATS",
  },
};

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const status = getScoreStatus(score);
  const { gradientClass, icon, altText } = scoreStatusConfig[status];

  return (
    <div
      className={cn(
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
        gradientClass
      )}
    >
      <div className="flex flex-row gap-4 items-center">
        <img src={icon} alt={altText} className="w-10 h-10" />
        <p className="text-2xl font-semibold">ATS Score - {score}/100</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-xl">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-500">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>
        {suggestions.map((suggestion) => (
          <div
            className="flex flex-row gap-2 items-center"
            key={suggestion.tip}
          >
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt=""
              className="w-4 h-4"
            />
            <p className="text-lg text-gray-500">{suggestion.tip}</p>
          </div>
        ))}
        <p className="text-lg text-gray-500">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
