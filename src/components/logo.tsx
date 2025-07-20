import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="currentColor"
        {...props}
    >
        <title>Chase Bank Logo</title>
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/>
        <path d="M12.5,7H11v6l5.25,3.15l0.75-1.23l-4.5-2.67V7z"/>
    </svg>
  );
}
