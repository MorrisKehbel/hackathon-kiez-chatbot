export const About = () => (
  <div className="p-6 overflow-y-auto h-full flex flex-col gap-5">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      About <span className="text-emerald-500">BÄR BUDDY</span>
    </h2>

    <p className="text-gray-700">
      <strong>BÄR BUDDY</strong> is not just another chatbot — it's an{" "}
      <span className="font-semibold text-emerald-600">AI Coach</span> built for
      the{" "}
      <span className="font-semibold text-gray-800">
        Berlin innovation ecosystem
      </span>
      .
    </p>

    <p className="text-gray-600">
      Unlike generic AIs (like ChatGPT) that have broad but context-free
      knowledge, our assistant is{" "}
      <strong>focused, localized, and data-aware</strong>.
    </p>

    <div className="bg-gray-50 border-l-4 border-emerald-400 p-4 rounded">
      <p className="text-gray-700">
        Our AI analyses <strong>user profiles</strong>,{" "}
        <strong>live event data</strong>, and
        <strong> ecosystem insights</strong> to generate{" "}
        <span className="font-semibold text-emerald-600">
          next-step recommendations
        </span>{" "}
        that evolve with user behaviour.
      </p>
      <p className="text-gray-600 mt-2 italic">
        Example: If a user attends 2–3 UX events, the AI suggests the next
        relevant accelerator or mentorship opportunity.
      </p>
    </div>

    <p className="text-gray-700">
      <span className="font-semibold">ChatGPT</span> doesn't have access to your
      user data or Berlin's live ecosystem —{" "}
      <span className="font-semibold text-emerald-600">our AI does</span>. It
      delivers <strong>personalized, real-time, data-driven suggestions</strong>
      .
    </p>

    <div className="bg-white border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">How it works</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>
          Imports event data from{" "}
          <strong>Eventbrite, Meetup, Berlin Partner</strong> and others.
        </li>
        <li>Automatically translates and summarizes event descriptions.</li>
        <li>
          Constantly updates and structures <strong>local event data</strong>.
        </li>
      </ul>
    </div>

    <div className="bg-gray-50 border-l-4 border-emerald-400 p-4 rounded">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        AI-Powered City Map Layer
      </h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Identifies districts with the most tech events this month.</li>
        <li>Highlights areas best suited for specific skills.</li>
        <li>Analyzes startup density and engagement across Berlin.</li>
      </ul>
    </div>

    <p className="text-gray-700">
      A simple chatbot can't generate this kind of <strong>geo-insight</strong>{" "}
      automatically — our AI can. It even <strong>matches newcomers</strong>{" "}
      with mentors or collaborators based on their goals, profiles, and
      activity.
    </p>

    <div className="bg-white border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Dual-Sided AI Functionality
      </h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>
          Collects user data anonymously (skills, interests, location,
          engagement).
        </li>
        <li>
          Analyzes which <strong>Kieze</strong> have the highest newcomer
          engagement.
        </li>
        <li>Identifies most in-demand topics or industries.</li>
        <li>Detects underrepresented events or skills programs.</li>
      </ul>
    </div>

    <p className="text-gray-700">
      Ultimately, <strong>BÄR BUDDY's AI</strong> acts as your{" "}
      <span className="font-semibold text-emerald-600">Integration Coach</span>{" "}
      — learning from your actions and Berlin's dynamic ecosystem to guide you
      from <span className="font-semibold">discovery</span> →{" "}
      <span className="font-semibold">participation</span> →{" "}
      <span className="font-semibold">contribution</span>.
    </p>
  </div>
);
