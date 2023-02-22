interface SummaryItemProps {
  icon: string;
  description: string;
  value: string;
}

export function SummaryItem({ icon, description, value }: SummaryItemProps) {
  return (
    <div className="flex flex-col items-center">
      <img alt={description} height="auto" src={icon} width="24px" />
      <p className="text-s">{description}</p>
      <p className="text-m font-bold">{value}</p>
    </div>
  );
}
