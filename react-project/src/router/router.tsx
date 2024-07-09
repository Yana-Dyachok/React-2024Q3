import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<MainPage />}
      errorElement={<NotFoundPage />}
    ></Route>,
  ),
);

export default router;
