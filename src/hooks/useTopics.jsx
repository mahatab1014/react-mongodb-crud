import { useQuery } from "@tanstack/react-query";

const useTopics = () => {
  const {
    isPending,
    error,
    data: topicsData,
    refetch: topicsRefetch,
  } = useQuery({
    queryKey: ["topicsData"],
    queryFn: async () => {
      const response = await fetch(
        "https://server-eta-black.vercel.app/api/topics"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }

      return response.json();
    },
  });

  return { isPending, error, topicsData, topicsRefetch };
};

export default useTopics;
