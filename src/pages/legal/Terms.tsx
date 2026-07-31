import LegalLayout, { H2, P } from '../../components/LegalLayout'

export default function Terms() {
  return (
    <LegalLayout title="Terms of Use" path="/terms-of-use" updated="July 2026">
      <P>
        These Terms of Use govern your use of the Lean On Me Caregiving Services website. By using
        this website, you agree to these terms.
      </P>

      <H2>Informational Purpose</H2>
      <P>
        The content on this website is provided for general informational purposes. It does not
        constitute medical, legal, or professional advice, and it does not create a care or provider
        relationship on its own.
      </P>

      <H2>No Guarantees</H2>
      <P>
        Submitting a form or contacting us does not guarantee Medicaid approval, housing placement,
        service availability, or immediate service. Eligibility and authorized services depend on
        assessment, program requirements, and final authorization.
      </P>

      <H2>Acceptable Use</H2>
      <P>
        You agree to provide accurate information and to use this website lawfully. Please do not
        submit sensitive identifiers or protected health information through public forms.
      </P>

      <H2>Emergencies</H2>
      <P>
        Lean On Me Caregiving Services is not an emergency-response service. For any immediate medical
        or safety emergency, call 911.
      </P>

      <H2>Changes</H2>
      <P>
        We may update these terms from time to time. Continued use of the website indicates acceptance
        of the current terms.
      </P>

      <H2>Contact</H2>
      <P>Questions? Call 205-687-4047 or email info@leanonmecargiving.org.</P>
    </LegalLayout>
  )
}
