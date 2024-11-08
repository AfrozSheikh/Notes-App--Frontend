import React, { useEffect, useState } from 'react';

export const Modal = ({ setModalOpen, addNote ,currentNote ,editNote}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentNote){
            editNote(currentNote._id,title,description)
        }
       else  addNote(title, description);  // use addNote directly
    };

    useEffect(()=>{
        if(currentNote){
            setTitle(currentNote.title);
            setDescription(currentNote.description)
        }
    },[currentNote])

    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentNote ? "Edit Note" : "Add New Note"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Note Description"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                         {currentNote ? "update Note " :  "Add Note"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
