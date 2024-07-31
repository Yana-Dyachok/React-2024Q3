import { GetServerSideProps } from 'next';
import { wrapper } from '../../redux/store/store';
import { apiGetSearchSlice } from '../../redux/api-slices/api-get-search-slice';
import { apiPostSearchSlice } from '../../redux/api-slices/api-post-slice';
import { setSearchResults } from '../../redux/slices/search-result-slice';
import { setGlobalLoading } from '../../redux/slices/loading-slice';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query } = context;
    const searchQuery = (query.searchQuery as string) || '';
    const page = parseInt((query.page as string) || '1', 10);
    const pageSize = 15;

    let postData, getData;

    try {
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
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    const items = postData
      ? postData.medicalConditions
      : getData?.medicalConditions || [];
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
