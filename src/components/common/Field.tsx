import React, { type ReactElement } from "react";
import type { FieldError } from "react-hook-form";

type FieldProps = {
  label?: ReactNode;
  children: ReactElement;
  htmlFor: string;
  error?: FieldError;
};

export const Field = ({ label, children, htmlFor, error }: FieldProps) => {
  const id = htmlFor || getChildId(children);
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && <div className="text-red-500">{error.message}</div>}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};
