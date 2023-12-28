import { useEffect, useState } from "react";
import useTopic from "../hooks/useTopic";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { topicData, topicLoading } = useTopic(id);

  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();

  useEffect(() => {
    // Set the state after the data has loaded
    if (!topicLoading && topicData) {
      setNewTitle(topicData.title);
      setNewDescription(topicData.description);
    }
  }, [topicData, topicLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://server-eta-black.vercel.app/api/topics/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newTitle, newDescription }),
        }
      );

      if (res.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to update topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
      <input
        className="outline-none w-full border px-5 py-2 focus:border-blue-500"
        type="text"
        name="title"
        placeholder="Topic Title"
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
      />
      <textarea
        className="outline-none w-full border px-5 py-2 focus:border-blue-500"
        name="description"
        placeholder="Topic Description"
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
      ></textarea>
      <button
        type="submit"
        className="bg-green-600 px-5 py-2 text-white active:scale-95 transition-all"
      >
        Update Topic
      </button>
    </form>
  );
}
