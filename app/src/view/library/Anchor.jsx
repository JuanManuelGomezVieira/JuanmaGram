export default function Anchor ({ children, className, ...props}) {
    return <button className={`
        mt-2 
        text-s
        text-button_bgcolor
        font-normal	
        ${className || ''}`}
        {...props}
    >
        { children}
    </button>
}