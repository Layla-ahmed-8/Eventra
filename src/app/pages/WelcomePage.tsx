import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Trophy,
  TrendingUp,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WelcomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after a few seconds
    const timer = setTimeout(() => {
      if (user?.role === 'attendee') {
        navigate('/discover');
      } else if (user?.role === 'organizer') {
        navigate('/organizer');
      } else if (user?.role === 'admin') {
        navigate('/admin');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleContinue = () => {
    if (user?.role === 'attendee') {
      navigate('/discover');
    } else if (user?.role === 'organizer') {
      navigate('/organizer');
    } else if (user?.role === 'admin') {
      navigate('/admin');
    }
  };

  if (!user) return null;

  const roleConfig = {
    attendee: {
      title: 'Welcome to Eventra! 🎉',
      subtitle: "You're all set to discover amazing events",
      icon: Sparkles,
      iconBg: 'from-[#6C3BFF] to-[#9B7BFF]',
      features: [
        { icon: Calendar, text: 'AI-powered event recommendations' },
        { icon: Users, text: 'Join vibrant communities' },
        { icon: Trophy, text: 'Earn badges and rewards' },
      ],
      cta: 'Start Discovering'
    },
    organizer: {
      title: 'Welcome, Event Organizer!',
      subtitle: "Let's create your first amazing event",
      icon: BarChart3,
      iconBg: 'from-[#FF7A1A] to-[#FF943F]',
      features: [
        { icon: TrendingUp, text: 'Real-time analytics dashboard' },
        { icon: Users, text: 'Attendee management tools' },
        { icon: Sparkles, text: 'AI-powered insights' },
      ],
      cta: 'Go to Dashboard'
    },
    admin: {
      title: 'Welcome, Admin!',
      subtitle: 'Platform overview at your fingertips',
      icon: Shield,
      iconBg: 'from-[#1F6BFF] to-[#4C8DFF]',
      features: [
        { icon: Users, text: 'User management' },
        { icon: BarChart3, text: 'Platform analytics' },
        { icon: Shield, text: 'Moderation tools' },
      ],
      cta: 'Access Admin Panel'
    }
  };

  const config = roleConfig[user.role];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1ECFF] via-white to-[#FFF4ED] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-12 text-center shadow-2xl">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className={`inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${config.iconBg} shadow-2xl`}>
              <Icon className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-[#111111] mb-3">
              {config.title}
            </h1>
            <p className="text-xl text-[#777777] mb-8">
              {config.subtitle}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 mb-10"
          >
            {config.features.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={idx} className="flex items-center gap-4 justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1ECFF]">
                    <FeatureIcon className="h-5 w-5 text-[#6C3BFF]" />
                  </div>
                  <span className="text-[#444444] text-lg">{feature.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              onClick={handleContinue}
              className={`bg-gradient-to-r ${config.iconBg} hover:opacity-90 shadow-xl h-14 px-10`}
            >
              {config.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-[#777777] mt-4">
              Redirecting automatically in a few seconds...
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}