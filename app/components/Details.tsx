import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

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

const ScoreBadge = ({ score }: { score: number }) => {
  const status = getScoreStatus(score);
  const badgeColor =
    status === "good"
      ? "bg-badge-green"
      : status === "average"
      ? "bg-badge-yellow"
      : "bg-badge-red";
  const textColor =
    status === "good"
      ? "text-badge-green-text"
      : status === "average"
      ? "text-badge-yellow-text"
      : "text-badge-red-text";

  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        badgeColor
      )}
    >
      <img
        src={status === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
        alt=""
        className="size-4"
      />
      <p className={cn("text-sm font-medium", textColor)}>{score}/100</p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {tips.map((tip) => (
          <div className="flex flex-row gap-2 items-center" key={tip.tip}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt=""
              className="size-5"
            />
            <p className="text-xl text-gray-500 ">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip) => (
          <div
            key={tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4",
              tip.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt=""
                className="size-5"
              />
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const accordionCategories = [
    {
      id: "tone-style",
      title: "Tone & Style",
      data: feedback.toneAndStyle,
    },
    {
      id: "content",
      title: "Content",
      data: feedback.content,
    },
    {
      id: "structure",
      title: "Structure",
      data: feedback.structure,
    },
    {
      id: "skills",
      title: "Skills",
      data: feedback.skills,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        {accordionCategories.map(({ id, title, data }) => (
          <AccordionItem id={id} key={id}>
            <AccordionHeader itemId={id}>
              <CategoryHeader title={title} categoryScore={data.score} />
            </AccordionHeader>
            <AccordionContent itemId={id}>
              <CategoryContent tips={data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
