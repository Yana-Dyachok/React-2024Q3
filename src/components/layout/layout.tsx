import { Outlet, useMatches } from 'react-router-dom';
import Header from '../header/header';

function Layout() {
  const matches = useMatches();
  const isErrorPage = matches.some(
    (match) => (match.handle as { hidePath?: boolean })?.hidePath,
  );
  return (
    <div>
      {!isErrorPage && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
