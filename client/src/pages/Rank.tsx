import { useGetRankofScoreQuery } from '../services/rankApi';

export default function Rank() {
  const { data, isError, isLoading } = useGetRankofScoreQuery(90);
  const rank = data?.rank;
  console.log({ rank });

  if (isError) return <div>There is a error</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>{rank}</div>;
}
