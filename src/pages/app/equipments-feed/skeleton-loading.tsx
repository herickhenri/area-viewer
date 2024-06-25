import { SkeletonCard } from './skeleton-card'

export function SkeletonLoading() {
  return (
    <div className="mb-5 flex flex-wrap justify-center gap-5 px-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
