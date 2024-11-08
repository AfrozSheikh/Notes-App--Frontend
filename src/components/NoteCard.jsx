import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const NoteCard = ({ note ,onEdit,deleteNode }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 max-w-sm transition-transform transform hover:scale-105">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex space-x-2">
          <button 
          onClick={()=>onEdit(note)}
          className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
            <FaEdit />
          </button>
          <button 
          onClick={()=>{
            deleteNode(note._id)
          }}
          className="p-2 text-red-500 hover:text-red-700 transition-colors">
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{note.description}</p>
    </div>
  );
};
