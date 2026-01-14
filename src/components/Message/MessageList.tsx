
interface MessageType{
  text: string;
  source: number;
}
import Message from "./Message";
import './MessageList.css'
import { DotWave } from 'ldrs/react';
import 'ldrs/react/DotWave.css'
import {useEffect, useRef} from 'react'


export default function MessageList(props: any) {
    const { messages, awaitingResponse } = props;
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        if(awaitingResponse){
        const timeoutId = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timeoutId);
        }
    }, [messages, awaitingResponse]);

    return (
        <div 
            className="message-container" 
            ref={scrollContainerRef}
            style={{ overflowY: 'auto', height: '100%' }}
        >
            <div className="message-list">
                {messages.map((message: MessageType, index: number) => (
                    <Message key={index} message={message} />
                ))}

                {awaitingResponse && (
                    <div className="flex justify-start w-full">
                        <div className="message message-load">
                             <DotWave size="35" speed="1" color="white" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}