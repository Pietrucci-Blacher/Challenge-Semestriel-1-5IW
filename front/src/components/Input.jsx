export default function Input({ type = "text", placeholder = "", label = "", name = "", value = "", onChange = () => { }, required = false}) {

    const handleChange = (e) => {
        onChange(e.target.value)
    }


    return (
        <div>
            <label>{label}:</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
            />
        </div>
    )
}