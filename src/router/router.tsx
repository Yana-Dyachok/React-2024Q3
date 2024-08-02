import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import FormPage from '../pages/form-page/form-page';
import FormHookPage from '../pages/form-hook-page/form-hook-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="form" element={<FormPage />} />
      <Route path="form-hook" element={<FormHookPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

export default router;
