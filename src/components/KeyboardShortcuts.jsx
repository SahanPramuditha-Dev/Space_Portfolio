import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts = [
    { key: '?', description: 'Show/hide keyboard shortcuts' },
    { key: 'G H', description: 'Go to Home' },
    { key: 'G A', description: 'Go to About' },
    { key: 'G P', description: 'Go to Projects' },
    { key: 'G C', description: 'Go to Contact' },
    { key: 'ESC', description: 'Close modals/dialogs' },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Press '?' to toggle help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target;
        // Don't trigger if typing in input/textarea
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowHelp(!showHelp);
        }
      }

      // Press 'G' then another key for navigation (vim-style)
      if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          setIsOpen(true);
          setTimeout(() => setIsOpen(false), 2000);
        }
      }

      if (isOpen) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          switch (e.key.toLowerCase()) {
            case 'h':
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
              break;
            case 'a':
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
              break;
            case 'p':
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
              break;
            case 'c':
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
              break;
            default:
              setIsOpen(false);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, showHelp]);

  return (
    <>
      {/* Keyboard hint indicator */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-secondary/90 backdrop-blur-md border border-accent/20 rounded-lg px-4 py-2 z-50 shadow-xl"
          >
            <p className="text-text font-mono text-sm">
              Press <kbd className="px-2 py-1 bg-primary rounded border border-accent/30">H</kbd> for Home,{' '}
              <kbd className="px-2 py-1 bg-primary rounded border border-accent/30">A</kbd> for About,{' '}
              <kbd className="px-2 py-1 bg-primary rounded border border-accent/30">P</kbd> for Projects,{' '}
              <kbd className="px-2 py-1 bg-primary rounded border border-accent/30">C</kbd> for Contact
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts help modal */}
      <AnimatePresence>
        {showHelp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary border border-secondary rounded-xl p-6 max-w-md w-full mx-4 z-[101] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Keyboard size={24} className="text-accent" />
                  <h2 className="text-2xl font-bold text-text">Keyboard Shortcuts</h2>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-secondary/50 last:border-0">
                    <span className="text-text-muted">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.key.split(' ').map((key, i) => (
                        <kbd
                          key={i}
                          className="px-2 py-1 bg-secondary rounded border border-accent/30 text-accent font-mono text-sm"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-4 text-center font-mono">
                Press <kbd className="px-1 py-0.5 bg-secondary rounded border border-accent/30">?</kbd> to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
