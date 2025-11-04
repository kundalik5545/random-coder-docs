import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { UserDropdown } from '@/components/user-dropdown';
import { LoginIcon } from '@/components/login-icon';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <HomeLayout {...baseOptions()}>
        {children}
      </HomeLayout>
      <div className="fixed top-0 right-0 z-50 flex items-center gap-2 p-1">
        <LoginIcon />
        <UserDropdown />
      </div>
    </>
  );
}
