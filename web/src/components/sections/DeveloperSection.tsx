// web/src/components/sections/DeveloperSection.tsx
export function DeveloperSection() {
  const codeSnippet = `import { DniproClient } from '@dnipro/sdk';
import { Connection } from '@solana/web3.js';

const client = new DniproClient(connection);

// Discover all adapters
const adapters = await client.getActiveAdapters();

// Simulate a deposit
const sim = await client.simulateDeposit(
  ADAPTER_PROGRAM_IDS.kamino,
  usdcToAtomics(1000)
);

// Build deposit transaction
const tx = client.buildDepositTransaction({
  user: wallet.publicKey,
  adapterProgramId: ADAPTER_PROGRAM_IDS.kamino,
  underlyingMint: USDC_MINT,
  adapterVault: vaultAccount,
  feeRecipientAccount: feeAccount,
  deposit: { amount: usdcToAtomics(1000) },
});

await sendAndConfirmTransaction(connection, tx, [wallet]);`;

  return (
    <section className="py-24 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="tag mb-4">for developers</span>
            <h2 className="heading-serif text-3xl sm:text-4xl mb-6">Build on the same rails</h2>
            <p className="text-muted-foreground text-lg mb-8">
              The <code className="text-dnipro-300 font-mono text-sm">@dnipro/sdk</code> ships
              with fully-typed instruction builders, PDA helpers, and account fetchers.
              Scaffold new adapters with the CLI generator.
            </p>

            <div className="space-y-4">
              {[
                { cmd: 'npm install @dnipro/sdk',           desc: 'Install the TypeScript SDK' },
                { cmd: 'dnipro generate my-protocol',       desc: 'Scaffold a new adapter'     },
                { cmd: 'anchor build && anchor deploy',     desc: 'Compile and deploy'         },
                { cmd: 'dnipro register my-protocol',       desc: 'Register with governance'   },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className="flex items-center gap-4">
                  <code className="surface rounded-lg px-3 py-2 text-sm font-mono text-dnipro-300 flex-1">
                    $ {cmd}
                  </code>
                  <span className="text-sm text-muted-foreground hidden sm:block w-40">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code block */}
          <div className="surface rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/40">
              <span className="text-xs text-muted-foreground font-mono">dnipro-example.ts</span>
              <span className="text-xs text-muted-foreground font-mono">typescript</span>
            </div>
            <pre className="p-5 text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
