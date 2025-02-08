import React from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Award, BookmarkPlus } from 'lucide-react';

interface PostProps {
  title: string;
  author: string;
  content: string;
  votes: number;
  comments: number;
  timeAgo: string;
  subreddit: string;
}

export default function Post({ title, author, content, votes, comments, timeAgo, subreddit }: PostProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-4">
      <div className="flex">
        {/* Voting Section */}
        <div className="w-10 bg-gray-50 rounded-l-lg flex flex-col items-center py-2 select-none">
          <button className="hover:text-orange-500 transition-colors">
            <ArrowBigUp className="w-6 h-6" />
          </button>
          <span className="font-bold text-sm my-1">{votes}</span>
          <button className="hover:text-blue-500 transition-colors">
            <ArrowBigDown className="w-6 h-6" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-3 flex-grow">
          {/* Post Header */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="font-bold text-black">r/{subreddit}</span>
            <span className="mx-1">•</span>
            <span>Posted by u/{author}</span>
            <span className="mx-1">•</span>
            <span>{timeAgo}</span>
          </div>

          {/* Post Title */}
          <h2 className="text-lg font-medium mb-2">{title}</h2>

          {/* Post Content */}
          <p className="text-gray-800 mb-3">{content}</p>

          {/* Post Actions */}
          <div className="flex items-center space-x-4 text-gray-500">
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md px-2 py-1">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs">{comments} Comments</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md px-2 py-1">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">Share</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md px-2 py-1">
              <BookmarkPlus className="w-4 h-4" />
              <span className="text-xs">Save</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md px-2 py-1">
              <Award className="w-4 h-4" />
              <span className="text-xs">Award</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}