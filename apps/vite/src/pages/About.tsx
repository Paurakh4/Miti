const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "About Miti",
    body: "Miti was created out of a personal need to bridge the gap between two calendars that Nepali individuals live by. I was looking for a minimalist Nepali calendar app that would allow me to sync events with google calendar. Imagine a scenario, you have an appointment for a meeting with Ram on Asadh 15 and you want to create a reminder, it requires you to first convert the date to the Gregorian calendar and then create a reminder on your calendar app. I proposed to develop a minimal calendar app as a part of our open source effort to the team at POSK. The team understood the challenges faced when scheduling events or appointments in one calendar system and trying to decipher the corresponding date in the other and Miti started out as a soluton. Miti is here to simplify your life by seamlessly syncing events between the Nepali and Gregorian calendars.",
  },
  {
    heading: "Sync and Simplify",
    body: "Miti isn't an attempt to simply replace all the calendars you use, but rather a tool to help you create and browse your events in the Nepali calendar system. Miti goes beyond the traditional calendar app functionalities by offering a seamless integration with Google Calendar. By syncing your events with Google Calendar, you can easily access and manage your schedule across different operating systems and calendar apps that support Google Calendar integration. No matter where you are or which device you're using, Miti ensures that your events are always synchronized and up to date. That way, you can inter-operate between the Nepali and Gregorian calendars without having to convert dates manually.",
  },
  {
    heading: "Nepali to Gregorian, and Vice Versa",
    body: "With Miti, creating events using the Nepali date and viewing them in the Gregorian date format and vice versa becomes effortless. You can simply input the Nepali date for your event in the Miti app, and it will automatically be converted to the corresponding Gregorian date in Google Calendar. Miti also provides a converter tool that allows you to convert dates between the Nepali and Gregorian calendar.",
  },
  {
    heading: "View and Manage Your Schedule",
    body: "Miti not only allows you to create events in the Nepali calendar, but it also provides a comprehensive view of your Google Calendar events within the app. You can easily browse through your schedule, view event details, and manage your appointments, ensuring that you stay organized and never miss an important event.",
  },
  {
    heading: "Simplicity and Efficiency",
    body: "Unlike existing calendar apps that are often bloated and lack essential features, Miti focuses on being a minimalistic and efficient tool. We have intentionally limited the features to ensure that the app remains lightweight and minimal.",
  },
  {
    heading: "Work Offline, Install as Native App",
    body: "Miti leverages Progressive Web App (PWA) technology, enabling you to access the app even when you're offline. Whether you're on the go or in an area with limited connectivity, Miti ensures that you can still view and manage your events effortlessly. Additionally, you have the option to install Miti as a app on your device, allowing you to access the app directly from your home screen. This means that you can use Miti just like any other native app, without having to download it from the app store. And the best part is, it takes up less storage than a photo.",
  },
  {
    heading: "Open Source and Volunteer-Driven",
    body: "Miti is a project built by a dedicated team of volunteers who recognized the need for a reliable Nepali calendar app. We are committed to making Miti the best calendar app for Nepali users, and to achieve this, we have made the project open source. This means that anyone can contribute to the development and improvement of Miti, ensuring that it evolves to meet the needs of the community. The app will remain free to use, and we will continue to add new features and functionalities to make it even better. We are also open to feedback and suggestions from the community, so feel free to reach out to us with your ideas.",
  },
]

const externalLinkClass =
  "text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors rounded-sm"

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="pb-8 mb-8 border-b border-border">
        <p className="text-xs font-mono uppercase tracking-tight text-muted-foreground mb-2">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Welcome to Miti
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Your Nepali Calendar app, built by the community.
        </p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-base font-semibold tracking-tight text-foreground mb-3">
              {section.heading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}

        <section>
          <h2 className="text-base font-semibold tracking-tight text-foreground mb-3">
            Credits
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Special thanks to{" "}
            <a
              href="https://github.com/nirajacharyaa"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              @nirajacharyaa
            </a>
            ,{" "}
            <a
              href="https://github.com/headshigh"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              @headshigh
            </a>
            , and{" "}
            <a
              href="https://github.com/poudelsanchit"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              @poudelsanchit
            </a>{" "}
            for their work on the date converter,{" "}
            <a
              href="https://github.com/nabinkdl"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              @nabinkdl
            </a>{" "}
            for the logo,{" "}
            <a
              href="https://github.com/sareeka61"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              @sareeka61
            </a>
            , and the{" "}
            <a
              href="https://github.com/PoskOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              POSK team
            </a>{" "}
            for support and feedback.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-foreground mb-3">
            Contact
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Reach out at{" "}
            <a
              href="mailto:calendar@bikram.io"
              className={externalLinkClass}
            >
              calendar@bikram.io
            </a>{" "}
            or join our Discord at{" "}
            <a
              href="https://dsc.gg/posk"
              className={externalLinkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              dsc.gg/posk
            </a>
            . For issues or contributions, visit the{" "}
            <a
              href="https://github.com/PoskOfficial/Miti "
              className={externalLinkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-foreground mb-3">
            Contributors
          </h2>
          <a
            href="https://github.com/PoskOfficial/Miti/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md ring-offset-background"
          >
            <img
              className="rounded-md border border-border"
              src="https://contrib.rocks/image?repo=PoskOfficial/Miti"
              alt="Contributors"
            />
          </a>
        </section>

        <footer className="pt-6 mt-6 border-t border-border text-sm text-muted-foreground">
          <a
            href="https://github.com/ParajuliBkrm"
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClass}
          >
            Bikram Parajuli
          </a>
          , on behalf of the Miti team.
        </footer>
      </div>
    </div>
  )
}

export default AboutPage
