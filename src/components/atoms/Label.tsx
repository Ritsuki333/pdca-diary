const Label = (props:{ children: React.ReactNode}) => {
    return (
        <label>
            {props.children}
        </label>
    )
}

export default Label;