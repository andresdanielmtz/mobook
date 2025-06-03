import { Star } from "lucide-react";

const StarRating = ({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) => (
  <div className="flex items-center gap-1 mb-2">
    {Array.from({ length: max }, (_, i) => (
      <button
        key={i}
        type="button"
        aria-label={`Rate ${i + 1} stars`}
        onClick={() => onChange(i + 1)}
        className="text-yellow-400 hover:scale-110 transition-transform"
      >
        <Star
          size={22}
          fill={i < value ? "#facc15" : "none"}
          stroke={i < value ? "#facc15" : "#d1d5db"}
        />
      </button>
    ))}
  </div>
);

export default StarRating;
