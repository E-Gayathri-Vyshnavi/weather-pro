export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg p-8 rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="h-10 bg-white/10 rounded-full w-full mb-8 animate-pulse" />
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/2 animate-pulse" />
          <div className="h-24 bg-white/10 rounded w-1/3 animate-pulse my-6" />
          <div className="grid grid-cols-3 gap-4 w-full pt-8">
            <div className="h-12 bg-white/10 rounded animate-pulse" />
            <div className="h-12 bg-white/10 rounded animate-pulse" />
            <div className="h-12 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}