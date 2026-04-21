import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant = 'primary', icon, onClick, className }: Props) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-semibold transition-all duration-200';

  const variants = {
    primary: 'bg-[#E8B84B] text-[#0A0A0B] hover:bg-[#f0c966] hover:shadow-[0_0_24px_rgba(232,184,75,0.5)]',
    ghost: 'bg-white/10 text-[#F0EDE8] hover:bg-white/20 backdrop-blur-sm',
    outline: 'border border-[#E8B84B]/40 text-[#E8B84B] hover:bg-[#E8B84B]/10',
  };

  return (
    <button onClick={onClick} className={cn(base, variants[variant], className)}>
      {icon}
      {children}
    </button>
  );
}