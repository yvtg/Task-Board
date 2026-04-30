
interface FilterBarProps {
  setStatusFilter: (status: string) => void;
}

export default function FilterBar({setStatusFilter}: FilterBarProps ){
    return(
        <select className="flex justify-baseline p-6"
            onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In-progess</option>
            <option value="done">Done</option>
        </select>
    );
}