import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import DescriptionItem from '../components/description-item/description-item';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />} errorElement={<NotFoundPage />}>
      <Route path="item/:itemId" element={<DescriptionItem />} />
    </Route>,
  ),
);

export default router;
