const XForm = ({children,}: FormProps) => {

return (
    <div className="message-body field">
        <form action="" >
            {children}
        </form>
    </div>
)
}

export interface FormProps {

    children: React.ReactNode,
}
export default XForm;