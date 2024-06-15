"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import History from "../historyarea";

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

    const api_url = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const savedPredictions = localStorage.getItem("predictions");
        if (savedPredictions) {
            setPredictions(JSON.parse(savedPredictions));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-6/12 pr-4 rounded-md h-[500px] flex flex-col"
            >
                <div className="flex-1 flex flex-col gap-2">
                    <Textarea
                        placeholder="Type your text here."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="h-2/3"
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
                    {result !== null && (
                        <div className="mt-4 p-4 rounded-md shadow-sm border flex-1">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Prediction Result:
                            </h4>
                            {result === "1" ? (
                                <p className="bg-red-400 text-white py-3 px-3">
                                    Stress detected in text.
                                </p>
                            ) : (
                                <p className="bg-green-400 text-white py-3 px-3">
                                    No stress detected.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </form>
            <History predictions={predictions} />
        </div>
    );
}
