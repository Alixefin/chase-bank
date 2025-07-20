import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: '1' | '2';
}

export function Logo({ className, variant = '1', ...props }: LogoProps) {
  const src = variant === '2' ? '/img/logo2.png' : '/img/logo.png';
  return (
    <div className={cn('relative w-8 h-8', className)} {...props}>
      <Image
        src={src}
        alt="Chase Bank Logo"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}
