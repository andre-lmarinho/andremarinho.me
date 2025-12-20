import type { CSSProperties } from 'react';

import { cn } from '@/utils/cn';

type ResponseOption = {
  label: string;
  value: number;
  color?: string;
};

type SurveyDonutCardProps = {
  heading: string;
  question: string;
  responses: ResponseOption[];
  className?: string;
};

type ChartSegment = {
  color: string;
  startPercent: number;
  endPercent: number;
  midAngle: number;
  label: string;
  percent: number;
};

const DEFAULT_COLORS = ['#00c12b', '#8ed3a4', '#b8e3c1'];
const START_ANGLE_DEG = 90;
const BASE_CHART_SIZE = 240;
const SCALE_REFERENCE = BASE_CHART_SIZE;
const CHART_SIZE = 'clamp(200px, 32vw, 280px)';
const RADIUS = BASE_CHART_SIZE / 2;
const DONUT_THICKNESS = 56;
const INNER_DIAMETER = BASE_CHART_SIZE - DONUT_THICKNESS * 2;
const LABEL_X_OFFSET = BASE_CHART_SIZE + 30;

const formatPercent = (percent: number) => {
  const rounded = Math.round(percent * 10) / 10;

  if (Number.isInteger(rounded)) {
    return `${rounded.toFixed(0)}%`;
  }

  return `${rounded.toFixed(1)}%`;
};

const buildSegments = (responses: ResponseOption[]): ChartSegment[] => {
  if (responses.length === 0) {
    throw new Error('SurveyDonutCard requires at least one response.');
  }

  if (responses.length > 3) {
    throw new Error('SurveyDonutCard supports up to three responses.');
  }

  const validResponses = responses.filter(({ value }) => value > 0);

  if (validResponses.length === 0) {
    throw new Error('SurveyDonutCard responses must include a positive value.');
  }

  const total = validResponses.reduce((sum, { value }) => sum + value, 0);

  if (total === 0) {
    throw new Error('SurveyDonutCard requires a non-zero total to render the chart.');
  }

  let cursorPercent = 0;

  return validResponses.map((response, index) => {
    const percent = (response.value / total) * 100;
    const startPercent = cursorPercent;
    const endPercent = cursorPercent + percent;
    const midAngle = START_ANGLE_DEG + ((startPercent + percent / 2) / 100) * 360;

    cursorPercent = endPercent;

    return {
      color: response.color ?? DEFAULT_COLORS[index],
      startPercent,
      endPercent,
      midAngle,
      label: response.label,
      percent,
    };
  });
};

const LabelPill = ({
  segment,
  className,
  style,
}: {
  segment: ChartSegment;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-3 rounded-full bg-zinc-200 px-5 py-2 text-lg font-semibold text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
        'dark:bg-zinc-800/80 dark:text-zinc-50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]',
        className
      )}
      style={style}
    >
      <span className="text-base text-zinc-900 dark:text-zinc-50">
        {formatPercent(segment.percent)} {segment.label}
      </span>
    </div>
  );
};

export const SurveyDonutCard = ({
  heading,
  question,
  responses,
  className,
}: SurveyDonutCardProps) => {
  const segments = buildSegments(responses);
  const gradientStops = segments
    .map((segment) => `${segment.color} ${segment.startPercent}% ${segment.endPercent}%`)
    .join(', ');

  const labelSpacing = 58;
  const baseLabelY = RADIUS - ((segments.length - 1) * labelSpacing) / 2;
  const chartVars: CSSProperties & {
    '--survey-chart-size': string;
    '--survey-scale': string;
  } = {
    '--survey-chart-size': `${CHART_SIZE}px`,
    '--survey-scale': `calc(var(--survey-chart-size) / ${SCALE_REFERENCE}px)`,
  };

  return (
    <section
      className={cn(
        'rounded-3xl bg-zinc-50 p-10 text-zinc-900 shadow-sm ring-1 ring-zinc-100',
        'dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-800',
        className
      )}
    >
      <div className="grid grid-cols-2 items-center gap-10">
        <div className="space-y-2">
          <p className="text-sm leading-tight font-semibold text-zinc-900 sm:text-xl dark:text-zinc-100">
            {heading}
          </p>
          <p className="text-xs leading-tight text-zinc-600 sm:text-2xl dark:text-zinc-400">
            {question}
          </p>
        </div>

        <div className="flex items-center gap-4" style={chartVars}>
          <div
            aria-label={`${heading} – ${question}`}
            role="img"
            className="relative shrink-0"
            style={
              {
                width: 'var(--survey-chart-size)',
                height: 'var(--survey-chart-size)',
              } as CSSProperties
            }
          >
            <div
              aria-hidden
              className="h-full w-full rounded-full"
              style={{ background: `conic-gradient(from ${START_ANGLE_DEG}deg, ${gradientStops})` }}
            />
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 rounded-full bg-white shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-800"
              style={{
                width: `calc(var(--survey-scale) * ${INNER_DIAMETER}px)`,
                height: `calc(var(--survey-scale) * ${INNER_DIAMETER}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          <div
            className="relative"
            style={
              {
                height: 'var(--survey-chart-size)',
                width: `calc(var(--survey-scale) * ${LABEL_X_OFFSET + 60}px)`,
              } as CSSProperties
            }
          >
            {segments.map((segment, index) => {
              const top = Math.min(
                Math.max(baseLabelY + index * labelSpacing, 18),
                BASE_CHART_SIZE - 18
              );

              return (
                <LabelPill
                  key={`${segment.label}-${segment.percent}`}
                  segment={segment}
                  className="absolute -translate-y-1/2"
                  style={{
                    left: `calc(var(--survey-scale) * ${LABEL_X_OFFSET}px)`,
                    top: `calc(var(--survey-scale) * ${top}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
