"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Truck, Users, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateQuote,
  formatCurrency,
  getVanSizeDisplay,
  type VanSize,
  type QuoteInputs,
  type QuoteBreakdown,
  MIN_HOURS,
} from "@/lib/pricing";
import { generateWhatsAppURL } from "@/lib/whatsapp";

interface QuoteCalculatorProps {
  showTitle?: boolean;
  className?: string;
}

export function QuoteCalculator({ showTitle = true, className = "" }: QuoteCalculatorProps) {
  const [inputs, setInputs] = useState<QuoteInputs>({
    vanSize: "medium" as VanSize,
    loaders: 1,
    hours: MIN_HOURS,
    miles: 5,
  });
  
  const [breakdown, setBreakdown] = useState<QuoteBreakdown>();
  const [isCalculating, setIsCalculating] = useState(false);

  // Real-time calculation
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const result = calculateQuote(inputs);
      setBreakdown(result);
      setIsCalculating(false);
    }, 100); // Small delay for smooth animation

    return () => clearTimeout(timer);
  }, [inputs]);

  const updateInput = (field: keyof QuoteInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppClick = () => {
    if (!breakdown) return;
    const url = generateWhatsAppURL(inputs, breakdown);
    window.open(url, "_blank");
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto bg-white shadow-2xl border-0 ${className}`}>
      {showTitle && (
        <CardHeader className="text-center bg-brand-gradient text-white rounded-t-2xl">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
            <Calculator className="h-8 w-8" />
            Instant Quote Calculator
          </CardTitle>
          <p className="text-lg opacity-90 mt-2">
            Get your moving quote in seconds • 2-hour minimum • No hidden fees
          </p>
        </CardHeader>
      )}
      
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <Label htmlFor="van-size" className="text-lg font-semibold flex items-center gap-2">
                <Truck className="h-5 w-5 text-brand-primary" />
                Van Size
              </Label>
              <Select 
                value={inputs.vanSize} 
                onValueChange={(value: VanSize) => updateInput("vanSize", value)}
              >
                <SelectTrigger id="van-size" className="h-14 text-lg">
                  <SelectValue placeholder="Select van size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    <div>
                      <div className="font-semibold">Small Van</div>
                      <div className="text-sm text-muted-foreground">Perfect for 1-bedroom moves • £40/hour</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div>
                      <div className="font-semibold">Medium Van</div>
                      <div className="text-sm text-muted-foreground">Great for 2-bedroom moves • £45/hour</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="large">
                    <div>
                      <div className="font-semibold">Luton Van (17.3m³)</div>
                      <div className="text-sm text-muted-foreground">Best for 3+ bedrooms • £50/hour</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <Label htmlFor="loaders" className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-primary" />
                Number of Loaders
              </Label>
              <Select 
                value={inputs.loaders.toString()} 
                onValueChange={(value) => updateInput("loaders", parseInt(value))}
              >
                <SelectTrigger id="loaders" className="h-14 text-lg">
                  <SelectValue placeholder="Select number of loaders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No additional loaders (Driver only)</SelectItem>
                  <SelectItem value="1">1 loader (+£25/hour)</SelectItem>
                  <SelectItem value="2">2 loaders (+£50/hour)</SelectItem>
                  <SelectItem value="3">3 loaders (+£75/hour)</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <Label htmlFor="hours" className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-primary" />
                Estimated Hours
              </Label>
              <div className="relative">
                <Input
                  id="hours"
                  type="number"
                  min={1}
                  max={12}
                  value={inputs.hours}
                  onChange={(e) => updateInput("hours", Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-14 text-lg pr-20"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  hours
                </div>
              </div>
              {inputs.hours < MIN_HOURS && (
                <p className="text-sm text-brand-primary font-medium">
                  ⚠️ 2-hour minimum will be applied
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <Label htmlFor="miles" className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-primary" />
                Distance (Miles)
              </Label>
              <div className="relative">
                <Input
                  id="miles"
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  value={inputs.miles}
                  onChange={(e) => updateInput("miles", Math.max(0, parseFloat(e.target.value) || 0))}
                  className="h-14 text-lg pr-20"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  miles
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {inputs.miles <= 10 ? "✅ Free travel (within 10 miles)" : "🚗 Travel charge applies"}
              </p>
            </motion.div>
          </div>

          {/* Quote Breakdown Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-brand-yellow/10 to-brand-primary/10 rounded-2xl p-6 border-2 border-brand-primary/20"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-brand-primary" />
                Quote Breakdown
              </h3>
              
              {isCalculating ? (
                <div className="space-y-3 animate-pulse-brand">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ) : breakdown ? (
                <div className="space-y-4" aria-live="polite" aria-label="Quote breakdown">
                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Van ({getVanSizeDisplay(inputs.vanSize)}):</span>
                      <span className="font-semibold">{formatCurrency(breakdown.vanBaseHourly)}/hour</span>
                    </div>
                    
                    {breakdown.loadersHourly > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Loaders ({inputs.loaders} × £25):</span>
                        <span className="font-semibold">{formatCurrency(breakdown.loadersHourly)}/hour</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-gray-700">Hourly Rate:</span>
                      <span className="font-bold text-xl text-brand-primary">{formatCurrency(breakdown.baseHourly)}/hour</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        Labour ({breakdown.billableHours}h {breakdown.billableHours === MIN_HOURS && breakdown.requestedHours < MIN_HOURS ? "minimum" : ""}):
                      </span>
                      <span className="font-semibold">{formatCurrency(breakdown.baseHourly * breakdown.billableHours)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        Distance ({breakdown.miles} miles):
                      </span>
                      <span className="font-semibold">
                        {breakdown.distanceCharge === 0 ? "FREE" : formatCurrency(breakdown.distanceCharge)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-brand-primary pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-800">Total:</span>
                      <motion.span 
                        key={breakdown.total}
                        initial={{ scale: 1.1, color: "#FF8A00" }}
                        animate={{ scale: 1, color: "#000000" }}
                        className="text-3xl font-bold text-brand-primary"
                      >
                        {formatCurrency(breakdown.total)}
                      </motion.span>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <Button
                      onClick={handleWhatsAppClick}
                      variant="whatsapp"
                      size="lg"
                      className="w-full text-xl font-bold group"
                    >
                      Book via WhatsApp
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </div>
              ) : null}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-xl p-4 border"
            >
              <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Professional, DBS-checked team</li>
                <li>✅ All equipment & protection materials</li>
                <li>✅ Fully insured service</li>
                <li>✅ No hidden fees or surprises</li>
                <li>✅ Same-day availability</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}










