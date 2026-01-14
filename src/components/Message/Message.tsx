import './Message.css'
import ReactMarkdown from 'react-markdown';


export default function Message (props: any){
   const { message } = props;

    if (!message?.text) return null;

    return (
        <div className={`flex w-full ${message.source === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className={`message ${message.source === 0 ? 'bg-[#303030] text-gray-200' : ''}`}>
                
                {message.source === 1 ? (
                    <div className="message-load">
                        <ReactMarkdown>{String(message.text)}</ReactMarkdown>
                    </div>
                ) : (
                    <ReactMarkdown>{String(message.text)}</ReactMarkdown>
                )}
                
            </div>
        </div>
    );
}

