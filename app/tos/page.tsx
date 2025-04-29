import type { Metadata } from "next";

import { siteConfig } from "@/constants/site.config";

import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy",
  description: "Terms of Service and Privacy Policy for Startacus.",
};

export default function TermsOfService() {
  return (
    <section className="container mx-auto max-w-4xl px-4 pt-24 pb-12">
      <div className="max-w-none">
        <h1 className="mt-10 mb-12 text-center text-4xl font-extrabold">
          Legal <span className="text-primary">Documents</span>
        </h1>

        {/* Terms of Service Section */}
        <div className="mb-8 scroll-mt-18 p-8" id="terms-of-service">
          <div className="mb-6 flex items-center">
            <div className="bg-primary mr-4 h-10 w-1.5 rounded-full" />
            <h2 className="text-3xl font-bold">Terms of Service</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                1.1 <span className="text-primary">Acceptance</span> of Terms
              </h3>
              <p className="text-muted-foreground">
                By using Startacus, you agree to these Terms of Service. If you
                do not agree, please do not use the platform.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                1.2 <span className="text-primary">Use</span> of the Service
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>You must be at least 18 years old to use this service.</li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account.
                </li>
                <li>
                  Unauthorized use of the service may result in termination.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                1.3 <span className="text-primary">Account</span> & Access
                Control
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  We reserve the right to limit or revoke access to any user at
                  our discretion.
                </li>
                <li>
                  Users must comply with all applicable laws when using the
                  service.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                1.4 <span className="text-primary">Changes</span> to the Service
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  Startacus may update or modify the platform at any time.
                </li>
                <li>
                  Continued use of the service after changes means you accept
                  the new terms.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                1.5 <span className="text-primary">Limitation</span> of
                Liability
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  We provide the service &quot;as is&quot; without warranties of
                  any kind.
                </li>
                <li>
                  We are not liable for any indirect, incidental, or
                  consequential damages.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Privacy Policy Section */}
        <div className="mt-4 mb-8 scroll-mt-18 p-8" id="privacy-policy">
          <div className="mb-6 flex items-center">
            <div className="bg-primary mr-4 h-10 w-1.5 rounded-full" />
            <h2 className="text-3xl font-bold">Privacy Policy</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                2.1 Information We <span className="text-primary">Collect</span>
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  We collect basic user information, including email, name, and
                  authentication data.
                </li>
                <li>
                  If provided, we may store additional details related to user
                  preferences and interactions.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                2.2 How We <span className="text-primary">Use</span> Your Data
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>To provide and improve our services.</li>
                <li>
                  To ensure account security and prevent unauthorized access.
                </li>
                <li>To analyze usage trends for improving the platform.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                2.3 Data <span className="text-primary">Sharing</span> & Third
                Parties
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>We do not sell user data.</li>
                <li>
                  Data may be shared with third-party authentication providers
                  (e.g., Google) for login purposes.
                </li>
                <li>
                  If required by law, we may disclose user information to comply
                  with legal obligations.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                2.4 Data <span className="text-primary">Retention</span>
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  We store user data as long as necessary for service operation.
                </li>
                <li>
                  Users may request account deletion, which will remove all
                  associated data.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">
                2.5 <span className="text-primary">Security</span> Measures
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  We use industry-standard security practices to protect user
                  data.
                </li>
                <li>
                  However, no method of transmission over the internet is 100%
                  secure.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Section */}
        <div className="mt-4 p-8">
          <div className="mb-6 flex items-center">
            <div className="bg-primary mr-4 h-10 w-1.5 rounded-full" />
            <h2 className="text-3xl font-bold">Contact Us</h2>
          </div>
          <p className="text-muted-foreground">
            If you have any questions about these terms or our privacy
            practices, contact us at{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-primary hover:underline"
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
