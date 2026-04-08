export default function TermsPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last Updated: April 7, 2026</p>
        </div>

        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using FoodHub, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our platform.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">2. User Account and Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate and complete information during registration.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">3. Provider Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Food providers must comply with all local health and safety regulations. You are solely responsible for the quality, safety, and hygiene of the food you provide through our platform.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">4. Ordering and Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive for excellence, delivery times are estimates and not guarantees. FoodHub is a platform connecting users and providers and is not liable for issues directly related to food preparation.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">5. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for any reason, including violation of these Terms of Service.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">6. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at support@foodhub.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
