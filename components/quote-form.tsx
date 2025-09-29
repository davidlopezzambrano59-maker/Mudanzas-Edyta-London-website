"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Phone, User, MapPin, MessageSquare, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuoteCalculator } from "./quote-calculator";
import { calculateQuote, type QuoteInputs, type VanSize } from "@/lib/pricing";
import { generateWhatsAppURL, type QuoteFormData } from "@/lib/whatsapp";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  pickupAddress: z.string().optional(),
  dropoffAddress: z.string().optional(),
  notes: z.string().optional(),
});

type QuoteFormSchema = z.infer<typeof quoteFormSchema>;

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteInputs, setQuoteInputs] = useState<QuoteInputs>({
    vanSize: "medium" as VanSize,
    loaders: 1,
    hours: 2,
    miles: 5,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<QuoteFormSchema>({
    resolver: zodResolver(quoteFormSchema),
  });

  const formData = watch();

  const onSubmit = async (data: QuoteFormSchema) => {
    setIsSubmitting(true);
    
    try {
      const breakdown = calculateQuote(quoteInputs);
      
      // WhatsApp submission
      const whatsappUrl = generateWhatsAppURL(quoteInputs, breakdown, data);
      window.open(whatsappUrl, "_blank");
      
      // TODO: Email submission if configured
      // if (process.env.NEXT_PUBLIC_RESEND_ENABLED === "true") {
      //   await fetch("/api/quote", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ ...data, quoteInputs, breakdown }),
      //   });
      // }
      
    } catch (error) {
      console.error("Error submitting quote:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Calculator Component */}
      <QuoteCalculator showTitle={false} />
      
      {/* Contact Form */}
      <Card className="bg-white shadow-xl border-0">
        <CardHeader className="bg-brand-gradient text-white rounded-t-2xl">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Send className="h-6 w-6" />
            Get Your Detailed Quote
          </CardTitle>
          <p className="text-lg opacity-90">
            Complete your details below and we'll send you a personalized quote
          </p>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-brand-primary" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="h-12 text-lg"
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="phone" className="text-lg font-semibold flex items-center gap-2">
                  <Phone className="h-5 w-5 text-brand-primary" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="07456 507 570"
                  className="h-12 text-lg"
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="pickup" className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-primary" />
                  Pickup Address
                </Label>
                <Input
                  id="pickup"
                  {...register("pickupAddress")}
                  placeholder="Where are we collecting from?"
                  className="h-12 text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Include postcode for accurate pricing
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="dropoff" className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-primary" />
                  Drop-off Address
                </Label>
                <Input
                  id="dropoff"
                  {...register("dropoffAddress")}
                  placeholder="Where are we delivering to?"
                  className="h-12 text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Include postcode for accurate pricing
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="notes" className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-brand-primary" />
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Any special requirements? Stairs, heavy items, parking restrictions, fragile items, assembly needs..."
                className="min-h-[120px] text-lg"
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Help us prepare: stairs, heavy items, parking, assembly needs, etc.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  disabled={isSubmitting}
                  className="text-lg font-bold h-14"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Phone className="mr-2 h-5 w-5" />
                      Send via WhatsApp
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={true} // Will enable when email API is configured
                  className="text-lg font-bold h-14"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Quote (Coming Soon)
                </Button>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  By submitting this form, you agree to be contacted via WhatsApp or email with your quote.
                  We'll respond within 30 minutes during business hours.
                </p>
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
      
      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-6 pt-8"
      >
        <div className="text-center bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold text-lg mb-2">Instant Response</h3>
          <p className="text-sm text-gray-600">Get your quote within 30 minutes during business hours</p>
        </div>
        
        <div className="text-center bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="font-bold text-lg mb-2">Fully Insured</h3>
          <p className="text-sm text-gray-600">Comprehensive insurance coverage for your peace of mind</p>
        </div>
        
        <div className="text-center bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="text-3xl mb-2">⭐</div>
          <h3 className="font-bold text-lg mb-2">10+ Years Experience</h3>
          <p className="text-sm text-gray-600">Trusted by thousands of satisfied customers in London</p>
        </div>
      </motion.div>
    </div>
  );
}










