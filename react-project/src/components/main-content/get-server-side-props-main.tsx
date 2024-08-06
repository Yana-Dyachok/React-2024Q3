import { GetServerSideProps } from 'next';
import { wrapper } from '../../redux/store/store';
import { apiGetSearchSlice } from '../../redux/api-slices/api-get-search-slice';
import { apiPostSearchSlice } from '../../redux/api-slices/api-post-slice';
import { setSearchResults } from '../../redux/slices/search-result-slice';
import { setGlobalLoading } from '../../redux/slices/loading-slice';
import { apiGetByIdSlice } from '../../redux/api-slices/api-get-slices';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query, params } = context;
    const searchQuery = (query.searchQuery as string) || '';
    const page = parseInt((query.page as string) || '1', 10);
    const pageSize = 15;
    const { itemId } = params || {};

    let postData, getData, itemData;

    try {
      if (typeof itemId === 'string') {
        itemData = await store
          .dispatch(apiGetByIdSlice.endpoints.fetchById.initiate(itemId))
          .unwrap();
      }

      if (searchQuery) {
        const fetchPostQuery = await store
          .dispatch(
            apiPostSearchSlice.endpoints.fetchPost.initiate({
              searchQuery,
              pageSize,
              page,
            }),
          )
          .unwrap();
        postData = fetchPostQuery;
        console.log('fetchPostQuery result:', fetchPostQuery);
      } else {
        const fetchGetQuery = await store
          .dispatch(
            apiGetSearchSlice.endpoints.fetchGet.initiate({
              page,
              pageSize,
            }),
          )
          .unwrap();
        getData = fetchGetQuery;
        console.log('fetchGetQuery result:', fetchGetQuery);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    const items = [
      ...(itemData ? [itemData] : []),
      ...(postData
        ? postData.medicalConditions
        : getData?.medicalConditions || []),
    ];
    const totalPages = postData
      ? postData.page.totalPages
      : getData?.page.totalPages || 1;

    store.dispatch(
      setSearchResults({
        items,
        totalPages,
        currentPage: page,
      }),
    );

    store.dispatch(setGlobalLoading(false));

    console.log('SSR data:', { items, totalPages, currentPage: page });

    return {
      props: {
        initialData: {
          items,
          totalPages,
          currentPage: page,
        },
      },
    };
  });

export default getServerSideProps;
