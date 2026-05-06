import { useParams } from 'react-router';
import { EventraMainLayout } from '../components/layouts/EventraMainLayout';

import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Users, MessageSquare, ThumbsUp, Send, Compass, Calendar, Trophy, UserCircle, Wallet } from 'lucide-react';
import { mockCommunities, mockPosts } from '../../data/mockData';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CommunityDetailPage() {
  const { id } = useParams();
  const [newPost, setNewPost] = useState('');
  const community = mockCommunities.find((c) => c.id === id);
  const posts = mockPosts.filter((p) => p.communityId === id);

  const navItems = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Events', href: '/my-events', icon: Calendar },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Communities', href: '/communities', icon: Users },
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
  ];

  if (!community) {
    return <div>Community not found</div>;
  }

  const handlePost = () => {
    if (newPost.trim()) {
      toast.success('Post created successfully');
      setNewPost('');
    }
  };

  return (
    <EventraMainLayout>

      {/* Cover */}
      <div className="relative h-48">
        <img 
          src={community.coverImage}
          alt={community.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-24 md:pb-6">
        {/* Community Info */}
        <Card className="p-6 mb-6 relative">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="mb-2">{community.name}</h1>
              <p className="text-[#777777] mb-4">{community.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-[#777777]">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {community.memberCount.toLocaleString()} members
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {community.postCount} posts
                </div>
              </div>
            </div>

            <Button className="bg-[#6C3BFF] hover:bg-[#7D52FF]">
              Join Community
            </Button>
          </div>
        </Card>

        {/* Create Post */}
        <Card className="p-4 mb-6">
          <Textarea 
            placeholder="Share your thoughts with the community..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={3}
            className="mb-3"
          />
          <div className="flex justify-end">
            <Button onClick={handlePost} className="bg-[#6C3BFF]">
              <Send className="mr-2 h-4 w-4" />
              Post
            </Button>
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-[#F1ECFF] text-[#6C3BFF]">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-[#111111]">{post.author.name}</p>
                    <span className="text-sm text-[#777777]">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-[#444444] mb-4">{post.content}</p>

                  {post.poll && (
                    <div className="mb-4 p-4 bg-[#F7F7F7] rounded-lg">
                      <p className="font-medium text-[#111111] mb-3">{post.poll.question}</p>
                      <div className="space-y-2">
                        {post.poll.options.map((option) => (
                          <button
                            key={option.id}
                            className="w-full text-left p-3 rounded-lg border hover:border-[#6C3BFF] transition-colors"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{option.text}</span>
                              <span className="text-sm font-medium text-[#6C3BFF]">
                                {((option.votes / post.poll!.totalVotes) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-2 bg-[#F1ECFF] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#6C3BFF]"
                                style={{ width: `${(option.votes / post.poll!.totalVotes) * 100}%` }}
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-[#777777] mt-2">
                        {post.poll.totalVotes} votes
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      {post.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {post.commentCount}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </EventraMainLayout>
  );
}
