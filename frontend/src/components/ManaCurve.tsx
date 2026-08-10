import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

interface CardData {
  count?: number;
  manavalue?: number | null;
}

interface ManaCurveProps {
  width: number;
  height: number;
  deck?: CardData[];
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
  value: string;
}

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };

export default function ManaCurve({ width, height, deck = [] }: ManaCurveProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const axesRef = useRef<SVGGElement | null>(null);

  const manaCurveData = useMemo(() => {
    const counts = Array(8).fill(0);

    deck.forEach((card) => {
      const mv = card.manavalue;
      const numCopies = card.count ?? 1;

      if (mv === null || typeof mv === 'undefined') return;

      if (mv >= 7) {
        counts[7] += numCopies;
      } else {
        counts[mv] += numCopies;
      }
    });

    return counts.map((count, i) => ({
      manaValue: i,
      label: i === 7 ? '7+' : String(i),
      count,
    }));
  }, [deck]);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const maxCount = d3.max(manaCurveData, (d: { count: number }) => d.count) ?? 10;

  const yScale = useMemo(() => d3.scaleLinear().domain([0, maxCount]).range([boundsHeight, 0]), [boundsHeight, maxCount]);

  const xScale = useMemo(() => d3.scaleBand().domain(manaCurveData.map((d) => d.label)).range([0, boundsWidth]).padding(0.2), [boundsWidth, manaCurveData]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll('*').remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement.append('g').attr('transform', `translate(0,${boundsHeight})`).call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append('g').call(yAxisGenerator);

    svgElement.append('text').attr('text-anchor', 'middle').attr('x', boundsWidth / 2).attr('y', boundsHeight + MARGIN.bottom - 5).text('Mana Value');

    svgElement.append('text').attr('text-anchor', 'middle').attr('transform', 'rotate(-90)').attr('y', -MARGIN.left + 15).attr('x', -boundsHeight / 2).text('Number of Cards');
  }, [boundsHeight, boundsWidth, xScale, yScale]);

  const allShapes = manaCurveData.map((d, i) => (
    <rect
      key={i}
      x={xScale(d.label) ?? 0}
      y={yScale(d.count)}
      width={xScale.bandwidth() ?? 0}
      height={boundsHeight - yScale(d.count)}
      fill="#69b3a2"
      stroke="#333"
      strokeWidth={0.5}
      onMouseMove={(event) => {
        setTooltip({
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
          label: `Mana Value: ${d.label}`,
          value: `Count: ${d.count}`,
        });
      }}
      onMouseOut={() => setTooltip(null)}
    />
  ));

  return (
    <div className="relative inline-block">
      <svg width={width} height={height}>
        <g width={boundsWidth} height={boundsHeight} transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          {allShapes}
          <g ref={axesRef} />
        </g>
      </svg>
      {tooltip && (
        <div
          className="absolute z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15, whiteSpace: 'nowrap' }}
        >
          <div>{tooltip.label}</div>
          <div>{tooltip.value}</div>
        </div>
      )}
    </div>
  );
}
