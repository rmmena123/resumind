import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Wipe App Data" },
  { name: "description", content: "Wipe all resumes from the app data" },
];

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe", { replace: true });
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  const handleDelete = async () => {
    const deletePromises = files.map((file) => fs.delete(file.path));
    await Promise.all(deletePromises);
    await kv.flush();
    loadFiles();
  };

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="wipe-section mt-10">
        {isLoading && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[350px]" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center">
            <img src="/icons/ats-warning.svg" className="w-[200px]" />
            <p className="text-xl font-semibold">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <h2 className="!text-black font-bold break-words">
              Existing files
            </h2>
            <div className="flex flex-col gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-row gap-4 gradient-border animate-in fade-in duration-1000"
                >
                  <p className="font-medium text-xl">{file.name}</p>
                </div>
              ))}
            </div>
            <div>
              <button
                className="primary-button w-fit text-xl font-semibold"
                onClick={() => handleDelete()}
              >
                Wipe App Data
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default WipeApp;
