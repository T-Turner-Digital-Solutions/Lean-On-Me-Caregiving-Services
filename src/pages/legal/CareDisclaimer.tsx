import LegalLayout, { H2, P } from '../../components/LegalLayout'

export default function CareDisclaimer() {
  return (
    <LegalLayout title="Care Services Disclaimer" path="/care-services-disclaimer" updated="July 2026">
      <H2>Non-Medical Support</H2>
      <P>
        Lean On Me Caregiving Services primarily provides non-medical support such as personal care,
        companionship, meal preparation, light housekeeping, mobility assistance, medication
        reminders, transportation assistance, respite care, and daily living support.
      </P>

      <H2>Medical & Skilled Nursing Services</H2>
      <P>
        Medical treatment and skilled nursing services are only provided when appropriately licensed,
        staffed, approved, and authorized. Nothing on this website should be interpreted as a claim to
        provide licensed medical care unless expressly described and authorized.
      </P>

      <H2>Medicaid</H2>
      <P>
        We accept Medicaid patients who need assistance in their homes. However, eligibility and the
        specific services that may be authorized depend on your Medicaid plan, an assessment, program
        requirements, and final authorization. We do not guarantee Medicaid approval.
      </P>

      <H2>Housing</H2>
      <P>
        Housing options are intended for veterans and elderly individuals who need limited daily
        assistance. We do not guarantee licensing status, immediate availability, acceptance, or
        placement.
      </P>

      <H2>Emergencies</H2>
      <P>
        Lean On Me Caregiving Services is not an emergency-response service. For any immediate medical
        or safety emergency, call 911.
      </P>

      <H2>Questions</H2>
      <P>
        Please call 205-687-4047 for current availability and service-area information.
      </P>
    </LegalLayout>
  )
}
