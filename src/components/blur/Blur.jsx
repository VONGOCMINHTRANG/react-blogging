const Blur = ({onClick = () => {}}) => {
    return (
        <div
            className="fixed inset-0 bg-slate-600 bg-opacity-70 z-20 lg:hidden lg:z-auto transition-opacity duration-300"
            onClick={onClick}
        >
        </div>
    )
}

export default Blur;