import { useMemo, useState } from "react";
import * as d3 from "d3";

const MARGIN = 30;

const mtgColorMap = {
  W: "#FFFFFF",
  U: "#0066CC",
  B: "#000000",
  R: "#E60000",
  G: "#00A86B",
};

const mtgColorNames = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
};

const ColorPie = ({ width, height, deck = [] }) => {
  const [tooltip, setTooltip] = useState(null);
  const radius = Math.min(width, height) / 2 - MARGIN;

  const colorCounts = useMemo(() => {
    const counts = { W: 0, U: 0, B: 0, R: 0, G: 0 };

    deck.forEach((card) => {
      if (!card.color) return;
      card.color.split(",").forEach((color) => {
        const trimmed = color.trim();
        if (counts.hasOwnProperty(trimmed)) {
          counts[trimmed]++;
        }
      });
    });

    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .filter((d) => d.value > 0);
  }, [deck]);

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value);
    return pieGenerator(colorCounts);
  }, [colorCounts]);

  const arcs = useMemo(() => {
    const arcPathGenerator = d3.arc();
    return pie.map((p) =>
      arcPathGenerator({
        innerRadius: 0,
        outerRadius: radius,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      })
    );
  }, [radius, pie]);

  return (
    <div className="relative inline-block">
      <svg
        width={width}
        height={height}
        onMouseLeave={() => setTooltip(null)}
      >
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => (
            <path
              key={i}
              d={arc}
              fill={mtgColorMap[colorCounts[i].label] || "#888"}
              stroke="#222"
              strokeWidth={0.5}
              onMouseMove={(e) => {
                const label = colorCounts[i].label;
                const value = colorCounts[i].value;
                setTooltip({
                  x: e.nativeEvent.offsetX,
                  y: e.nativeEvent.offsetY,
                  label: mtgColorNames[label],
                  value,
                });
              }}
              onMouseOut={() => setTooltip(null)}
            />
          ))}
        </g>
      </svg>

      {tooltip && (
        <div
          className="absolute z-10 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.label}: {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default ColorPie;
