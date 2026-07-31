import LegalLayout, { H2, P, UL } from '../../components/LegalLayout'

export default function Accessibility() {
  return (
    <LegalLayout title="Accessibility Statement" path="/accessibility" updated="July 2026">
      <P>
        Lean On Me Caregiving Services is committed to making this website usable and welcoming for
        everyone, including people with disabilities.
      </P>

      <H2>Our Approach</H2>
      <P>We strive to follow widely recognized accessibility best practices, including:</P>
      <UL>
        <li>Semantic, structured HTML and descriptive headings</li>
        <li>Keyboard-navigable menus, forms, and interactive elements</li>
        <li>Accessible form labels and clear focus indicators</li>
        <li>Sufficient color contrast for readability</li>
        <li>Respect for reduced-motion preferences</li>
      </UL>

      <H2>Ongoing Effort</H2>
      <P>
        Accessibility is an ongoing effort, and we continue to review and improve the experience. If
        you encounter any barrier or difficulty using this website, we want to help.
      </P>

      <H2>Contact Us</H2>
      <P>
        Please call 205-687-4047 or email info@leanonmecargiving.org and we will do our best to
        provide the information or assistance you need in an accessible way.
      </P>
    </LegalLayout>
  )
}
