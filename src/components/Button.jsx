import * as PropTypes from "prop-types";

export default function Button({
    text = "Button-text", 
    color = "blue", 
    textColor = "white",
    onClick,
}) {
    return (
        <button 
            className={`px-5 py-2 rounded-md font-medium btn-hover break-keep max-w-[130px] flex justify-center overflow-hidden`} 
            style={{color:textColor, background: color}}
            onClick={onClick}
            >{text}
        </button>
    )
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	textColor: PropTypes.string,
	onClick: PropTypes.func,
};