export default function Input({ type = "text", placeholder = "", label = "", value = "", onChange = () => { } }) {

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
            />
        </div>
    )
}