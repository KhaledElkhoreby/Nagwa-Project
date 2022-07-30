export default function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-error font-semibold text-xl capitalize">{message}</p>
  );
}
