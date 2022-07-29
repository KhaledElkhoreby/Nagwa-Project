import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useGetRankofScoreQuery } from '../services/rankApi';
export default function Rank() {
  const navigate = useNavigate();
  const { score } = useAppSelector(({ score }) => score);

  // If the no score redirect to the practice page
  if (!score) navigate('/');

  const { data, isError, isLoading } = useGetRankofScoreQuery(score);
  const rank = data?.rank;

  if (isError) return <div>There is a error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="card card-compact bg-base-100 shadow-2xl p-4 gap-y-4">
      <p className="text-xl font-semibold uppercase">
        Your rank{' '}
        <span
          className={`font-bold text-2xl ${
            rank! >= 80
              ? 'text-success'
              : rank! >= 60
              ? 'text-warning'
              : 'text-error'
          }`}
        >
          {rank}
        </span>
      </p>
      <p className="text-xl font-semibold uppercase">
        Your score{' '}
        <span
          className={`font-bold text-2xl ${
            score! >= 80
              ? 'text-success'
              : score! >= 60
              ? 'text-warning'
              : 'text-error'
          }`}
        >
          {score}
        </span>
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Play Again
      </button>
    </div>
  );
}
