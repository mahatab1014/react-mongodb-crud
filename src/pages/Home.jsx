import TopicList from "../components/TopicList";
import useTopics from "../hooks/useTopics";

const Home = () => {
  const { topicsData, topicsRefetch } = useTopics();

  return (
    <section className="space-y-2">
      <TopicList topicsData={topicsData} topicsRefetch={topicsRefetch} />
    </section>
  );
};

export default Home;
