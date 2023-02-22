import { useRef } from "react";

interface SearchBarProps {
  inputProps?: object;
  onSubmit: (x: string) => void;
}

export function SearchBar({ inputProps, onSubmit }: SearchBarProps) {
  const inputRef = useRef<string | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      onSubmit(inputRef.current);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 "
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
        </div>
        <input
          className="block w-full h-10 p-4 pl-10 text-sm  border border-gray-400 rounded-2xl bg-gray-[#ffffff10]"
          id="default-search"
          type="search"
          value={inputRef.current}
          onChange={(event) => (inputRef.current = event.target.value)}
          {...inputProps}
        />
      </div>
    </form>
  );
}
