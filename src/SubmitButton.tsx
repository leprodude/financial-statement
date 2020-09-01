import React from "react"

interface SubmitButtonProps {
    text: string
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
    return (
        <div className="field is-inline-block">
            <div className="control">
                <button className="button submit is-dark is-small">
                    {text}
                </button>
            </div>
        </div>
    );
}