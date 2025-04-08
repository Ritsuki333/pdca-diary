
const Input = (props: { 
    type: string,
    placeholder?: string,
    value?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    
 }) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className={props.className}

        />
    )

}

export default Input;