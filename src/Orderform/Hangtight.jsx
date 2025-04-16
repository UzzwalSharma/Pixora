import { Construction } from "lucide-react";

export default function PixoraProComingSoon() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg space-y-4">
        <img
          src="/cat gif.gif" // Replace with your actual funny image
          alt="Hang Tight Bro"
          className="w-60 mx-auto rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-green-400 tracking-tight">Pixora Pro</h1>
        <p className="text-xl font-semibold text-yellow-400">Hang tight, bro! 🛠️</p>
        <p className="text-gray-300">
          We’re currently bribing some sleepy devs with coffee ☕ and Maggie 🍜 to finish this page.
        </p>
        <p className="text-sm text-gray-500 italic">
          In the meantime, go touch some grass or maybe do your assignments 😜
        </p>
        <div className="flex justify-center pt-4">
          <Construction className="h-10 w-10 text-yellow-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
