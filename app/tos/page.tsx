import Navbar from "../components/Navbar";
import PricingCalculator from "../components/PricingCalculator";
import CommissionForm from "../components/CommissionForm";

export default function TosPage() {
  return (
    <div className="min-h-screen gradient-bg text-white">

      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 px-10 space-y-24">

        {/* HEADER */}

        <section>

          <h1 className="text-4xl font-bold mb-6">
            Services, Pricing & Terms
          </h1>

          <p className="text-gray-300 max-w-2xl">
            This page explains the services I provide, pricing structure
            and terms for commissioned work.
          </p>

        </section>

        {/* SERVICES */}

        <section>

          <h2 className="text-3xl font-semibold mb-10">
            Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Game Design</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                <li>Gameplay systems design</li>
                <li>Progression systems</li>
                <li>Feature planning</li>
                <li>Player retention mechanics</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Project Management</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                <li>Team coordination</li>
                <li>Production planning</li>
                <li>Milestone tracking</li>
                <li>Update roadmap planning</li>
              </ul>

              <p className="mt-6 font-semibold text-lg">
                $550 / month
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Creative Director</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                <li>Game vision development</li>
                <li>Design consistency</li>
                <li>Gameplay direction</li>
                <li>Content strategy</li>
              </ul>

              <p className="mt-6 font-semibold text-lg">
                $200 / month
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">QA Manager</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                <li>Bug tracking systems</li>
                <li>Testing coordination</li>
                <li>QA pipelines</li>
                <li>Release preparation</li>
              </ul>

              <p className="mt-6 font-semibold text-lg">
                $230 / month
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Documentation</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                <li>Game Design Documents</li>
                <li>Feature documentation</li>
                <li>Systems documentation</li>
                <li>Structured project docs</li>
              </ul>

              <p className="mt-6 font-semibold text-lg">
                $3.50 per page
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Character Design</h3>

              <ul className="text-gray-300 text-sm space-y-2">
                <li>Character concept</li>
                <li>Name & personality</li>
                <li>Gameplay role design</li>
                <li>Behavior design</li>
              </ul>

              <p className="mt-6 font-semibold text-lg">
                $17
              </p>
            </div>

          </div>

        </section>

        {/* DOCUMENTATION PRICING */}

        <section>

          <h2 className="text-3xl font-semibold mb-10">
            Documentation Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="p-8 rounded-xl bg-white/5 border border-white/10">

              <h3 className="text-xl font-semibold mb-6">
                Price Table
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>Per Page — $3.50</li>
                <li>10 Pages — $35</li>
                <li>25 Pages — $87.50</li>
                <li>50 Pages — $175</li>
                <li>100 Pages — $350</li>
              </ul>

            </div>

            <PricingCalculator />

          </div>

        </section>

        {/* REVENUE SHARE */}

        <section>

          <h2 className="text-3xl font-semibold mb-8">
            Revenue Share Option
          </h2>

          <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-gray-300 space-y-4 max-w-3xl">

            <p>
              For long-term projects, revenue share agreements may be accepted
              as an alternative to standard monthly pricing.
            </p>

            <p>
              If a percentage of the game's revenue is offered, the monthly
              management price may be reduced depending on the size of the
              revenue share.
            </p>

            <p>
              If the revenue percentage is high enough, the collaboration may
              instead be structured as a **one-time payment of $400 instead
              of monthly payments**.
            </p>

            <p>This option applies to:</p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Project Manager</li>
              <li>Creative Director</li>
              <li>QA Manager</li>
            </ul>

            <p>
              The final agreement depends on project scope, expected revenue
              potential and responsibilities involved.
            </p>

          </div>

        </section>

        {/* COMMISSION */}

        <section>

          <h2 className="text-3xl font-semibold mb-10">
            Start a Commission
          </h2>

          <CommissionForm />

        </section>

        {/* TERMS */}

        <section>

          <h2 className="text-3xl font-semibold mb-8">
            Terms of Service
          </h2>

          <div className="space-y-6 text-gray-300 max-w-4xl">

            <p>
              By commissioning services, the client agrees to these Terms of
              Service. These terms apply to project management, documentation,
              creative direction, QA management and consulting services.
            </p>

            <p>
              Payments may be made in USD or Robux. Full payment may be
              required before work begins unless otherwise agreed.
            </p>

            <p>
              Minor revisions are included, but major design changes or work
              outside the agreed scope may require additional payment.
            </p>

            <p>
              Completed work is non-refundable. Partial refunds may be issued
              if a project is cancelled early depending on progress.
            </p>

            <p>
              After full payment, the client receives the right to use the
              delivered work for their project. The provider may showcase
              non-confidential work as portfolio examples.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}