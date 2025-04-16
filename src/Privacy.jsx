import { ShieldCheck } from "lucide-react";

export default function PrivacyNotice() {
  return (
    <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-2xl p-6 max-w-3xl mx-auto mt-10 shadow-md">
      <div className="flex items-center mb-4">
        <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h2 className="text-xl font-semibold">Privacy Policy & Intellectual Property Notice</h2>
      </div>
      <p className="mb-3 text-sm text-neutral-700 dark:text-neutral-300">
        The content, codebase, and overall design of this project are the exclusive intellectual property of <span className="font-medium text-blue-600 dark:text-blue-400">Ujjwal</span>.
      </p>
      <ul className="list-disc list-inside text-sm space-y-2 text-neutral-700 dark:text-neutral-300">
        <li>Any form of copying, cloning, or replication is strictly <span className="font-semibold">prohibited</span>.</li>
        <li>Uploading videos, walkthroughs, or showcasing this project on social media platforms without permission is not allowed.</li>
        <li>Use of any part of this project requires <span className="font-medium">explicit written consent</span> from the creator.</li>
        <li>Unauthorized use may lead to formal action under applicable copyright and intellectual property laws.</li>
      </ul>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500 italic">
        Please respect the effort and originality behind this work. For inquiries or permissions, feel free to reach out.
      </p>
    </div>
  );
}
