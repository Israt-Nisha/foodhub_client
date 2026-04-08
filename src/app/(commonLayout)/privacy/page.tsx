export default function PrivacyPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last Updated: April 7, 2026</p>
        </div>

        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide directly to us when you create an account, such as your name, email address, phone number, and delivery address.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to process your orders, communicate with you about your account, and improve our services.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">3. Sharing of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We share relevant information (like your address and name) with food providers and delivery partners to fulfill your orders. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section className="space-y-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, update, or delete your personal information at any time through your account settings.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">6. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
