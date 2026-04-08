import { Star, Quote, UserCircle } from "lucide-react";
import Image from "next/image";
import { reviewService } from "@/services/review.service";

export const TestimonialsSection = async () => {
  let reviews = [];
  try {
    const res = await reviewService.getAllReviews();
    
    // Handling nested data structure based on project patterns
    if (res?.success) {
      if (Array.isArray(res.data)) {
        reviews = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        reviews = res.data.data;
      }
    }
    
    // Showing top 3 reviews
    reviews = reviews.slice(0, 3);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }

  // Ensure the section is visible even if there are no reviews yet
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Our Foodies Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Thousands of happy customers rely on us for their daily meals. Here is what some of them have to say.
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review: any, index: number) => (
              <div
                key={review.id || index}
                className="relative rounded-2xl border bg-background p-8 shadow-sm transition hover:shadow-md"
              >
                <Quote className="absolute top-6 right-8 h-8 w-8 text-primary/10" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                <p className="mb-6 text-muted-foreground leading-relaxed italic line-clamp-4">
                  "{review.comment || "Great experience with FoodHub!"}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20 bg-muted flex items-center justify-center">
                    {/* Using dummy image as requested */}
                    <Image
                      src={`https://i.pravatar.cc/150?u=${review.id || index}`}
                      alt={review.customer?.name || "Customer"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {review.customer?.name || "Verified Customer"}
                    </h4>
                    <p className="text-sm text-muted-foreground">Happy Foodie</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-primary/20 bg-background/50">
            <UserCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No reviews yet</h3>
            <p className="mt-2 text-muted-foreground">Be the first to share your experience with us!</p>
          </div>
        )}
      </div>
    </section>
  );
};
