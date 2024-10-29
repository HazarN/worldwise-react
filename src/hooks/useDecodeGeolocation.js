import { useEffect } from 'react';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function useDecodeGeolocation(positionArray, dispatch) {
  const [lat, lng] = positionArray;

  useEffect(() => {
    if (!lat && !lng) return;

    async function decodeGeolocation() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(
          `${
            import.meta.env.VITE_GEOCODING_URL
          }?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        dispatch({
          type: 'geocoding',
          payload: {
            cityName: data.city || data.locality || '',
            country: data.countryName,
            emoji: convertToEmoji(data.countryCode),
          },
        });
      } catch (err) {
        dispatch({ type: 'error', payload: err });
      }
    }

    decodeGeolocation();
  }, [lat, lng, dispatch]);
}
