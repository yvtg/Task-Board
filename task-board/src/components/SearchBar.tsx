
export default function SearchBar({setQuery}){
    return (
        <input
            className="flex justify-baseline px-6"
            placeholder="Input task to search..."
            onChange={e => setQuery(e.target.value)}
        />
    );
}