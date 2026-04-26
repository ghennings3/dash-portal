export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-20 pb-10 w-full animate-in fade-in duration-500">
      <div className="w-full max-w-[1400px] flex flex-col items-center px-8">
        {/* Clock Skeleton */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="h-20 w-64 bg-zinc-900/50 rounded-2xl animate-pulse" />
          <div className="h-4 w-48 bg-zinc-900/50 rounded-full animate-pulse" />
        </div>

        {/* Search Box Skeleton */}
        <div className="w-full max-w-2xl mt-4 mb-16">
          <div className="h-16 w-full bg-zinc-900/50 rounded-2xl animate-pulse" />
        </div>

        {/* Categories Filter Skeleton */}
        <div className="flex items-center justify-center gap-4 mb-20 w-full">
          <div className="h-10 w-24 bg-zinc-900/50 rounded-xl animate-pulse" />
          <div className="h-10 w-32 bg-zinc-900/50 rounded-xl animate-pulse" />
          <div className="h-10 w-28 bg-zinc-900/50 rounded-xl animate-pulse" />
        </div>

        {/* Category Header Skeleton */}
        <div className="w-full space-y-10">
          <div className="flex items-center gap-8 w-full">
            <div className="h-4 w-32 bg-zinc-900/50 rounded-full animate-pulse" />
            <div className="h-[1px] w-full bg-zinc-900/50" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-3 p-6 bg-zinc-900/30 border border-zinc-800/30 rounded-2xl animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl" />
                <div className="h-4 w-20 bg-zinc-800/50 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
