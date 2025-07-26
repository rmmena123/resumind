const GOOD_SCORE_THRESHOLD = 70;
const AVERAGE_SCORE_THRESHOLD = 50;

type ScoreStatus = "good" | "average" | "bad";

const getScoreStatus = (score: number): ScoreStatus => {
  if (score >= GOOD_SCORE_THRESHOLD) return "good";
  if (score >= AVERAGE_SCORE_THRESHOLD) return "average";
  return "bad";
};

const ScoreCircle = ({ score = 0 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="relative w-[100px] h-[100px]"
      role="img"
      aria-label={`Score: ${score} out of 100`}
    >
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Partial circle with gradient */}
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF97AD" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>

      {/* Score and issues */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-semibold text-sm">{`${score}/100`}</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
