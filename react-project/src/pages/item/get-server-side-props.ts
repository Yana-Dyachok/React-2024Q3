import { GetServerSideProps } from 'next';
import { wrapper } from '../../redux/store/store';
import { apiGetByIdSlice } from '../../redux/api-slices/api-get-slices';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { itemId } = context.params || {};
    if (typeof itemId === 'string') {
      await store.dispatch(
        apiGetByIdSlice.endpoints.fetchById.initiate(itemId),
      );
    }

    return {
      props: {},
    };
  });
