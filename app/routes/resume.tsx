import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

interface PageData {
  imageUrl: string;
  resumeUrl: string;
  feedback: Feedback;
}

type PageState =
  | { status: "loading"; data?: null; error?: null }
  | { status: "success"; data: PageData; error?: null }
  | { status: "error"; data?: null; error: string };

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`, { replace: true });
    }
  }, [isLoading, auth.isAuthenticated, navigate, id]);

  useEffect(() => {
    // Guard to prevent running on server or before id is available
    if (!id) return;

    let objectUrls: string[] = [];

    const loadResume = async () => {
      setPageState({ status: "loading" });
      try {
        const resume = await kv.get(`resume:${id}`);
        if (!resume) {
          throw new Error("Resume not found.");
        }

        const data = JSON.parse(resume);
        const resumeBlob = await fs.read(data.resumePath);
        if (!resumeBlob) {
          throw new Error("Could not read resume file.");
        }

        const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        objectUrls.push(resumeUrl);

        const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) {
          throw new Error("Could not read resume image.");
        }

        const imageUrl = URL.createObjectURL(imageBlob);
        objectUrls.push(imageUrl);

        setPageState({
          status: "success",
          data: {
            imageUrl,
            resumeUrl,
            feedback: data.feedback,
          },
        });
      } catch (e) {
        const error =
          e instanceof Error ? e.message : "An unknown error occurred.";
        setPageState({ status: "error", error });
      }
    };

    loadResume();

    // Cleanup function to revoke object URLs on unmount
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [id, kv, fs]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="Back icon" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {pageState.status === "loading" && (
            <img
              src="/images/resume-scan-2.gif"
              alt="loading..."
              className="w-full"
            />
          )}
          {pageState.status === "success" && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a
                href={pageState.data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={pageState.data.imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  alt="Pré-visualização do currículo"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          {pageState.status === "loading" && (
            <img
              src="/images/resume-scan-2.gif"
              alt="loading..."
              className="w-full"
            />
          )}
          {pageState.status === "success" && (
            <>
              <h2 className="text-4xl !text-black font-bold">Resume Review</h2>

              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={pageState.data.feedback} />
                <ATS
                  score={pageState.data.feedback.ATS.score || 0}
                  suggestions={pageState.data.feedback.ATS.tips || []}
                />
                <Details feedback={pageState.data.feedback} />
              </div>
            </>
          )}
          {pageState.status === "error" && (
            <div className="text-center text-red-600">
              <h2 className="text-2xl font-bold">Error</h2>
              <p>{pageState.error}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
