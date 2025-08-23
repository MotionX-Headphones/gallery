import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
// import {
//   retrieveLaunchParams,
//   useSignal,
//   isMiniAppDark,
// } from '@telegram-apps/sdk-react';
// import { AppRoot } from '@telegram-apps/telegram-ui';
// import '@telegram-apps/telegram-ui/dist/styles.css';
import { routes } from '@/navigation/routes.tsx';
import { Toaster } from '@/components/ui/sonner';

export function App() {
  // const lp = useMemo(() => retrieveLaunchParams(), []);
  // const isDark = useSignal(isMiniAppDark);
  // const isDark = true;
  return (
    // <AppRoot
    //   appearance={isDark ? 'dark' : 'light'}
    //   platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    // >
    <>
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </HashRouter>
      <Toaster position='top-center' />
    </>
    // </AppRoot>
  );
}
