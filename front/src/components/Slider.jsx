import PropTypes from "prop-types";

export default function Slider({
    label = "",
    id = "",
    value = "",
    min = 0,
    max = 100,
    onChange = () => {},
    required = false,
    className = "",
}) {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                id={id}
                type="range"
                value={value}
                min={min}
                max={max}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
        </div>
    );
}

Slider.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    className: PropTypes.string,
};
