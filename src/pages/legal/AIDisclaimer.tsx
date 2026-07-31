import LegalLayout, { H2, P, UL } from '../../components/LegalLayout'

export default function AIDisclaimer() {
  return (
    <LegalLayout title="AI Assistant Disclaimer" path="/ai-assistant-disclaimer" updated="July 2026">
      <P>
        The “Ask Lean On Me” website assistant provides general information based on approved website
        content. It is a helpful convenience tool — not a substitute for professional advice or direct
        communication with our team.
      </P>

      <H2>What the Assistant Will Not Do</H2>
      <UL>
        <li>Diagnose medical conditions or provide medical treatment instructions</li>
        <li>Guarantee Medicaid eligibility, service approval, or housing placement</li>
        <li>Reveal applicant information or access private admin records</li>
        <li>Collect Social Security numbers, Medicaid ID numbers, or medical records</li>
        <li>Make legal or licensing promises</li>
      </UL>

      <H2>Emergencies</H2>
      <P>
        The assistant is not for emergencies. For any immediate medical or safety emergency, call 911.
      </P>

      <H2>Accuracy</H2>
      <P>
        While we aim to keep information accurate and current, availability and service details can
        change. For current availability, service-area information, and personalized answers, please
        call 205-687-4047.
      </P>
    </LegalLayout>
  )
}
