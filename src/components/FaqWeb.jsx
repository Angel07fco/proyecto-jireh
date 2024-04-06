import { useState } from 'react';

function FaqWeb({question, reply}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContent = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="flex items-center focus:outline-none"
                onClick={toggleContent}
            >
                {isOpen ? (
                    <svg
                        className="flex-shrink-0 w-6 h-6 text-secondaryBlue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                        />
                    </svg>
                ) : (
                    <svg
                        className="flex-shrink-0 w-6 h-6 text-secondaryBlue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 20V4"
                        />
                    </svg>
                )}
                <h1 className="mx-4 text-xl text-secondaryBlue">
                    {question}
                </h1>
            </button>

            {isOpen && (
                <div className="flex mt-8 md:mx-10">
                    <span className="border border-secondaryBlue" />
                    <p className="max-w-3xl px-4 text-gray-500">
                        {reply}
                    </p>
                </div>
            )}
        </div>
    );
}

export default FaqWeb;

