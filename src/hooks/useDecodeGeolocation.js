import { useEffect } from 'react';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function useDecodeGeolocation(
  positionArray,
  setCityName,
  setCountry,
  setIsLoadingDecoding,
  setEmoji
) {
  const [lat, lng] = positionArray;

  useEffect(() => {
    if (!lat && !lng) return;

    async function decodeGeolocation() {
      try {
        setIsLoadingDecoding(true);
        const res = await fetch(
          `${
            import.meta.env.VITE_GEOCODING_URL
          }?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        setCityName((city) => data.city || data.locality || '');
        setCountry((coutnry) => data.countryName);
        setEmoji((emoji) => convertToEmoji(data.countryCode));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingDecoding(false);
      }
    }

    decodeGeolocation();
  }, [lat, lng, setCityName, setCountry, setIsLoadingDecoding, setEmoji]);
}
