export default function Button({
    text = "Button-text", 
    color = "blue", 
    textColor = "white" 
}) {
    return (
        <button 
            className={`px-5 py-2 rounded-md font-medium btn-hover break-keep max-w-[300px] flex justify-center`} 
            style={{color:textColor, background: color}}>
                {text}
        </button>
    )
}