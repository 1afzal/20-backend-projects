function FilterBar({onFilter}: {onFilter: (filter: string) => void}){
    return(
        <div className="flex gap-2">
            {["week", "month", "3months"].map((f)=>(
                <button key={f} onClick={()=>{onFilter(f)}}>
                    {f}
                </button>
            ))}
        </div>
    )
}
export default FilterBar;
