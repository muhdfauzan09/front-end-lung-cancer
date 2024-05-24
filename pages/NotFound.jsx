import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-center pt-56">
        <h1 className="text-red-500 font-bold text-7xl">
          404 - Page Not Found
        </h1>
        <p className="mt-6 font-semibold text-2xl">
          Sorry, the page you are looking for could not be found.
        </p>
        <div className="mt-10">
          <Link to={navigate(-1)}>
            <button
              type="button"
              className="bg-blue-800 p-3 rounded-lg text-white font-bold"
            >
              BACK TO HOME
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
