export default function Question({ word }: { word: string }) {
  return (
    <>
      <h1 className="text-xl">Which part of speech does the word belong to?</h1>
      <h2 className="text-lg text- shadow-xl border-b-2 max-w-min mx-auto px-2 py-1 rounded uppercase text-primary">
        {word}
      </h2>
    </>
  );
}
