// web/src/components/layout/Footer.tsx
import Link from 'next/link';
import { Github, Twitter, BookOpen } from 'lucide-react';
import { DniproMark } from '@/components/icons/AdapterIcons';

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <DniproMark size={24} className="text-wheat-400" />
              <span className="font-semibold heading-serif">Dnipro</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Universal Yield Adapter Standard for the Solana ecosystem.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com/dnipro-finance/dnipro" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/dniprofinance" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                <BookOpen className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Protocol</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/adapters" className="hover:text-foreground transition-colors">Adapters</Link></li>
              <li><Link href="/architecture" className="hover:text-foreground transition-colors">Architecture</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Developers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/examples" className="hover:text-foreground transition-colors">SDK Examples</Link></li>
              <li><Link href="/docs/build-adapter" className="hover:text-foreground transition-colors">Build an Adapter</Link></li>
              <li>
                <a href="https://github.com/dnipro-finance/dnipro" target="_blank" rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://discord.gg/dnipro" target="_blank" rel="noopener noreferrer"
                className="hover:text-foreground transition-colors">Discord ↗</a></li>
              <li><a href="https://twitter.com/dniprofinance" target="_blank" rel="noopener noreferrer"
                className="hover:text-foreground transition-colors">Twitter ↗</a></li>
              <li><Link href="/docs/governance" className="hover:text-foreground transition-colors">Governance</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © 2024 Dnipro Protocol. Open source under MIT License.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ for the Solana ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
}
