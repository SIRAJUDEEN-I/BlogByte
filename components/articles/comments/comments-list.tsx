import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Calendar, MessageCircle } from 'lucide-react'

type CommentListProps = {
  comments: Array<{
    id: string;
    body: string;
    createdAt: Date;
    author: {
      name: string;
      email: string;
      imageUrl: string | null;
    };
  }>;
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  // Helper function to get user's first letter
  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Helper function to format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) { // Less than a week
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full">
            <MessageCircle className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              No comments yet
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Be the first to share your thoughts on this article
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card 
          key={comment.id} 
          className="border-zinc-200/60 dark:border-zinc-700/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm"
        >
          <div className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-zinc-200/50 dark:ring-zinc-700/50 flex-shrink-0">
                <AvatarImage src={comment.author.imageUrl || ''} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-400 font-semibold text-xs">
                  {getFirstLetter(comment.author.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                {/* Comment Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                    {comment.author.name}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>
                
                {/* Comment Body */}
                <div className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed">
                  {comment.body.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < comment.body.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;