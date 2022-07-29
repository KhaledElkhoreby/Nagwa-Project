import Choices from '../components/Choices';
import Question from '../components/Question';
import { useGetWordsQuery } from '../services/wordsApi';

export default function Practice() {
  const { data, isError, isLoading, error } = useGetWordsQuery();
  console.log(data);
  console.log(error);
  if (isError) return <div>There is something wrong</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="card card-compact bg-base-100 shadow-2xl p-4 gap-y-4">
      <Question word="play" />
      <hr />
      <Choices CorrectPos="noun" />
    </div>
  );
}
