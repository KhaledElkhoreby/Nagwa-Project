import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Choices from '../components/Choices';
import Question from '../components/Question';
import { reset } from '../features/score/scoreSlice';
import { IRandomDifferentWord } from '../interfaces/IWordsResponse';
import Card from '../layouts/Card';
import { useGetWordsQuery } from '../services/wordsApi';
interface IAnswerStatus {
  status: 'correct' | 'wrong' | 'undetermined';
}

export default function Practice() {
  const { data, isError, isLoading } = useGetWordsQuery();
  const [question, setQuestion] = useState<IRandomDifferentWord>();
  const [answerStatus, setAnswerStatus] = useState<IAnswerStatus>({
    status: 'undetermined',
  });
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const progressValue = useAppSelector(({ score }) => score.progress);
  const dispatch = useAppDispatch();
  const wordList = data?.randomDifferentWords;

  useEffect(() => {
    if (wordList && wordList?.length > 0) {
      setQuestion(wordList[0]);
    }
  }, [wordList]);

  const nextButtonHandler = () => {
    if (wordList) {
      if (counter < wordList?.length - 1) {
        setCounter((prev) => ++prev);
        const nextCouner = counter + 1;
        setQuestion(wordList[nextCouner]);
        setAnswerStatus((prev) => ({ ...prev, status: 'undetermined' }));
      } else {
        dispatch(reset());
        navigate('/rank');
      }
    }
  };

  if (isError) return <div>There is something wrong</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Card>
      <div>
        <div>{progressValue / 10} / 10</div>
        <progress
          className="progress progress-success h-3 md:h-4 lg:h-5"
          value={progressValue}
          max={100}
        ></progress>
      </div>
      <Question word={question?.word!} />
      <hr />
      <Choices
        CorrectPos={question?.pos!}
        setAnswerStatus={setAnswerStatus}
        answerStatus={answerStatus}
      />
      <button
        className={`btn btn-success ${
          answerStatus.status === 'undetermined' ? 'hidden' : ''
        }`}
        onClick={nextButtonHandler}
      >
        Next
      </button>
    </Card>
  );
}
