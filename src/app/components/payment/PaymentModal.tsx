import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Calendar,
  DollarSign,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventDate: string;
  ticketPrice: number;
  ticketType: string;
  onSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  eventName,
  eventDate,
  ticketPrice,
  ticketType,
  onSuccess
}: PaymentModalProps) {
  const [step, setStep] = useState<'payment' | 'processing' | 'success' | 'error'>('payment');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (cardNumber.replace(/\s/g, '').length < 13) {
      toast.error('Please enter a valid card number');
      return;
    }
    if (!expiryDate.includes('/') || expiryDate.length < 5) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return;
    }
    if (cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }
    if (!cardName.trim()) {
      toast.error('Please enter the cardholder name');
      return;
    }

    setStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      // Simulate success (in production, this would be an API call)
      const success = Math.random() > 0.1; // 90% success rate for demo
      
      if (success) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
          resetForm();
        }, 2000);
      } else {
        setStep('error');
      }
    }, 2000);
  };

  const resetForm = () => {
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardName('');
    setSaveCard(false);
    setStep('payment');
  };

  const handleRetry = () => {
    setStep('payment');
  };

  const platformFee = ticketPrice * 0.05; // 5% platform fee
  const total = ticketPrice + platformFee;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl">Complete Your Purchase</DialogTitle>
                <DialogDescription>
                  Secure payment powered by Stripe
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Order Summary */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Order Summary</h3>
                  <Card className="p-4 bg-gradient-to-br from-[#EDE9FE] to-[#DBEAFE] border-0">
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-neutral-900">{eventName}</div>
                        <div className="text-sm text-neutral-600 flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {eventDate}
                        </div>
                      </div>
                      
                      <div className="border-t border-white/50 pt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-700">{ticketType}</span>
                          <span className="font-semibold">${ticketPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-700">Platform fee (5%)</span>
                          <span>${platformFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-white/50 pt-2 flex justify-between">
                          <span className="font-semibold text-neutral-900">Total</span>
                          <span className="font-bold text-lg text-[#7C3AED]">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-600 bg-white/50 p-3 rounded-lg">
                        <Shield className="w-4 h-4 text-[#10B981]" />
                        <span>Protected by buyer guarantee</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="h-12 pl-10"
                        required
                      />
                      <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <div className="relative">
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={handleCvvChange}
                          className="h-12 pl-10"
                          required
                        />
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded border-neutral-300"
                    />
                    <Label htmlFor="saveCard" className="text-sm font-normal cursor-pointer">
                      Save card for future purchases
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] h-12 text-base"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Pay ${total.toFixed(2)}
                  </Button>

                  <p className="text-xs text-center text-neutral-600">
                    Your payment information is encrypted and secure
                  </p>
                </form>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#EDE9FE] mb-6">
                <Loader2 className="w-10 h-10 text-[#7C3AED] animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Processing Payment...
              </h3>
              <p className="text-neutral-600">
                Please don't close this window
              </p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Payment Successful! 🎉
              </h3>
              <p className="text-neutral-600 mb-4">
                You're all set for {eventName}
              </p>
              <Badge className="bg-[#D1FAE5] text-[#059669] border-0">
                Confirmation sent to your email
              </Badge>
            </motion.div>
          )}

          {step === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FEE2E2] mb-6">
                <AlertCircle className="w-10 h-10 text-[#EF4444]" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Payment Failed
              </h3>
              <p className="text-neutral-600 mb-6">
                We couldn't process your payment. Please try again.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6]"
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
