// web/src/app/dashboard/page.tsx
import type { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard — Dnipro',
  description: 'Manage your Dnipro yield positions',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
