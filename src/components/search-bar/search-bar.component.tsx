import { useRef } from "react";

interface SearchBarProps {
  inputProps?: object;
  loading?: boolean;
  onSubmit: (x: string) => void;
}

export function SearchBar({ inputProps, onSubmit, loading }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current && !loading) {
      onSubmit(inputRef.current.value);
    }
  };

  return (
    <form ref={(form) => (formRef.current = form)} className="w-full" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
          onClick={() => formRef.current?.requestSubmit()}
        >
          {loading ? (
            <img alt="loading" src="/icons/loading.svg" />
          ) : (
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        <input
          ref={inputRef}
          className="block w-full h-10 p-4 pl-10 text-sm border border-gray-400 rounded-2xl bg-transparent"
          id="default-search"
          type="search"
          onChange={(event) => (inputRef.current = event.target)}
          {...inputProps}
        />
      </div>
    </form>
  );
}
