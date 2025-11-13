'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ApiErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error');  

  return (
    <div className="min-h-screen  text-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black rounded-lg shadow-xl p-8 space-y-6 ">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h1 className="mt-4 text-3xl font-extrabold text-white">{process.env.NEXT_PUBLIC_APP_NAME }  Auth Error</h1>
        </div>

        <p className="text-lg text-gray-300 text-center leading-relaxed">
          We encountered an issue while processing your request. Please try again or contact the application owner if the problem persists.
        </p>

        {errorCode && (
          <div className="text-center mt-4">
            <span className="inline-block bg-gray-700 text-gray-400 text-sm px-3 py-1 rounded-full font-mono">
              Error Code: {errorCode}
            </span>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Link href={"/"} passHref>
            <button className="px-6 py-3 cursor-pointer bg-gray-800 hover:bg-gray-800 text-white font-semibold rounded-md shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-75">
              Return to Application
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ApiErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen text-gray-100 flex items-center justify-center p-4"><div>Loading...</div></div>}>
      <ApiErrorContent />
    </Suspense>
  );
} 