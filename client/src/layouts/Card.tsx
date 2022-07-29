interface IProps {
  children: React.ReactNode | any;
}

export default function Card({ children }: IProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-2xl p-4 gap-y-4">
      {children}
    </div>
  );
}
