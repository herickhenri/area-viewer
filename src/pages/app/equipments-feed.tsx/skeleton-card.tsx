export function SkeletonCard() {
  return (
    <div className="flex w-full flex-col bg-white shadow-xl shadow-black/40 md:w-60">
      <div className="aspect-square w-full animate-pulse bg-slate-200" />

      <div className="mx-4 mb-4">
        <div className="mt-1 h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-5 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-1 h-5 w-24 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-11 w-full animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  )
}
