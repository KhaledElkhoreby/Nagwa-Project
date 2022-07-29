import Choices from '../components/Choices';
import Question from '../components/Question';

export default function practice() {
  return (
    <div className="card card-compact bg-base-100 shadow-2xl p-4 gap-y-4">
      <Question word="play" />
      <hr />
      <Choices CorrectPos="noun" />
    </div>
  );
}
