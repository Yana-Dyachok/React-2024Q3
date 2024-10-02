import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import DescriptionItem from '../pages/description-item/description-item';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/React-2024Q3/" element={<MainPage />}>
        <Route path="item/:itemId" element={<DescriptionItem />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

export default router;
