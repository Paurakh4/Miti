const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="pb-8 mb-8 border-b border-border">
        <p className="text-xs font-mono uppercase tracking-tight text-muted-foreground mb-2">
          Last updated · Jun 17, 2023
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          For Nepali Calendar — calendar.bikram.io
        </p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Thank you for using Nepali Calendar, an open-source project hosted at
          calendar.bikram.io ("the App"). This Privacy Policy explains how we
          collect, use, and disclose information when you access and use our
          App.
        </p>

        <Section title="1. Information We Collect">
          <Sub title="1.1 Personal Information">
            When you use Nepali Calendar, we may collect certain personal
            information from you. This includes your name and email address
            collected through Google login for authentication.
          </Sub>
          <Sub title="1.2 Usage Information">
            We may also collect non-personal information such as your IP
            address, browser type, and operating system through cookies. We do
            not use this information for tracking or advertising.
          </Sub>
        </Section>

        <Section title="2. Use of Information">
          <Sub title="2.1 Authentication and Account Management">
            We use personal information to authenticate your login and manage
            your account.
          </Sub>
          <Sub title="2.2 Google Calendar Integration">
            To create and retrieve events in your Google Calendar, Nepali
            Calendar uses OAuth to access your Google Calendar data.
          </Sub>
        </Section>

        <Section title="3. Sharing of Information">
          <Sub title="3.1 Third-Party Service Providers">
            We may engage third-party service providers who are obligated to
            keep your information confidential.
          </Sub>
          <Sub title="3.2 Legal Requirements">
            We may disclose personal information if required by law.
          </Sub>
        </Section>

        <Section title="4. Security">
          We take reasonable measures to protect your personal information, but
          no security measures are perfect.
        </Section>

        <Section title="5. Children's Privacy">
          Nepali Calendar is not intended for individuals under 16. We do not
          knowingly collect data from children.
        </Section>

        <Section title="6. Updates to this Privacy Policy">
          We may update this Privacy Policy from time to time. The updated
          Policy will be effective when posted.
        </Section>

        <Section title="7. Contact Us">
          Reach us at{" "}
          <a
            href="mailto:calendar@bikram.io"
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
          >
            calendar@bikram.io
          </a>
          .
        </Section>

        <p className="pt-4 border-t border-border">
          By using Nepali Calendar, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </div>
    </div>
  )
}

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section>
    <h2 className="text-base font-semibold tracking-tight text-foreground mb-3">
      {title}
    </h2>
    <div className="space-y-3">{children}</div>
  </section>
)

const Sub = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div>
    <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
    <p>{children}</p>
  </div>
)

export default PrivacyPolicy
