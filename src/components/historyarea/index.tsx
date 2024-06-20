"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryProps {
    predictions: { text: string; result: string }[];
}

const History: React.FC<HistoryProps> = ({ predictions }: HistoryProps) => {
    const reversedPredictions = [...predictions].reverse();
    return (
        <div className="w-full pt-4 lg:pt-0 h-[250px] lg:h-[500px] lg:w-6/12">
            <ScrollArea className="h-full w-full rounded-md border">
                {reversedPredictions.map((prediction, index) => (
                    <div
                        key={`${prediction.text}-${index}`}
                        className="border px-6 py-3 flex justify-between items-center"
                    >
                        <p className="w-4/6 lg:w-5/6 lg:pr-5 pr-4 text-xs lg:text-sm text-justify">
                            {prediction.text}
                        </p>
                        <p
                            className={`px-3 py-1 rounded-md w-2/6 lg:w-1/6 text-center text-sm ${
                                prediction.result === "0"
                                    ? "bg-green-400"
                                    : "bg-red-400"
                            }`}
                        >
                            <small className="text-xs lg:text-sm font-medium leading-none">
                                {prediction.result === "0"
                                    ? "No Stress Detected"
                                    : "Stress Detected"}
                            </small>
                        </p>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
};

export default History;
