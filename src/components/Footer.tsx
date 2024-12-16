import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-16 pb-8 text-center text-sm text-gray-500">
      <div className="space-x-4 mb-4">
        <Link to="/privacy" className="hover:text-gray-700 underline">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-gray-700 underline">Terms of Service</Link>
      </div>
      <p>This software is owned by ChatSites LLC. Reports are based on public industry averages.</p>
    </footer>
  );
};