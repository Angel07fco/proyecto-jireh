import { useState } from "react";

function Faq({question, reply}) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="my-4">
            <div className={`flex justify-between items-center py-2  cursor-pointer ${isOpen ? '' : 'border-b border-primaryBlue'}`} onClick={toggleAccordion}>
                <h2 className="font-semibold text-primaryBlue mr-2">{question}</h2>
                <svg className={`w-4 h-4 transform text-primaryBlue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div className={`transition-all duration-300 border-b border-primaryBlue ${isOpen ? 'block' : 'hidden'} px-4 text-primaryBlue`}>
                <p>{reply}</p>
            </div>
        </div>
    )
}

export default Faq