export default function MovieSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="append">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="movie skeleton">
          <div className="skeleton-poster" />
          <div className="movie-info">
            <div className="skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}
