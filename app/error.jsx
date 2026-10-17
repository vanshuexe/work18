"use client";

export default function ErrorPage({ reset }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p>Please try loading this page again.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-purple-700 text-white rounded-xl"
      >
        Try again
      </button>
      <a href="/" className="text-purple-700">
        Back to home
      </a>
    </main>
  );
}
