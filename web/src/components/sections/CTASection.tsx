// web/src/components/sections/CTASection.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RiverBackground } from '@/components/visual/RiverBackground';

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="surface rounded-lg p-12 sm:p-16 relative overflow-hidden text-center">
          <RiverBackground className="opacity-40" />
          <div className="relative">
            <h2 className="heading-serif text-3xl sm:text-4xl mb-4">
              Ready to put it in the water?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Connect a wallet and deposit into any of the five live adapters
              through one unified interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 rounded-md bg-wheat-400 px-8 py-3.5 text-sm font-semibold text-river-ink hover:bg-wheat-300 transition-colors"
              >
                Launch dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/build-adapter"
                className="flex items-center justify-center gap-2 rounded-md border border-border px-8 py-3.5 text-sm font-semibold hover:bg-secondary transition-colors"
              >
                Build an adapter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
