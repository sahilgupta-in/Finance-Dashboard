import { useState } from "react";

const COLORS = {
  Entertainment: "#16a34a",
  Platform: "#ef4444",
  Shopping: "#f97316",
  "Food & health": "#1F7F75",
};

export default function RadialChart({ data }) {
  const [hovered, setHovered] = useState(null);

  const radiusStep = 12;
  const center = 100;

  return (
    <svg width="240" height="240" viewBox="0 0 200 200">
      {data.map((item, index) => {
        const radius = 70 - index * radiusStep;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (item.percent / 100) * circumference;

        return (
          <circle
            key={item.name}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={COLORS[item.name]}
            strokeWidth={8}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "all 0.6s ease",
              opacity: hovered && hovered !== item.name ? 0.3 : 1,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            transform="rotate(90 100 100)"
          />
        );
      })}
    </svg>
  );
}
