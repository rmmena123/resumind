import { prepareInstructions } from "../../constants";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2image";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

interface UploadProps {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
}

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: UploadProps) => {
    setIsProcessing(true);
    setError(null);

    try {
      setStatusText("Uploading the file...");
      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) {
        throw new Error("Failed to upload file");
      }

      setStatusText("Converting to image...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file) {
        throw new Error("Failed to convert PDF to image");
      }

      setStatusText("Uploading the image...");
      const uploadedImage = await fs.upload([imageFile.file]);
      if (!uploadedImage) {
        throw new Error("Failed to upload image");
      }

      setStatusText("Preparing data...");
      const uuid = generateUUID();
      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analyzing...");
      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );
      if (!feedback) {
        throw new Error("Failed to analyze resume");
      }

      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;
      data.feedback = JSON.parse(feedbackText);
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete, redirecting...");

      navigate(`/resume/${uuid}`);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      setIsProcessing(false);
      setStatusText("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) {
      setError("Please select a resume file to upload.");
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" alt="" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <fieldset
                disabled={isProcessing}
                className="flex flex-col gap-4 w-full"
              >
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="Company Name"
                    id="company-name"
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="Job Title"
                    id="job-title"
                    required
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    rows={5}
                    name="job-description"
                    placeholder="Job Description"
                    id="job-description"
                    required
                  />
                </div>

                <div className="form-div">
                  <label htmlFor="uploader">Upload Resume</label>
                  <FileUploader file={file} onFileChange={onFileChange} />
                </div>

                <button
                  className="primary-button"
                  type="submit"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Analyzing..." : "Analyze Resume"}
                </button>
              </fieldset>
            </form>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
