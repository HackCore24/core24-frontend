import React from "react";

export interface ITextFieldProps
  extends React.ComponentPropsWithoutRef<"input"> {
  message?: string;
}
