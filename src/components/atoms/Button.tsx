
const Button = (props: {
    children: React.ReactNode,
    onClick: () => void,
    className?: string,
    disabled?: boolean,
}) => {
    return(
        <button
            onClick={props.onClick}
            className={props.className}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;