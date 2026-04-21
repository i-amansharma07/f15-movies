interface Props {
  label: string;
}

export default function Badge({ label }: Props) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-body font-medium
                     bg-white/10 text-[#9B9591] border border-white/10 uppercase tracking-wider">
      {label}
    </span>
  );
}