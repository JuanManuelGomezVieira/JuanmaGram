export default function Button({children, className, ...props}) {
    return <button className={`
        mt-2 
        p-2 
        text-s
        text-button_color
        font-medium	
        rounded-md 
        border-0
        bg-button_bgcolor
        ${className || ''}`}
        {...props}
    >
        {children}
    </button>
}