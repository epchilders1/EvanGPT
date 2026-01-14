import { useState, useEffect } from 'react'
import './App.css'
import { Rabbit, Trash } from 'lucide-react'
import Input from './components/Input/Input'
import MessageList from './components/Message/MessageList'
import toast, {Toaster} from 'react-hot-toast'
import Evan from './assets/evan.jpg'

interface Message{
  text: string;
  source: number;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptActive, setPromptActive] = useState(false);

  function addMessage (text:string, source:number){
    setPromptActive(true)
      const newMessage: Message = {
        text: text,
        source: source
      }
      setMessages([...messages, newMessage]);
  }

  useEffect(() => {
    const getMessageFromOpenAI = async () => {
      if (messages.length > 0 && messages[messages.length - 1].source === 0) {
        const response = await generateText(messages);
        if (response) {
          setMessages(prev => [...prev, { text: response, source: 1 }]);
        }
      }
    setPromptActive(false);
    };

    getMessageFromOpenAI();
  }, [messages]);

  async function generateText(messageList: Message[]){
    try{
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageList })
      });
      const data = await response.json()
      return data.message
    }
    catch(e:any){
      toast.error(`There was an error: ${e.message}`)
    }
  }

  useEffect(() => {
    console.log(messages);
  }),[messages]

  function clearChatMessages(){
    setMessages([]);
  }

  return (
    <>
    <Toaster/>
    <div className = "chat-background">
        <div className = "header">
          <div className="logo">
            <img src={Evan}/>
            <a href="https://www.linkedin.com/in/epchilders1/">EvanGPT</a>
          </div>
          <div>
            <button title="Clear Conversation History" onClick={clearChatMessages}>
              <Trash/>
            </button>
          </div>
        </div>
        <div className="content">
            <MessageList messages={messages} awaitingResponse={promptActive}/>
        </div>
         <div className="footer">
            <Input placeHolder="Ask anything" addMessage={addMessage}/>
          </div>
    </div>
    </>
  )
}

