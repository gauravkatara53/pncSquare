"use client";
import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading?: boolean;
}

export function LoadMoreButton({
  onLoadMore,
  isLoading = false,
}: LoadMoreButtonProps) {
  return (
    <div className="text-center mt-12">
      <Button
        variant="ghost"
        size="default"
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More Courses"}
      </Button>
    </div>
  );
}
