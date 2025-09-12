import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

const smartMenuButtonVariants = cva(
  "rounded-2xl font-bold text-lg py-6 px-8 transition-all duration-300 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-xl hover:shadow-2xl",
        secondary: "bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-secondary-foreground shadow-lg hover:shadow-xl",
        category: "bg-secondary/20 backdrop-blur-sm border border-white/20 hover:bg-secondary/30 text-white shadow-lg hover:shadow-xl",
        "category-active": "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-xl border-2 border-white/30",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl",
        price: "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg hover:shadow-xl",
        floating: "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-2xl hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface SmartMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof smartMenuButtonVariants> {}

const SmartMenuButton = ({ className, variant, ...props }: SmartMenuButtonProps) => {
  return (
    <Button
      className={smartMenuButtonVariants({ variant, className })}
      {...props}
    />
  );
};

export default SmartMenuButton;