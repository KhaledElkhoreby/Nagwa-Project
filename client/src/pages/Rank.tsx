import { useAppSelector } from '../app/hooks';
import { useGetRankofScoreQuery } from '../services/rankApi';
import { useNavigate } from 'react-router-dom';
export default function Rank() {
  const navigate = useNavigate();
  const score = useAppSelector(({ score }) => score.score);

  // If the no score redirect to the practice page
  if (!score) navigate('/');

  const { data, isError, isLoading } = useGetRankofScoreQuery(score);
  const rank = data?.rank;
  console.log({ score });
  console.log({ rank });

  if (isError) return <div>There is a error</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>{rank}</div>;
}
