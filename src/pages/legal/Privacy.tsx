import LegalLayout, { H2, P, UL } from '../../components/LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" path="/privacy-policy" updated="July 2026">
      <P>
        This Privacy Policy explains how Lean On Me Caregiving Services handles information submitted
        through this website. By using this website, you agree to the practices described here.
      </P>

      <H2>Information We Collect</H2>
      <P>
        When you submit a care request or contact form, we collect the information you provide, such
        as your name, phone number, email address, general location, and a description of the
        assistance you are seeking.
      </P>

      <H2>How We Use Your Information</H2>
      <P>
        Submitted information is used to respond to your request for care, to follow up with you, and
        to help us understand how we may be able to assist. We use the contact details you provide to
        reach you using your preferred method.
      </P>

      <H2>Please Do Not Submit Sensitive Information</H2>
      <P>
        For your privacy and safety, please do not submit highly sensitive medical, identity, or
        financial information through public forms, including:
      </P>
      <UL>
        <li>Social Security numbers</li>
        <li>Medicaid identification numbers</li>
        <li>Medical records, diagnoses, or prescription information</li>
        <li>Bank or credit-card information</li>
      </UL>

      <H2>How Information Is Stored</H2>
      <P>
        Care requests are stored securely in our database. Access to submitted records is restricted
        to authorized administrators. Public visitors cannot read, edit, or delete applicant records.
      </P>

      <H2>Sharing of Information</H2>
      <P>
        We do not sell your information. We may use trusted service providers (such as our database
        and email providers) solely to operate this website and respond to your request.
      </P>

      <H2>A Note on Compliance</H2>
      <P>
        This website does not claim to be HIPAA compliant. Please do not use public forms to transmit
        protected health information.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about this policy? Call 205-687-4047 or email info@leanonmecargiving.org.
      </P>
    </LegalLayout>
  )
}
