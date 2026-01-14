import './Input.css'
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';


export default function Input(props: any) {
    const { placeHolder, addMessage } = props;
    const [text, setText] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(false);

    useEffect(() => {
        setDisableSubmit(text.length === 0);
    }, [text]);

    const handleSubmit = () => {
        if (!disableSubmit) {
            addMessage(text, 0);
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="input-container">
            <input 
                className="input-field" 
                placeholder={placeHolder} 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button 
                type="submit" 
                className={`input-button ${disableSubmit ? 'disabled' : ''}`} 
                disabled={disableSubmit} 
                onClick={handleSubmit} 
            >
                <ArrowUp color="black"/>
            </button>
        </div>
    );
}