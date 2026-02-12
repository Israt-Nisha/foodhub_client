type RatingProps = {
  value: number;
};

export default function Rating({ value }: RatingProps) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= value ? "#facc15" : "#d1d5db",
            fontSize: "18px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
