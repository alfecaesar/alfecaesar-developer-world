import { cn } from "@/lib/utils.ts";

/** Illustrated CSS island used during loading and when WebGL is unavailable. */
export default function IslandFallback({ className, label }: { className?: string; label?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "Illustration of a floating island with a developer studio"}
      className={cn("relative flex size-full items-center justify-center", className)}
    >
      <div className="relative w-[min(78%,420px)] aspect-square">
        <div className="absolute inset-x-[8%] top-[38%] h-[16%] rounded-[50%] bg-gradient-to-b from-[#b6f0d6] to-[#74caa6] shadow-[0_20px_60px_-10px_rgba(124,92,255,0.45)]" />
        <div className="absolute inset-x-[16%] top-[50%] h-[34%] rounded-b-[50%] bg-gradient-to-b from-[#b7b0f0] to-[#6f63c4] [clip-path:polygon(0_0,100%_0,62%_100%,38%_100%)]" />
        <div className="absolute left-[30%] top-[22%] h-[22%] w-[40%] rounded-xl border-4 border-[#2b2858] bg-[#17163a] p-[3%]">
          <div className="space-y-[6%] pt-[8%]">
            <div className="h-1.5 w-2/3 rounded bg-[#a58bff]" />
            <div className="ml-[10%] h-1.5 w-1/2 rounded bg-[#38d3ea]" />
            <div className="ml-[10%] h-1.5 w-3/5 rounded bg-[#ff8fc6]" />
            <div className="h-1.5 w-1/3 rounded bg-[#ffd36e]" />
          </div>
        </div>
        <div className="absolute left-[8%] top-[10%] h-[9%] w-[26%] rounded-full bg-white/90 blur-[1px]" />
        <div className="absolute right-[4%] top-[30%] h-[8%] w-[22%] rounded-full bg-white/80 blur-[1px]" />
      </div>
    </div>
  );
}
