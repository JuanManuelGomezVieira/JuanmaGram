export default function Form ({children, ...props}) {
    return <form className="flex flex-col w-80 gap-1" {...props}>
        {children}
    </form>
}