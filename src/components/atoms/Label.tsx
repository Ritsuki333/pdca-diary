const Label = (props:{ 
    children: React.ReactNode,
    className?: string 
}) => {
    return (
        <label
            className={props.className}
        >
            {props.children}
        </label>
    )
}

export default Label;