import Footer from "@/components/footer";
import Prediction from "../components/prediction";
import Navbar from "@/components/navbar";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center">
            <Navbar />
            <div className=" w-5/6 flex flex-col items-center justify-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-36 mb-4 text-center">
                    Stress Detection
                </h1>

                <Prediction />
            </div>
            <Footer />
        </main>
    );
}
