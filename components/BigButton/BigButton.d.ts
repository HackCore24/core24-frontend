export interface IBigButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}
