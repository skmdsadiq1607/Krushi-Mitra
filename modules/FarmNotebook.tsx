
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mic } from 'lucide-react';

// FIX: Cast window to any to access non-standard properties for browser compatibility.
// Browser compatibility check for SpeechRecognition
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const FarmNotebook: React.FC = () => {
    const { farmData, addNote } = useFarm();
    const { t, language } = useLocalization();
    const { speak } = useSpeech();
    useAutoSpeak('speakNotebookIntro');

    const [noteContent, setNoteContent] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [micPermissionError, setMicPermissionError] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!recognition) return;

        recognition.lang = {
            'en': 'en-US',
            'te': 'te-IN',
            'hi': 'hi-IN',
            'ur': 'ur-PK'
        }[language] || 'en-US';

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');
            setNoteContent(prev => prev + transcript + ' ');
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            if (event.error === 'not-allowed') {
                setMicPermissionError(true);
            }
            setIsListening(false);
        };

    }, [language]);

    const handleAddNote = () => {
        if (noteContent.trim()) {
            addNote(noteContent.trim());
            setNoteContent('');
        }
    };
    
    const toggleListen = () => {
        speak('speakNotebookMicBtn');
        setMicPermissionError(false);
        if (!recognition) {
            alert("Sorry, your browser doesn't support voice notes.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('notebookTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('notebookSubtitle')}</p>
            </header>

            <Card>
                <div className="relative">
                     <textarea
                        ref={textareaRef}
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder={t('notebookAddNotePlaceholder')}
                        className="w-full p-4 pr-16 bg-stone-50 border-2 border-stone-100 rounded-2xl h-32 resize-none focus:ring-4 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                        onFocus={() => speak('speakNotebookText')}
                    />
                    <button 
                        onClick={toggleListen}
                        className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                            isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500 text-white hover:bg-emerald-600'
                        }`}
                    >
                        <Mic size={20}/>
                    </button>
                </div>
                {isListening && <p className="text-sm text-center mt-2 text-red-500 font-bold">{t('notebookListening')}</p>}
                {micPermissionError && <p className="text-sm text-center mt-2 text-red-500 font-bold">{t('micPermissionDenied')}</p>}
                <Button onClick={handleAddNote} className="mt-4" onFocus={() => speak('speakNotebookAddBtn')}>{t('notebookAddNoteButton')}</Button>
            </Card>

            <div className="space-y-4">
                {farmData?.notes.map(note => (
                     <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                     >
                        <Card>
                            <p className="text-stone-600">{note.content}</p>
                            <p className="text-xs text-stone-400 font-bold mt-3 text-right">{note.date}</p>
                        </Card>
                     </motion.div>
                ))}
            </div>

        </div>
    );
};

export default FarmNotebook;
