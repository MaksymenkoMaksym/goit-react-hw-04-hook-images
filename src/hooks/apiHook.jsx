import { useState } from 'react';

export const useIsExist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(true);
  const [isModal, setIsModal] = useState(false);

  return {
    isModal,
    setIsModal,
    isLoadMore,
    setLoadMore,
    isLoading,
    setIsLoading,
  };
};
