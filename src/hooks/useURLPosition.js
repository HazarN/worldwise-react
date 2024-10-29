import { useSearchParams } from 'react-router-dom';

export function useURLPosition() {
  const [searchParams] = useSearchParams();

  return [searchParams.get('lat'), searchParams.get('lng')];
}
