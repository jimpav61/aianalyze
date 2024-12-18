interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="w-full h-[700px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">{message}</p>
        <button 
          onClick={onRetry} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};