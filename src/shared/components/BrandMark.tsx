interface BrandMarkProps {
  size?: number;
}

export function BrandMark({ size = 28 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M16 3 28 9.5v13L16 29 4 22.5v-13Z" />
      <path d="M16 3v26M4 9.5l12 6 12-6M4 22.5l12-6 12 6" />
    </svg>
  );
}
