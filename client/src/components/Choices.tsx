import { MouseEvent, useState } from 'react';

interface IAnswerStatus {
  status: 'correct' | 'wrong' | 'undetermined';
}

export default function Choices({ CorrectPos }: { CorrectPos: string }) {
  const posArray = ['adverb', 'verb', 'noun', 'adjective'];
  const [answerStatus, setAnswerStatus] = useState<IAnswerStatus>({
    status: 'undetermined',
  });

  const onClickHandler = (event: MouseEvent) => {
    const button = event.target as HTMLButtonElement;
    button.classList.remove('btn-primary');
    if (button.textContent === CorrectPos) {
      setAnswerStatus((prev) => ({ ...prev, status: 'correct' }));
      button.classList.add('disabled:btn-success');
    } else {
      button.classList.add('disabled:btn-error');
      setAnswerStatus((prev) => ({ ...prev, status: 'wrong' }));
    }
  };

  return (
    <section className=" flex gap-2 justify-center items-center">
      {posArray.map((pos) => (
        <button
          key={pos}
          className={`btn btn-xs sm:btn-md btn-primary`}
          onClick={onClickHandler}
          disabled={answerStatus.status !== 'undetermined'}
        >
          {pos}
        </button>
      ))}
    </section>
  );
}
