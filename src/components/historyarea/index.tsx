"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryProps {
    predictions: { text: string; result: string }[];
}

const History: React.FC<HistoryProps> = ({ predictions }: HistoryProps) => {
    const reversedPredictions = [...predictions].reverse();
    return (
        <div className="w-full h-[500px] md:w-6/12">
            <ScrollArea className="h-full w-full rounded-md border">
                {reversedPredictions.map((prediction, index) => (
                    <div
                        key={index}
                        className="border px-6 py-3 flex justify-between items-center"
                    >
                        <p className="w-5/6">{prediction.text}</p>
                        <p
                            className={`px-3 py-1 rounded-md w-1/6 text-center ${
                                prediction.result === "0"
                                    ? "bg-green-400"
                                    : "bg-red-400"
                            }`}
                        >
                            <small className="text-sm font-medium leading-none">
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
