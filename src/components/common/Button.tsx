interface Props {
  label: string;
  variant?: 'primary' | 'outline';
}

export const Button = ({ label, variant = 'primary' }: Props) => {
  const styles = variant === 'primary' 
    ? "bg-orange-600 hover:bg-orange-700 text-white shadow-[0_4px_20px_rgba(234,88,12,0.3)]"
    : "border border-white/20 hover:border-orange-500 text-white";

  return (
    <button className={`${styles} px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all active:scale-95`}>
      {label}
    </button>
  );
};