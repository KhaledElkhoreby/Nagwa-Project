import Choices from '../components/Choices';
import Question from '../components/Question';
import { useGetWordsQuery } from '../services/wordsApi';

export default function Practice() {
  const { data } = useGetWordsQuery();
  return (
    <div className="card card-compact bg-base-100 shadow-2xl p-4 gap-y-4">
      <Question word="play" />
      <hr />
      <Choices CorrectPos="noun" />
    </div>
  );
}
