import { useMemo, useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 50 };

const ManaCurve = ({ width, height, deck = [] }) => {
  const [tooltip, setTooltip] = useState(null);
  const axesRef = useRef(null);

  // 1. Process the deck data to calculate the mana curve
  const manaCurveData = useMemo(() => {
    // Create 8 buckets for mana values 0 through 7+
    const counts = Array(8).fill(0);

    deck.forEach((card) => {
      const mv = card.manavalue;
      const numCopies = card.count || 1;

      // Skip cards with no mana value (like lands)
      if (mv === null || typeof mv === 'undefined') return;

      if (mv >= 7) {
        counts[7] += numCopies; // Group cards with mana value 7 or higher
      } else {
        counts[mv] += numCopies;
      }
    });

    // Format the data for D3, including a label for the x-axis
    return counts.map((count, i) => ({
      manaValue: i,
      label: i === 7 ? "7+" : String(i),
      count: count,
    }));
  }, [deck]);

  // 2. Setup D3 scales
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const maxCount = d3.max(manaCurveData, d => d.count) || 10;

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, maxCount]).range([boundsHeight, 0]);
  }, [maxCount, boundsHeight]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(manaCurveData.map((d) => d.label))
      .range([0, boundsWidth])
      .padding(0.2);
  }, [manaCurveData, boundsWidth]);

  // 3. Render the axes
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove(); // Clear previous axes

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);

    // Add X-axis label
     svgElement.append("text")
        .attr("text-anchor", "middle")
        .attr("x", boundsWidth / 2)
        .attr("y", boundsHeight + MARGIN.bottom - 5)
        .text("Mana Value");

    // Add Y-axis label
    svgElement.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -MARGIN.left + 15)
        .attr("x", -boundsHeight / 2)
        .text("Number of Cards");

  }, [xScale, yScale, boundsHeight, boundsWidth]);

  // 4. Build the bar shapes
  const allShapes = manaCurveData.map((d, i) => {
    return (
      <rect
        key={i}
        x={xScale(d.label)}
        y={yScale(d.count)}
        width={xScale.bandwidth()}
        height={boundsHeight - yScale(d.count)}
        fill="#69b3a2"
        stroke="#333"
        strokeWidth={0.5}
        onMouseMove={(e) => {
            setTooltip({
              x: e.nativeEvent.offsetX,
              y: e.nativeEvent.offsetY,
              label: `Mana Value: ${d.label}`,
              value: `Count: ${d.count}`,
            });
          }}
        onMouseOut={() => setTooltip(null)}
      />
    );
  });

  return (
    <div className="relative inline-block">
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
          <g ref={axesRef} />
        </g>
      </svg>
      {tooltip && (
        <div
          className="absolute z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15, whiteSpace: "nowrap" }}
        >
          <div>{tooltip.label}</div>
          <div>{tooltip.value}</div>
        </div>
      )}
    </div>
  );
};

export default ManaCurve;