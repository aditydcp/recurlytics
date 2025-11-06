import { Label } from "@/components/ui/label";
import type { DataProbabilityPoint } from "@/types/DataDisplayType";

interface ProbabilityDistributionBubblesComponentProps {
  predictionRange: DataProbabilityPoint[];
  labelMode?: "label" | "probability" | "both";
  maxBubbleSize?: number;
  minBubbleSize?: number;
  maxTextSize?: number;
  minTextSize?: number;
}

export const ProbabilityDistributionBubblesComponent = ({
  predictionRange,
  labelMode = "both",
  maxBubbleSize = 64,
  minBubbleSize = 32,
  maxTextSize = 16,
  minTextSize = 10,
}: ProbabilityDistributionBubblesComponentProps) => {
  const maxProb = Math.max(...predictionRange.map((p) => p.probability));
  const minProb = Math.min(...predictionRange.map((p) => p.probability));

  const scale = (p: number, min: number, max: number, minOut: number, maxOut: number) => {
    if (max === min) return (maxOut + minOut) / 2;
    return minOut + ((p - min) / (max - min)) * (maxOut - minOut);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      {predictionRange.map(({ label, probability }, index) => {
        const size = scale(probability, minProb, maxProb, minBubbleSize, maxBubbleSize);
        const fontSize = scale(probability, minProb, maxProb, minTextSize, maxTextSize);
        const opacity = scale(probability, minProb, maxProb, 0.3, 1);

        return (
          <div
            key={index}
            className="relative flex items-center justify-center -ml-2 first:ml-0 transition-transform duration-300"
            style={{
              width: size,
              height: size,
              zIndex: Math.round(probability * 100),
            }}
          >
            {/* Bubble background */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg bg-primary`}
              style={{ opacity }}
            />
            {/* Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {(labelMode === "label" || labelMode === "both") &&
                <Label
                  className="font-semibold text-primary-foreground"
                  style={{ fontSize: `${fontSize}px`, opacity: 1 }}
                >
                  {label}
                </Label>
              }
              {(labelMode === "probability" || labelMode === "both") &&
                <Label
                  className="font-semibold text-primary-foreground"
                  style={{ fontSize: `${fontSize}px`, opacity: 1 }}
                >
                  {probability.toFixed(2)}
                </Label>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};