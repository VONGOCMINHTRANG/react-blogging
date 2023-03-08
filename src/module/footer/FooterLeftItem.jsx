import { FooterLeftData } from "./FooterLeftData";

const FooterLeftItem = () => {
    return (
        <>
            {FooterLeftData.length > 0 && FooterLeftData.map((item) => (
                <div key={item.name} className="flex flex-wrap gap-2 items-center mb-7">
                    <div className="border-2 rounded-full bg-gray-400 p-1">
                        {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-600 md:text-sm">
                        {item.content}
                    </h3>
                </div>
            ))}
        </>
    )
}

export default FooterLeftItem;