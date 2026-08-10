import { useMemo, useState } from 'react';
import * as d3 from 'd3';

interface CardData {
  count?: number;
  colors?: string;
}

interface ColorPieProps {
  width: number;
  height: number;
  deck?: CardData[];
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: number;
}

const MARGIN = 30;

const mtgColorMap: Record<string, string> = {
  W: '#FFFFFF',
  U: '#0066CC',
  B: '#000000',
  R: '#E60000',
  G: '#00A86B',
};

const mtgColorNames: Record<string, string> = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
};

export default function ColorPie({ width, height, deck = [] }: ColorPieProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const radius = Math.min(width, height) / 2 - MARGIN;

  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = { W: 0, U: 0, B: 0, R: 0, G: 0 };

    deck.forEach((card) => {
      const numCopies = card.count ?? 1;

      if (!card.colors) return;

      const matchedColors = card.colors.match(/[WUBRG]/g);

      if (matchedColors) {
        matchedColors.forEach((color) => {
          if (Object.prototype.hasOwnProperty.call(counts, color)) {
            counts[color] += numCopies;
          }
        });
      }
    });

    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .filter((d) => d.value > 0);
  }, [deck]);

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<{ label: string; value: number }>().value((d: { label: string; value: number }) => d.value);
    return pieGenerator(colorCounts);
  }, [colorCounts]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc<d3.DefaultArcObject>();
    return pie.map((p: d3.PieArcDatum<{ label: string; value: number }>) =>
      arcPathGenerator({
        innerRadius: 0,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [pie, radius]);

  return (
    <div className="relative inline-block">
      <svg width={width} height={height} onMouseLeave={() => setTooltip(null)}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc: string | null, i: number) => {
            const colorData = colorCounts[i];
            return (
              <path
                key={i}
                d={arc ?? undefined}
                fill={colorData ? mtgColorMap[colorData.label] || '#CCCCCC' : '#CCCCCC'}
                stroke="#1a1a1a"
                strokeWidth={1}
                onMouseMove={(event) => {
                  if (!colorData) return;
                  setTooltip({
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                    label: mtgColorNames[colorData.label],
                    value: colorData.value,
                  });
                }}
                onMouseOut={() => setTooltip(null)}
              />
            );
          })}
        </g>
      </svg>
      {tooltip && (
        <div
          className="absolute z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15, whiteSpace: 'nowrap' }}
        >
          {tooltip.label}: {tooltip.value}
        </div>
      )}
    </div>
  );
}
