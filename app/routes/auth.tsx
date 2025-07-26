import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rawNext = searchParams.get("next");
  const isValidRedirect =
    rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//");
  const nextUrl = isValidRedirect ? rawNext : "/";

  useEffect(() => {
    if (auth.isAuthenticated) navigate(nextUrl, { replace: true });
  }, [auth.isAuthenticated, nextUrl, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue your Job Journey</h2>
          </div>

          {isLoading ? (
            <button className="auth-button animate-pulse">
              <p>Signing you in...</p>
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <button className="auth-button" onClick={auth.signOut}>
                  <p>Log Out</p>
                </button>
              ) : (
                <button className="auth-button" onClick={auth.signIn}>
                  <p>Log In</p>
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Auth;
