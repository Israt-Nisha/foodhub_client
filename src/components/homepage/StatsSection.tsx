import { Users, Utensils, Star, Clock } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      id: 1,
      name: "Happy Foodies",
      value: "10,000+",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 2,
      name: "Expert Chefs",
      value: "500+",
      icon: <Utensils className="h-6 w-6" />,
    },
    {
      id: 3,
      name: "Customer Rating",
      value: "4.8/5",
      icon: <Star className="h-6 w-6" />,
    },
    {
      id: 4,
      name: "Avg. Delivery",
      value: "15 min",
      icon: <Clock className="h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-background py-20 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Our Journey in Numbers
          </h2>
          <p className="mt-4 text-muted-foreground">
            We are proud of the community we have built and the quality we maintain every day.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group flex flex-col items-center justify-center p-6 transition-all hover:scale-105"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-base font-medium text-muted-foreground">
                {stat.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};
