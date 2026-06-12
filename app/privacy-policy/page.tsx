import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | QuraLabz",
  description:
    "How QuraLabz collects, uses, and protects your information, including cookies, analytics, and advertising disclosures.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-400">Last Updated: May 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
            {/* 1. Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to QuraLabz ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you visit our website.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Information You Provide:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Contact Information:</strong> When you book a consultation or contact us, we collect your name, email address, and message content.</li>
                    <li><strong>Learning Data:</strong> We may track your progress through lessons, completed modules, and interaction patterns to improve your learning experience.</li>
                    <li><strong>Code Submissions:</strong> Your Python code and outputs from the interactive code playground may be logged for debugging and service improvement.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Information Collected Automatically:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Usage Data:</strong> Page views, time spent on pages, browser type, device type, and operating system.</li>
                    <li><strong>Cookies & Local Storage:</strong> We use cookies and local storage to remember your preferences and session data.</li>
                    <li><strong>IP Address:</strong> Your IP address is collected for analytics and security purposes.</li>
                    <li><strong>Analytics:</strong> We use third-party analytics services (e.g., Google Analytics) to understand user behavior.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and improve our learning platform</li>
                <li>To personalize your learning experience</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send you educational content and updates (with your consent)</li>
                <li>To conduct analytics and understand how users interact with QuraLabz</li>
                <li>To prevent fraud, abuse, and security issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* 4. Third-Party Services */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
              <p className="mb-4">
                Our website may use third-party services for advertising, analytics, and hosting:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Google Analytics:</strong> Tracks user behavior to help us understand how you use our site.</li>
                <li><strong>Google AdSense:</strong> Displays targeted advertisements. Google may use cookies to personalize ads.</li>
                <li><strong>Hosting Providers:</strong> Your data may be stored on secure third-party servers.</li>
                <li><strong>Email Services:</strong> We use email providers to deliver messages.</li>
              </ul>
              <p className="mt-4">
                These third parties have their own privacy policies. We encourage you to review them.
              </p>
            </div>

            {/* 5. Cookies & Tracking */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies & Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Remember your preferences and login information</li>
                <li>Track usage patterns for analytics</li>
                <li>Enable advertising networks to deliver personalized ads</li>
                <li>Measure the effectiveness of our marketing campaigns</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. However, disabling cookies may affect your experience on our site.
              </p>
            </div>

            {/* 6. Advertising & Your Data */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Advertising & Your Data</h2>
              <p>
                QuraLabz uses advertising networks to monetize the platform while keeping it free for learners. Advertising partners may:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Collect data about your browsing behavior across websites</li>
                <li>Use cookies and pixels to track your activity</li>
                <li>Create profiles about your interests to show relevant ads</li>
                <li>Share data with other advertisers and networks</li>
              </ul>
              <p className="mt-4">
                To opt-out of personalized advertising, visit the Digital Advertising Alliance's opt-out portal at www.aboutads.info.
              </p>
            </div>

            {/* 7. Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>HTTPS encryption for data in transit</li>
                <li>Secure storage of sensitive information</li>
                <li>Regular security audits and updates</li>
                <li>Access restrictions to personal data</li>
              </ul>
              <p className="mt-4">
                However, no online platform is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </div>

            {/* 8. Your Privacy Rights */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Your Privacy Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your data (within legal limits)</li>
                <li><strong>Right to Opt-Out:</strong> Opt-out of marketing communications and targeted advertising</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <span className="text-cyan-400">support@quralabz.com</span>
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p>
                QuraLabz is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly. Parents or guardians who believe their child has provided information to us should contact us immediately.
              </p>
            </div>

            {/* 10. International Data Transfers */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have different data protection laws. By using QuraLabz, you consent to such transfers.
              </p>
            </div>

            {/* 11. Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Data Retention</h2>
              <p>
                We retain your personal data for as long as necessary to provide our services. Learning progress data is retained until you request deletion. Contact information is retained to respond to your inquiries and comply with legal obligations.
              </p>
            </div>

            {/* 12. Changes to This Privacy Policy */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of QuraLabz following such changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </div>

            {/* 13. Contact Us */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white font-semibold mb-2">QuraLabz Privacy Team</p>
                <p>Email: <span className="text-cyan-400">privacy@quralabz.com</span></p>
                <p>Website: <span className="text-cyan-400">https://quralabz.com</span></p>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Compliance:</strong> This Privacy Policy complies with GDPR, CCPA, and other international privacy regulations. We are committed to protecting your privacy while maintaining a free, high-quality learning platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
