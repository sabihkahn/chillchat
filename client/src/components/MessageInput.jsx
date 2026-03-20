import React, { useRef, useState } from 'react'
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import useKeyboardSound from '../hooks/useKeyboardSound';



const MessageInput = () => {

const {playRandomKeyStrokeSound} = useKeyboardSound()
const [text,settext] = useState("")
const [imagepreview,setimagepreview] = useState(null)

const fileinsputref = useRef(null)

  const { sendmesage, isSoundEnabled} = useChatStore()
  
 const handelMessage = (e)=>{
  e.preventDefault()
  if(isSoundEnabled) playRandomKeyStrokeSound()
   if (!text.trim() && !imagepreview) return
   //send message function 
   sendmesage({
     text,
     image: imagepreview
   })

  settext("")
  setimagepreview("")
  if(fileinsputref.current) fileinsputref.current.value = ""
 }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setimagepreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setimagepreview(null);
    if (fileinsputref.current) fileinsputref.current.value = "";
  };


  return (
    <div className="p-4 border-t border-slate-700/50">
      {imagepreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagepreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handelMessage} className="max-w-3xl mx-auto flex space-x-4">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            settext(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 text-amber-50 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileinsputref}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileinsputref.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${imagepreview ? "text-cyan-500" : ""
            }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagepreview}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

export default MessageInput