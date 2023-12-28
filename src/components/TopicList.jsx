import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
const TopicList = ({ topicsData, topicsRefetch }) => {
  // const { topics } = topicsData;

  const handleDelete = (id) => {
    fetch(`https://nextjs-mongodb-crud-topaz.vercel.app/api/topics/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => topicsRefetch());
  };

  return (
    <>
      {topicsData?.topics?.map((topic) => (
        <div
          key={topic._id}
          className="flex items-start justify-between p-4 shadow-lg border border-gray-300 rounded-lg"
        >
          <div>
            <div>
              <h2 className="font-bold text-xl">{topic?.title}</h2>
            </div>
            <div>{topic?.description}</div>
          </div>

          <div className="flex gap-4 [&>*]:text-2xl">
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(topic?._id)}
            >
              <HiOutlineTrash />
            </span>
            <Link className="cursor-pointer" to={`/edit/${topic?._id}`}>
              <HiPencilAlt />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicList;
