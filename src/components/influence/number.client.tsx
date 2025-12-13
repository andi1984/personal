function Number({ className, n }: { className?: string; n: number }) {
  return <span className={className}>{n}</span>;
}

export default Number;
