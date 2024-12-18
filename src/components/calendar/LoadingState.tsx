export const LoadingState = () => {
  return (
    <div className="w-full h-[700px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading calendar...</p>
      </div>
    </div>
  );
};