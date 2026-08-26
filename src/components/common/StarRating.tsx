import { Star } from 'lucide-react';

/**
 * A five-star rating row — filled stars up to `rating`, hairline outlines for
 * the rest. Built once because no star pattern existed anywhere in the codebase;
 * used by the written testimonials on `/success` (and reusable elsewhere).
 */
export function StarRating({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
      data-testid={`rating-${rating}-stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.6}
          className={i < rating ? 'fill-[#e0a83e] text-[#e0a83e]' : 'fill-none text-[#d8dbe6]'}
        />
      ))}
    </div>
  );
}

export default StarRating;