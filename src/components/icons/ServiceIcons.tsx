import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function IconBase({ size = 48, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BoilerIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="6" y="2" width="12" height="17" rx="2" />
      <path d="M8.5 19v1.5a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V19" />
      <path d="M13.5 19v1.5a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V19" />
      <path d="M12 7c-1.2 1.4-1.8 2.4-1.8 3.2a1.8 1.8 0 0 0 3.6 0c0-.8-.6-1.8-1.8-3.2z" />
      <path d="M12 15.5h.01" />
    </IconBase>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
    </IconBase>
  );
}

export function HeatingHouseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M10.5 11c-.8.8-.8 1.7 0 2.5s.8 1.7 0 2.5" />
      <path d="M13.5 11c-.8.8-.8 1.7 0 2.5s.8 1.7 0 2.5" />
    </IconBase>
  );
}
