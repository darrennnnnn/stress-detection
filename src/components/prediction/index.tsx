"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import History from "../historyarea";
import { LoaderCircle } from "lucide-react";

interface Response {
    message: string;
}

export default function Prediction() {
    const { toast } = useToast();
    const [input, setInput] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<
        { text: string; result: string }[]
    >([]);
    const [loading, setLoading] = useState(false);

    const api_url: string =
        process.env.NEXT_PUBLIC_API_URL ??
        "https://darrennat09.pythonanywhere.com/api/model";

    useEffect(() => {
        const savedPredictions = localStorage.getItem("predictions");
        if (savedPredictions) {
            setPredictions(JSON.parse(savedPredictions));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(api_url, {
                text: input,
            });
            const newPrediction = { text: input, result: response.data.result };
            setPredictions((prev) => {
                const updatedPredictions = [...prev, newPrediction];
                localStorage.setItem(
                    "predictions",
                    JSON.stringify(updatedPredictions)
                );
                return updatedPredictions;
            });

            setResult(response.data.result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col lg:flex-row justify-center items-start lg:gap-4">
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <LoaderCircle className="animate-spin"/>
                </div>
            )}
            <div className="w-full lg:w-6/12 flex flex-col mb-4 lg:mb-0">
                <form
                    onSubmit={handleSubmit}
                    className="w-full rounded-md flex flex-col"
                >
                    <div className="flex-1 flex flex-col gap-2">
                        <Textarea
                            placeholder="Type your text here."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="h-[150px] lg:h-[300px]"
                        />
                        <Button
                            type="submit"
                            onClick={() => {
                                toast({
                                    description: "Text has been sent.",
                                });
                            }}
                        >
                            Send text
                        </Button>
                    </div>
                </form>
                {result && (
                    <div className="mt-4 p-3 rounded-md shadow-sm border flex-1">
                        <h4 className="scroll-m-20 text-lg lg:text-xl font-semibold tracking-tight pb-2">
                            Prediction Result:
                        </h4>
                        {result === "1" ? (
                            <p className="bg-red-400 rounded-md py-3 px-3">
                                Stress detected in text.
                            </p>
                        ) : (
                            <p className="bg-green-400 py-3 px-3">
                                No stress detected.
                            </p>
                        )}
                    </div>
                )}
            </div>
            <History predictions={predictions} />
        </div>
    );
}
