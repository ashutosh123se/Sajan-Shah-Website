'use client';
import React from 'react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-1 mb-3">{title}</h2>
      {children}
      <div className="border-t border-dashed border-gray-100 pt-2"></div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c8a96e] flex-shrink-0"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AIPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Artificial Intelligence (AI) Usage Policy &amp; Disclaimer</h1>
          <p className="text-sm text-gray-400 mt-3">Last Updated: April 1, 2026</p>
        </div>
        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">

          <Section title="1. Introduction">
            <p>This Artificial Intelligence (“AI”) Usage Policy governs the use of all AI-enabled systems and tools provided by Sajan Shah Foundation (“Foundation”, “we”, “our”, or “us”).</p>
            <p className="mt-2">This includes, but is not limited to:</p>
            <BulletList items={['AI Sajan Shah (our proprietary AI assistant)', 'AI features integrated within our Website and Mobile Application', 'Any AI-driven tools, recommendations, or automated systems']} />
            <p className="mt-2">By accessing or using any AI-powered feature, you agree to comply with this Policy.</p>
          </Section>

          <Section title="2. Purpose of AI Systems">
            <p>AI systems within Sajan Shah Foundation are designed to:</p>
            <BulletList items={['Provide educational and motivational insights', 'Assist with learning, productivity, and personal development', 'Enhance user experience through intelligent recommendations', 'Support users with general guidance and structured thinking']} />
            <p className="mt-2">All AI services are intended strictly for informational, educational, and support purposes only.</p>
          </Section>

          <Section title="3. No Professional Advice">
            <p>AI-generated responses do not constitute:</p>
            <BulletList items={['Medical or health advice', 'Psychological or mental health treatment', 'Legal advice', 'Financial or investment advice']} />
            <p className="mt-2">Users must consult qualified professionals for any such matters.</p>
          </Section>

          <Section title="4. AI Sajan Shah (Specific Reference)">
            <p>AI Sajan Shah is an AI-powered assistant built to:</p>
            <BulletList items={['Deliver motivational guidance', 'Provide structured thinking frameworks', 'Support learning and decision clarity']} />
            <p className="mt-2">Users acknowledge that:</p>
            <BulletList items={['AI Sajan Shah is not Sajan Shah personally', 'Responses are automated and system-generated', 'Outputs are based on algorithms and available data']} />
          </Section>

          <Section title="5. User Responsibility">
            <p>By using AI systems, you agree that:</p>
            <BulletList items={['You are solely responsible for your decisions and actions', 'You will not rely solely on AI for critical or high-risk decisions', 'You will use the platform ethically and responsibly']} />
          </Section>

          <Section title="6. Limitations of AI">
            <p>Users understand that:</p>
            <BulletList items={['AI outputs may be incomplete, inaccurate, or outdated', 'AI does not guarantee correctness or suitability', 'Responses may vary and are not personalized professional advice']} />
            <p className="mt-2">Sajan Shah Foundation makes no warranties regarding AI accuracy or outcomes.</p>
          </Section>

          <Section title="7. Data Usage & Privacy">
            <p>When using AI features:</p>
            <BulletList items={['Conversations and inputs may be stored and analyzed', 'Data may be used to improve AI systems and user experience', 'Interactions are not guaranteed to be confidential']} />
            <p className="mt-2">Users are strongly advised: <strong>Not to share sensitive personal, financial, or confidential information.</strong></p>
            <p className="mt-2">All data usage is governed by our Privacy Policy.</p>
          </Section>

          <Section title="8. Prohibited Use">
            <p>Users must not use AI systems for:</p>
            <BulletList items={['Illegal, harmful, or abusive activities', 'Generating misleading, offensive, or harmful content', 'Attempting to exploit, manipulate, or reverse engineer the system', 'Sharing confidential or third-party sensitive data']} />
            <p className="mt-2">Violation may result in immediate restriction or termination of access.</p>
          </Section>

          <Section title="9. Intellectual Property">
            <p>All AI systems, models, and outputs are the intellectual property of Sajan Shah Foundation.</p>
            <p className="mt-2">Users may not:</p>
            <BulletList items={['Copy or redistribute outputs for commercial purposes', 'Reverse engineer or replicate the AI system']} />
          </Section>

          <Section title="10. Availability & Modifications">
            <p>Sajan Shah Foundation reserves the right to:</p>
            <BulletList items={['Modify, suspend, or discontinue AI services', 'Update features, functionality, or policies at any time']} />
            <p className="mt-2">Continued use constitutes acceptance of updates.</p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>Sajan Shah Foundation shall not be liable for:</p>
            <BulletList items={['Any decisions made based on AI outputs', 'Any direct or indirect damages', 'Loss of data, opportunity, or outcomes']} />
            <p className="mt-2">Use of AI systems is entirely at your own risk.</p>
          </Section>

          <Section title="12. Age Requirement">
            <p>Users must be at least 13 years of age, or have parental/guardian consent, to use AI features.</p>
          </Section>

          <Section title="13. Termination of Access">
            <p>We reserve the right to suspend or terminate access to AI systems if this Policy is violated, or misuse or abuse is detected.</p>
          </Section>

          <Section title="14. Governing Law">
            <p>This Policy shall be governed by the laws of Ahmedabad, Gujarat, India. All disputes shall be subject to the jurisdiction of courts in Ahmedabad.</p>
          </Section>

          <Section title="15. Contact Information">
            <p>For any queries regarding AI usage:</p>
            <address className="not-italic mt-2 text-gray-600">
              <strong>Sajan Shah Foundation</strong><br />
              Email: <a href="mailto:support.ind@sajanshah.com" className="text-[#c8a96e] underline">support.ind@sajanshah.com</a>
            </address>
          </Section>

          <Section title="16. Acceptance of Policy">
            <p>By using AI-powered features provided by Sajan Shah Foundation, you confirm that you:</p>
            <BulletList items={['Have read and understood this Policy', 'Agree to comply with all terms']} />
          </Section>

          <div className="pt-10 mt-10 border-t border-gray-200 flex flex-col items-end">
            <img src="/sir sign.png" alt="Authorised Signature" className="h-20 object-contain mb-2" />
            <p className="text-sm text-gray-500">Authorised Signatory</p>
            <p className="text-sm font-semibold text-gray-700">Sajan Shah Foundation</p>
          </div>
        </div>
      </div>
    </main>
  );
}
