const GoogleApiDisclosure = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="pb-8 mb-8 border-b border-border">
        <p className="text-xs font-mono uppercase tracking-tight text-muted-foreground mb-2">
          Disclosure
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Google API Disclosure
        </h1>
      </header>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Miti's use and transfer to any other app of information received from
        Google APIs will adhere to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
    </div>
  )
}

export default GoogleApiDisclosure
