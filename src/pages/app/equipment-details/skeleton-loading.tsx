export function SkeletonLoading() {
  return (
    <div className="my-6 flex flex-col gap-4 px-8 opacity-50 md:mt-11 md:flex-row md:gap-20 md:px-28">
      <div className="aspect-square w-full animate-pulse bg-slate-200 md:max-w-[30vw]" />
      <div className="flex flex-1 animate-pulse flex-col gap-4">
        <div>
          <div className="mb-2 h-9 w-full animate-pulse rounded-sm bg-slate-200" />
          <div className="h-9 w-1/5 animate-pulse rounded-sm bg-slate-200" />
        </div>
        <div>
          <div className="mb-1 h-4 w-8 animate-pulse rounded-sm bg-slate-200" />
          <div className="h-6 w-32 animate-pulse rounded-sm bg-slate-200" />
        </div>
        <div>
          <div className="mb-1 h-4 w-8 animate-pulse rounded-sm bg-slate-200" />
          <div className="mb-1 h-6 w-full animate-pulse rounded-sm bg-slate-200" />
          <div className="h-6 w-32 animate-pulse rounded-sm bg-slate-200" />
        </div>
        <div className="h-11 w-44 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  )
}
