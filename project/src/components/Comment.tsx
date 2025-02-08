import React, { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface CommentProps {
  id: number;
  content: string;
  author: string;
  votes: number;
  createdAt: string;
  onReply: (parentId: number) => void;
}

export default function Comment({ id, content, author, votes, createdAt, onReply }: CommentProps) {
  const [voteCount, setVoteCount] = useState(votes);
  const { isAuthenticated } = useAuth();

  const handleVote = async (type: 'up' | 'down') => {
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/comments/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ vote_type: type === 'up' ? 1 : -1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to vote');
      }

      setVoteCount(prev => type === 'up' ? prev + 1 : prev - 1);
    } catch (error) {
      toast.error('Failed to vote');
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-2">
        <span className="font-medium">{author}</span>
        <span className="text-gray-500 text-sm">{createdAt}</span>
      </div>
      <p className="text-gray-800 mb-3">{content}</p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <button onClick={() => handleVote('up')} className="hover:text-orange-500">
            <ArrowBigUp className="w-5 h-5" />
          </button>
          <span className="font-medium">{voteCount}</span>
          <button onClick={() => handleVote('down')} className="hover:text-blue-500">
            <ArrowBigDown className="w-5 h-5" />
          </button>
        </div>
        <button 
          onClick={() => onReply(id)}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
}