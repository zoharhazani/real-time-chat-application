import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineAttachFile } from "react-icons/md";
export default function Input({sendMessage}){

    const [text,setText] = useState('');
    return(
        <div className='input'>
            <input type="text" placeholder='type something...' onChange={(e)=> setText(e.target.value)}/>
            <div className="send">
                <MdOutlineAttachFile title="Comimg soon"/>
                <input type="file" style={{display:"none"}} id="file"/>
                <lable htmlFor="file">
                    <CiImageOn title="Comimg soon"/>
                </lable>
                <button onClick={()=> {
                    sendMessage(text);
                    setText('');
                }}>Send</button>

            </div>
        </div>
    )
}