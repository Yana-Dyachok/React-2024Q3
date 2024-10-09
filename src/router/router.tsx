import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '../components/layout/layout';
import MainPage from '../pages/main-page/main-page';
import FormPage from '../pages/form-page/form-page';
import FormHookPage from '../pages/form-hook-page/form-hook-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="controlled" element={<FormPage />} />
      <Route path="uncontrolled" element={<FormHookPage />} />
      <Route path="*" element={<NotFoundPage />} handle={{ hidePath: true }} />
    </Route>,
  ),
);

export default router;
