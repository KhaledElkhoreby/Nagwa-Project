import { ScaleLoader } from 'react-spinners';
export default function Loading() {
  return (
    <div>
      <ScaleLoader
        color="#570df8"
        height={50}
        margin={4}
        speedMultiplier={1.5}
        width={10}
      />
    </div>
  );
}
