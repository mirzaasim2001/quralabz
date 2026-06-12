import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | QuraLabz",
  description:
    "The terms and conditions governing your use of the QuraLabz interactive data science learning platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 sm:px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-slate-400">Last Updated: May 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 text-slate-300">
            {/* 1. Agreement to Terms */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using QuraLabz ("Site," "Platform," "we," "us," "our"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use QuraLabz. We reserve the right to modify these terms at any time, and such modifications become effective immediately upon posting.
              </p>
            </div>

            {/* 2. Use License */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on QuraLabz for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Circumvent security measures or access controls</li>
                <li>Engage in any form of automated scraping or data collection without permission</li>
              </ul>
            </div>

            {/* 3. Disclaimer */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
              <p className="mb-4">
                The materials on QuraLabz are provided on an "as-is" basis. QuraLabz makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mb-4">
                <strong>Educational Use Only:</strong> QuraLabz is provided for educational purposes. While we strive for accuracy, we do not guarantee that all content is correct, complete, or error-free. Your use of code snippets and techniques is at your own risk.
              </p>
              <p>
                <strong>No Warranty for Availability:</strong> We make no warranty that the site will be uninterrupted or error-free, that defects will be corrected, or that the site or the server that makes it available are free of viruses or other harmful components.
              </p>
            </div>

            {/* 4. Limitations of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitations of Liability</h2>
              <p className="mb-4">
                In no event shall QuraLabz or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on QuraLabz, even if QuraLabz or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              <p>
                Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </div>

            {/* 5. Accuracy of Materials */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on QuraLabz could include technical, typographical, or photographic errors. QuraLabz does not warrant that any of the materials on its Site are accurate, complete, or current. QuraLabz may make changes to the materials contained on its Site at any time without notice.
              </p>
            </div>

            {/* 6. Materials and Content */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Materials and Content</h2>
              <p className="mb-4">
                The materials on QuraLabz are:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Copyrighted by QuraLabz or third-party content providers</li>
                <li>Protected by international copyright laws</li>
                <li>Licensed for educational use only</li>
              </ul>
              <p className="mt-4">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Reproduce or distribute materials for commercial purposes</li>
                <li>Claim ownership of the materials</li>
                <li>Sell or resell access to the materials</li>
                <li>Use materials for creating competing educational products</li>
              </ul>
            </div>

            {/* 7. User-Generated Content */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. User-Generated Content</h2>
              <p className="mb-4">
                When you submit code, comments, or other content through QuraLabz:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>You retain ownership of your content</li>
                <li>You grant QuraLabz a license to use, display, and store your content for platform improvement</li>
                <li>You warrant that your content does not infringe on others' intellectual property rights</li>
                <li>You agree not to submit illegal, abusive, or harmful content</li>
              </ul>
            </div>

            {/* 8. Limitation of Time */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Time</h2>
              <p>
                Any claim or dispute arising out of the use of QuraLabz must be brought within one (1) year of the claim arising, or such claim is forever barred.
              </p>
            </div>

            {/* 9. Revisions and Errata */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Revisions and Errata</h2>
              <p>
                QuraLabz may revise these terms of service for the Site at any time without notice. By using this Site, you are agreeing to be bound by the then-current version of these terms of service.
              </p>
            </div>

            {/* 10. Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            {/* 11. Prohibited Activities */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Prohibited Activities</h2>
              <p className="mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Harass, abuse, or harm others on the platform</li>
                <li>Attempt to gain unauthorized access to the site or its systems</li>
                <li>Introduce viruses, malware, or malicious code</li>
                <li>Use the platform to distribute spam or phishing content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on others' intellectual property rights</li>
                <li>Engage in automated scraping without authorization</li>
                <li>Share login credentials or allow unauthorized use of your account</li>
              </ul>
            </div>

            {/* 12. Account Responsibility */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">12. Account Responsibility</h2>
              <p>
                If you use QuraLabz to create an account (if applicable), you are responsible for maintaining the confidentiality of your account information and password, and for all activities that occur under your account. You agree to notify QuraLabz immediately of any unauthorized use of your account.
              </p>
            </div>

            {/* 13. Termination */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
              <p>
                QuraLabz may terminate or suspend access to the Site immediately, without prior notice or liability, for any reason, including if you breach these Terms & Conditions. Upon termination, your right to use the Site will cease immediately.
              </p>
            </div>

            {/* 14. Third-Party Links */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">14. Third-Party Links</h2>
              <p>
                QuraLabz may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external sites. Your use of third-party sites is governed by their own terms and policies. We encourage you to review these policies before providing personal information.
              </p>
            </div>

            {/* 15. Indemnification */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">15. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless QuraLabz, its owners, operators, and employees from any claims, damages, losses, liabilities, and expenses arising from your use of the Site or violation of these Terms & Conditions.
              </p>
            </div>

            {/* 16. Severability */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">16. Severability</h2>
              <p>
                If any provision of these Terms & Conditions is deemed invalid or unenforceable, that provision will be modified to the minimum extent necessary to make it valid, and the remaining provisions will continue in full force and effect.
              </p>
            </div>

            {/* 17. Entire Agreement */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">17. Entire Agreement</h2>
              <p>
                These Terms & Conditions, together with our Privacy Policy, constitute the entire agreement between you and QuraLabz regarding your use of the Site and supersede all prior or contemporaneous agreements, negotiations, and discussions, whether written or oral.
              </p>
            </div>

            {/* 18. Contact for Disputes */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">18. Contact for Disputes</h2>
              <p className="mb-4">
                If you have any questions or disputes regarding these Terms & Conditions, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white font-semibold mb-2">QuraLabz Legal Team</p>
                <p>Email: <span className="text-cyan-400">legal@quralabz.com</span></p>
                <p>Website: <span className="text-cyan-400">https://quralabz.com</span></p>
              </div>
            </div>

            {/* Compliance Notice */}
            <div className="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Compliance Notice:</strong> These Terms & Conditions are designed to comply with international legal standards and protect both the platform and its users. By using QuraLabz, you acknowledge that you have read and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
