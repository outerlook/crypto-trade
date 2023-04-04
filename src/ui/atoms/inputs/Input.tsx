import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
};
export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div className={'flex items-center relative'}>
      <input
        ref={ref}
        className={`w-full h-10 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
      {props.icon && <div className={'absolute left-2'}>{props.icon}</div>}
      {props.prefix && <div className={'absolute left-2'}>{props.prefix}</div>}
      {props.suffix && <div className={'absolute right-2'}>{props.suffix}</div>}
    </div>
  );
});
