import {
  useArticleQuery,
  useArticleContentQuery,
  ArticleFullQuery,
} from '../generated/graphql';
import R from 'ramda';
import {QueryResult} from '@apollo/client';
import {DEVICE_ID} from '../constants';

const useArticle = (id: string): QueryResult<ArticleFullQuery> => {
  const cached = useArticleQuery({
    variables: {articleId: id, deviceId: DEVICE_ID},
    fetchPolicy: 'cache-only',
  });

  const fetched = useArticleContentQuery({
    variables: {id},
    fetchPolicy: 'cache-first',
  });

  const mergeQueryResult = (k: string, l: any, r: any) => {
    switch (k as keyof ReturnType<typeof useArticle>) {
      case 'data':
        if (r === undefined) {
          return l;
        }
        return R.mergeDeepRight(l, r);
      default:
        return r || l;
    }
  };

  return R.mergeWithKey(mergeQueryResult, cached, fetched);
};

export default useArticle;
