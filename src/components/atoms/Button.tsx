
const Button = (props: {
    children: React.ReactNode,
    onClick: () => void,
}) => {
    return(
        <button
            onClick={props.onClick}

        >
            {props.children}
        </button>
    )
}

export default Button;