import { ChangeEvent } from "react";

const TextInput = ({
  placeholder,
  name,
  onChange,
  ...props
}: {
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <input
        name={name}
        className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

export default TextInput;
