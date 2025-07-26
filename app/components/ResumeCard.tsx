import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  const title = companyName || jobTitle || "Resume";
  const subtitle = companyName && jobTitle ? jobTitle : null;
  const altText = `Preview of resume for ${title}${
    subtitle ? ` (${subtitle})` : ""
  }`;

  useEffect(() => {
    let url: string | undefined;
    const loadResume = async () => {
      const blob = await fs.read(imagePath);

      if (!blob) {
        return;
      }

      url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imagePath, fs]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{title}</h2>
          {subtitle && (
            <h3 className="text-lg break-words text-gray-500">{subtitle}</h3>
          )}
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt={altText}
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
