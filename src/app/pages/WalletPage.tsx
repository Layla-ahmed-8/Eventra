import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Logo } from '../components/brand/Logo';
import {
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  Menu,
  X,
  Home,
  Ticket,
  Users,
  Trophy,
  User,
  LogOut,
  Settings,
  Calendar,
  Gift,
  RefreshCw,
  Check,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/designSystem';
import { mockWalletData, mockPaymentMethods } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function WalletPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(mockPaymentMethods[0].id);

  const menuItems = [
    { icon: Home, label: 'Discover', href: '/discover' },
    { icon: Ticket, label: 'My Events', href: '/my-events' },
    { icon: Users, label: 'Communities', href: '/communities' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const quickAmounts = [50, 100, 200, 500];

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (amount && amount > 0) {
      toast.success(`Added ${mockWalletData.currency} ${amount} to your wallet!`);
      setTopUpModalOpen(false);
      setTopUpAmount('');
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup':
        return ArrowDownLeft;
      case 'payment':
        return ArrowUpRight;
      case 'refund':
        return RefreshCw;
      case 'reward':
        return Gift;
      default:
        return Wallet;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'topup':
        return 'from-[#10B981] to-[#34D399]';
      case 'payment':
        return 'from-[#F97316] to-[#FB923C]';
      case 'refund':
        return 'from-[#2563EB] to-[#3B82F6]';
      case 'reward':
        return 'from-[#7C3AED] to-[#8B5CF6]';
      default:
        return 'from-neutral-400 to-neutral-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <Menu className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
          </button>

          <Logo size="sm" />

          <button className="p-2 -mr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors relative">
            <Bell className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <Logo size="md" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white font-semibold text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{user?.name || 'User'}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.email}</p>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors mb-1"
                    >
                      <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-red-600 dark:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top-Up Modal */}
      <AnimatePresence>
        {topUpModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTopUpModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
            >
              <Card className="p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Top Up Wallet</h2>
                  <button
                    onClick={() => setTopUpModalOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <Label className="mb-3 block font-semibold">Amount ({mockWalletData.currency})</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="h-14 text-2xl font-bold text-center rounded-2xl border-2"
                  />
                </div>

                <div className="mb-6">
                  <Label className="mb-3 block font-semibold">Quick Amounts</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setTopUpAmount(amount.toString())}
                        className="rounded-xl border-2"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="mb-3 block font-semibold">Payment Method</Label>
                  <div className="space-y-2">
                    {mockPaymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={cn(
                          "w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3",
                          selectedPaymentMethod === method.id
                            ? "border-[#10B981] bg-[#D1FAE5] dark:bg-[#10B981]/10"
                            : "border-neutral-200 dark:border-neutral-700"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                          method.brand === 'Visa' ? 'from-[#2563EB] to-[#3B82F6]' : 'from-[#F97316] to-[#FB923C]'
                        )}>
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleTopUp}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-lg shadow-[#10B981]/25 text-lg font-semibold"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add {topUpAmount || '0'} {mockWalletData.currency}
                </Button>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-20">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#10B981] via-[#34D399] to-[#6EE7B7] px-4 pt-6 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="h-5 w-5 text-white/90" />
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
              Active
            </Badge>
          </div>

          <h1 className="text-lg text-white/90 mb-2">Available Balance</h1>
          <div className="flex items-end gap-2 mb-6">
            <span className="text-5xl font-bold text-white">
              {mockWalletData.balance.toFixed(2)}
            </span>
            <span className="text-2xl font-semibold text-white/90 mb-2">
              {mockWalletData.currency}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setTopUpModalOpen(true)}
              className="flex-1 h-12 rounded-2xl bg-white text-[#10B981] hover:bg-neutral-50 font-semibold shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Top Up
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-2xl border-2 border-white text-white hover:bg-white/10 font-semibold"
            >
              <ArrowUpRight className="h-5 w-5 mr-2" />
              Send
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-5 rounded-2xl bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] dark:from-[#2563EB]/10 dark:to-[#3B82F6]/10 border-0">
              <TrendingDown className="h-8 w-8 text-[#2563EB] mb-3" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {mockWalletData.currency} {Math.abs(mockWalletData.transactions
                  .filter(t => t.type === 'payment')
                  .reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
              </p>
            </Card>
            <Card className="p-5 rounded-2xl bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] dark:from-[#10B981]/10 dark:to-[#34D399]/10 border-0">
              <TrendingUp className="h-8 w-8 text-[#10B981] mb-3" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Added</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {mockWalletData.currency} {mockWalletData.transactions
                  .filter(t => t.type === 'topup' || t.type === 'reward')
                  .reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Payment Methods</h2>
              <Button variant="ghost" size="sm" className="text-[#10B981]">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Button>
            </div>

            <div className="space-y-3">
              {mockPaymentMethods.map((method) => (
                <Card key={method.id} className="p-4 rounded-2xl border-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                      method.brand === 'Visa' ? 'from-[#2563EB] to-[#3B82F6]' : 'from-[#F97316] to-[#FB923C]'
                    )}>
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {method.brand} •••• {method.last4}
                        </p>
                        {method.isDefault && (
                          <Badge className="bg-[#10B981] text-white border-0 text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {method.holderName}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-neutral-400" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">Transaction History</h2>
            
            <div className="space-y-3">
              {mockWalletData.transactions.map((transaction, index) => {
                const Icon = getTransactionIcon(transaction.type);
                const isNegative = transaction.amount < 0;
                
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="p-4 rounded-2xl hover:shadow-lg transition-all">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                          getTransactionColor(transaction.type)
                        )}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                            {transaction.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <span>{formatDate(transaction.date)}</span>
                            {transaction.paymentMethod && (
                              <>
                                <span>•</span>
                                <span>{transaction.paymentMethod}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={cn(
                            "font-bold text-lg",
                            isNegative ? "text-[#F97316]" : "text-[#10B981]"
                          )}>
                            {isNegative ? '' : '+'}{transaction.amount.toFixed(2)}
                          </p>
                          <Badge className={cn(
                            "text-xs",
                            transaction.status === 'completed' 
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-0"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-0"
                          )}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-2 py-2 z-30">
        <div className="flex items-center justify-around">
          <Link to="/discover" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
          </Link>
          <Link to="/my-events" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <Ticket className="h-5 w-5" />
            <span className="text-xs font-medium">Events</span>
          </Link>
          <Link to="/communities" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Community</span>
          </Link>
          <Link to="/wallet" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-[#D1FAE5] dark:bg-[#10B981]/20 text-[#10B981]">
            <Wallet className="h-5 w-5" />
            <span className="text-xs font-medium">Wallet</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
