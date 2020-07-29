import {
  useArticleQuery,
  useArticleContentQuery,
  ArticleFragment,
} from '../generated/graphql';
import R from 'ramda';
import {QueryResult} from '@apollo/client';

const useArticle = (
  id: string,
): QueryResult<Record<'article', ArticleFragment>> => {
  const cached = useArticleQuery({variables: {id}, fetchPolicy: 'cache-only'});

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
