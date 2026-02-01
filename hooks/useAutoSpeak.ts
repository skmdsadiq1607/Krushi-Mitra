
import { useEffect } from 'react';
import { useSpeech } from '../contexts/SpeechContext';

export const useAutoSpeak = (textKey: string, deps: any[] = []) => {
  const { speak } = useSpeech();

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(textKey);
    }, 500); // Small delay to let the UI settle

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textKey, ...deps]);
};
