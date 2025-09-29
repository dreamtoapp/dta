import DashboardLayout from './components/DashboardLayout';

export const metadata = {
  title: 'Dashboard - DreamToApp',
  description: 'Admin dashboard for managing applications, projects, and influencers',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
