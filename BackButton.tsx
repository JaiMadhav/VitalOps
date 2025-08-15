import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({ 
  fallbackPath = '/', 
  className = '',
  children 
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's a previous page in history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to a specific path if no history
      navigate(fallbackPath);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleBack}
      className={className}
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {children || 'Back'}
    </Button>
  );
}
