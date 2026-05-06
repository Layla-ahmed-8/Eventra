import { EventraMainLayout } from '../components/layouts/EventraMainLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, MapPin, Calendar, Edit2, Compass, Trophy, Users, UserCircle, Wallet } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');

  const navItems = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Events', href: '/my-events', icon: Calendar },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Communities', href: '/communities', icon: Users },
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
  ];

  const handleSave = () => {
    updateUser({ name, bio, location });
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <EventraMainLayout>

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-[#F1ECFF] text-[#6C3BFF] text-4xl">
                {user?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-[#6C3BFF]">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <h2>{user?.name}</h2>
                    {user?.verified && (
                      <CheckCircle className="h-5 w-5 text-[#1F6BFF]" />
                    )}
                  </div>
                  <p className="text-[#777777] mb-4">{user?.bio || 'No bio yet'}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[#777777] mb-4">
                    {user?.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(user?.joinedDate || '').toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-6 mb-4">
                    <div>
                      <span className="font-semibold text-[#111111]">{user?.followersCount}</span>
                      <span className="text-sm text-[#777777] ml-1">Followers</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#111111]">{user?.followingCount}</span>
                      <span className="text-sm text-[#777777] ml-1">Following</span>
                    </div>
                  </div>

                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-[#111111]">{user?.level}</p>
            <p className="text-sm text-[#777777]">Level</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-[#111111]">{user?.points}</p>
            <p className="text-sm text-[#777777]">Points</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-[#111111]">{user?.badges?.length || 0}</p>
            <p className="text-sm text-[#777777]">Badges</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-[#111111]">12</p>
            <p className="text-sm text-[#777777]">Events</p>
          </Card>
        </div>

        {/* Interests */}
        {user?.interests && user.interests.length > 0 && (
          <Card className="p-6">
            <h3 className="mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="capitalize">
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </div>

    </EventraMainLayout>
  );
}
