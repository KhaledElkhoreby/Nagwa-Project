import { Dispatch, MouseEvent } from 'react';
import { useAppDispatch } from '../app/hooks';
import { increment } from '../features/score/scoreSlice';
interface IAnswerStatus {
  status: 'correct' | 'wrong' | 'undetermined';
}

interface IProps {
  CorrectPos: string;
  setAnswerStatus: Dispatch<React.SetStateAction<IAnswerStatus>>;
  answerStatus: IAnswerStatus;
}

export default function Choices({
  CorrectPos,
  setAnswerStatus,
  answerStatus,
}: IProps) {
  let posArray = ['adverb', 'verb', 'noun', 'adjective'];
  const dispatch = useAppDispatch();
  const onClickHandler = (event: MouseEvent) => {
    // Reset Style for all choice buttons
    const button = event.target as HTMLButtonElement;
    const buttons = Array.from(
      button.parentElement?.getElementsByTagName('button')!
    );
    buttons.forEach((btn) =>
      btn.classList.remove('disabled:btn-success', 'disabled:btn-error')
    );
    if (button.textContent === CorrectPos) {
      dispatch(increment({ isCorrect: true }));
      setAnswerStatus((prev) => ({ ...prev, status: 'correct' }));
      button.classList.add('disabled:btn-success');
    } else {
      dispatch(increment({ isCorrect: false }));
      button.classList.add('disabled:btn-error');
      setAnswerStatus((prev) => ({ ...prev, status: 'wrong' }));
    }
  };

  return (
    <>
      <section className="flex flex-wrap sm:flex-nowrap gap-2 justify-center items-center">
        {posArray.map((pos) => (
          <button
            key={pos}
            className={`btn basis-[calc(50%-0.5rem)] flex-[0.5] sm:btn-md lg:btn-lg btn-primary`}
            onClick={onClickHandler}
            disabled={answerStatus.status !== 'undetermined'}
          >
            {pos}
          </button>
        ))}
      </section>
      <hr />
      {answerStatus.status !== 'undetermined' && (
        <h1
          className={`capitalize text-slate-800 font-semibold ${
            answerStatus.status === 'correct' ? 'text-success' : ''
          }${answerStatus.status === 'wrong' ? 'text-error' : ''}`}
        >
          {answerStatus.status} Answer
        </h1>
      )}
    </>
  );
}
