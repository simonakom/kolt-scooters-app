export default function Button({
    text="Mygtukas", 
    color="red", 
    textColor ="white" 
}) {

    return (
        <button 
            className={`px-4 py-1 rounded-md bg-opacity-85 hover:bg-opacity-100 break-keep`} 
            style={{color:textColor, background: color}}>
                {text}
        </button>

    )

}