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
      const numCopies = card.count || 1;

      // Skip if the card has no colors property
      if (!card.colors) return;

      // --- THIS SECTION IS UPDATED ---
      // Use regex to find all color characters (W, U, B, R, G) in the string.
      // This handles formats like "{U}{R}" or "{W}".
      const matchedColors = card.colors.match(/[WUBRG]/g);

      // If we found any color characters, iterate over them
      if (matchedColors) {
        matchedColors.forEach((color) => {
          if (counts.hasOwnProperty(color)) {
            // Add the number of copies to the corresponding color's count
            counts[color] += numCopies;
          }
        });
      }
      // --- END OF UPDATED SECTION ---
    });

    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .filter((d) => d.value > 0);
  }, [deck]);

  // D3 logic (remains the same)
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

  // JSX rendering (remains the same)
  return (
    <div className="relative inline-block">
      <svg width={width} height={height} onMouseLeave={() => setTooltip(null)}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            const colorData = colorCounts[i];
            return (
              <path
                key={i}
                d={arc}
                fill={mtgColorMap[colorData.label] || "#CCCCCC"}
                stroke="#1a1a1a"
                strokeWidth={1}
                onMouseMove={(e) => {
                  setTooltip({
                    x: e.nativeEvent.offsetX,
                    y: e.nativeEvent.offsetY,
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
          style={{ left: tooltip.x + 15, top: tooltip.y + 15, whiteSpace: "nowrap" }}
        >
          {tooltip.label}: {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default ColorPie;