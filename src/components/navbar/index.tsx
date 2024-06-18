import React from "react";
import { ModeToggle } from "@/components/modetoggle";
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="w-full border-b py-6">
            <nav className="flex justify-between items-center w-[92%] mx-auto">
                <div>
                    <p className="font-extrabold text-lg lg:text-2xl">
                        Machine Learning AOL
                    </p>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <a
                        href={
                            "https://www.kaggle.com/datasets/mexwell/stress-detection-from-social-media-articles"
                        }
                        target="_blank"
                    >
                        <div className="w-10 h-10 flex items-center justify-center border rounded-md">
                            <Image
                                src={"/kaggle.png"}
                                width={20}
                                height={20}
                                alt="Kaggle"
                            />
                        </div>
                    </a>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
}
