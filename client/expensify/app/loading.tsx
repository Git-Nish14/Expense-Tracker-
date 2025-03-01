export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 md:border-6 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm md:text-lg text-gray-600 dark:text-gray-300">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
