import React from "react"

interface RemoveButtonProps {
    text: string,
    handleRemove: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({ text, handleRemove }) => {
    return (
        <div className="field is-inline-block">
            <div className="control has-text-right">
                <button onClick={handleRemove} className="button submit is-danger is-small">
                    {text}
                </button>
            </div>
        </div>
    );
}