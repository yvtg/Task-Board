import type { SearchBarProps } from "../types/SearchBarProps";

export default function SearchBar({setQuery}: SearchBarProps){
    return (
        <input
            className="flex justify-baseline px-6"
            placeholder="Input task to search..."
            onChange={e => setQuery(e.target.value)}
        />
    );
}