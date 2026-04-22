import { Skeleton } from "@/components/ui/skeleton";

const BookCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border">
      {/* Cover Skeleton */}
      <Skeleton className="h-52 w-full rounded-xl mb-4" />

      {/* Tags Skeleton */}
      <div className="flex gap-2 mb-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Title Skeleton */}
      <Skeleton className="h-5 w-3/4 mb-2" />

      {/* Author Skeleton */}
      <Skeleton className="h-4 w-1/2 mb-3" />

      {/* Bottom Skeleton */}
      <div className="flex justify-between border-t pt-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
};

export default BookCardSkeleton;
