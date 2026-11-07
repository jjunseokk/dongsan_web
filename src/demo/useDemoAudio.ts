import { useEffect, useState } from 'react';

const SAMPLE_AUDIO = '/assets/demo-audio.wav';

// Static hosting does not honor byte-range requests for the sample WAV.
// A local Blob URL gives the media element a seekable, fully loaded source.
export function useDemoAudio(source?: string) {
  const [sampleUrl, setSampleUrl] = useState<string>();

  useEffect(() => {
    if (source !== SAMPLE_AUDIO) return;
    setSampleUrl(undefined);
    const controller = new AbortController();
    let localUrl: string | undefined;
    fetch(SAMPLE_AUDIO, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('샘플 음원을 불러오지 못했습니다.');
        return response.blob();
      })
      .then(blob => {
        if (controller.signal.aborted) return;
        localUrl = URL.createObjectURL(blob);
        setSampleUrl(localUrl);
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          window.dispatchEvent(new CustomEvent('demo-error', { detail: error.message }));
        }
      });
    return () => {
      controller.abort();
      if (localUrl) URL.revokeObjectURL(localUrl);
    };
  }, [source]);

  return source === SAMPLE_AUDIO ? sampleUrl : source;
}
