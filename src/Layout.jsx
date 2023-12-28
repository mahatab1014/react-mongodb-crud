import { Link, Outlet } from "react-router-dom";

const layout = () => {
  return (
    <>
      <nav className="flex justify-between items-center bg-slate-800 px-8 py-4">
        <Link className="text-2xl text-white font-bold" href="/">
          Topics
        </Link>
        <Link
          to="/create"
          className="bg-white text-black px-3 py-2 font-medium"
        >
          Add Topic
        </Link>
      </nav>
      <main className="max-w-3xl mx-auto mt-2">
        <Outlet />
      </main>
    </>
  );
};

export default layout;
