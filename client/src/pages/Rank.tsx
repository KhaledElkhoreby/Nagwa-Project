import { useAppSelector } from '../app/hooks';
import { useGetRankofScoreQuery } from '../services/rankApi';

export default function Rank() {
  const score = useAppSelector(({ score }) => score.score);
  const { data, isError, isLoading } = useGetRankofScoreQuery(score);
  const rank = data?.rank;
  console.log({ score });
  console.log({ rank });

  if (isError) return <div>There is a error</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>{rank}</div>;
}
