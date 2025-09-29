"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function WhatsAppFloat() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/447456507570?text=Hi! I\'d like to know more about your removals services.', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-xs"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Mudanzas Edyta</div>
                  <div className="text-xs text-green-500">Online now</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                👋 Hi there! Need help with your move? Get an instant quote or ask us anything!
              </p>
            </div>
            
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
            >
              Start Chat
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
      </motion.button>
    </div>
  );
}










