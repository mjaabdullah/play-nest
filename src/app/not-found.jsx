import Link from "next/link";

const NotFoudPage = () => {
  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-[#0A0F1E] flex flex-col items-center justify-center px-4 text-center">
        {/* 404 number */}
        <h1 className="text-[8rem] md:text-[12rem] font-extrabold text-[#00C853] leading-none select-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          The page you are looking for may have been removed or never existed.
        </p>
        <Link href="/">
          <button className="px-6 py-2 bg-[#00C853] text-white rounded hover:bg-[#00B14F] transition-colors cursor-pointer font-medium">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoudPage;
