import { useQuery } from "@tanstack/react-query";

const useTopic = (id) => {
  const {
    isLoading: topicLoading,
    error,
    data: topicData,
    refetch: topicRefetch,
  } = useQuery({
    queryKey: ["topicsData", "id"],
    queryFn: async () => {
      const response = await fetch(
        `https://server-eta-black.vercel.app/api/topics/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }

      return response.json();
    },
  });

  return { topicLoading, error, topicData, topicRefetch };
};

export default useTopic;
