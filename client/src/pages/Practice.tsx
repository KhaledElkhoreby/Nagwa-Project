import { useEffect, useState } from 'react';
import Choices from '../components/Choices';
import Question from '../components/Question';
import { IRandomDifferentWord } from '../interfaces/IWordsResponse';
import { useGetWordsQuery } from '../services/wordsApi';
interface IAnswerStatus {
  status: 'correct' | 'wrong' | 'undetermined';
}

export default function Practice() {
  const { data, isError, isLoading } = useGetWordsQuery();
  const wordList = data?.randomDifferentWords;
  const [question, setQuestion] = useState<IRandomDifferentWord>();
  const [answerStatus, setAnswerStatus] = useState<IAnswerStatus>({
    status: 'undetermined',
  });
  const [counter, setCounter] = useState(0);

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
        console.log({ nextQuetion: wordList[counter] });
      } else {
      }
    }
  };

  if (isError) return <div>There is something wrong</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="card card-compact bg-base-100 shadow-2xl p-4 gap-y-4">
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
    </div>
  );
}
