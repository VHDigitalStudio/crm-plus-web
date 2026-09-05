export interface DonutSegment {
  value: number;
  toneClass: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
}

export function DonutChart({ segments, size = 64, strokeWidth = 9 }: DonutChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const cumulativeFractions = segments.reduce<number[]>((offsets, segment, index) => {
    const previous = index === 0 ? 0 : offsets[index - 1];
    offsets.push(previous + segment.value / total);
    return offsets;
  }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-surface-elevated"
      />
      {segments.map((segment, index) => {
        const fraction = segment.value / total;
        const dash = fraction * circumference;
        const previousFraction = index === 0 ? 0 : cumulativeFractions[index - 1];
        const dashOffset = -previousFraction * circumference;

        return (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={dashOffset}
            className={segment.toneClass}
          />
        );
      })}
    </svg>
  );
}
