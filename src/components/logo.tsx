import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  // You can add any additional props you might need for the logo
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={cn('relative w-8 h-8', className)} {...props}>
      <Image
        src="/img/logo.png"
        alt="Chase Bank Logo"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}
