export const Rating = (name, container) => {
    const rating = container[name] || 0;
    const percentage = (rating / 5) * 100;

    return (
        <li key={name} className="pr-16 flex items-center">
            <p className="text-[17px] w-full">{name}</p>
            <div className="bg-[#dddddd] flex items-center overflow-hidden w-2/5 h-1 rounded-sm mr-2">
                <span
                    className="text-[#222] bg-black block h-1"
                    style={{ width: `${percentage}%` }}
                ></span>
            </div>
            <p className="w-1/6 text-[13px] font-semibold mr-2">{rating}</p>
        </li>
    );
};
