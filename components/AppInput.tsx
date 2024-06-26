import { extendVariants, Input } from "@nextui-org/react";

const AppInput = extendVariants(Input, {
  defaultVariants: {
    size: "sm",
    color: "primary",
    variant: "flat",
  },
});

export default AppInput;
