import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="text-[120px] font-black text-slate-200 leading-none mb-4 select-none">404</div>
      <h1 className="text-3xl font-extrabold text-slate-800 mb-4">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved to a different URL.</p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <Home className="mr-2" size={20} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
