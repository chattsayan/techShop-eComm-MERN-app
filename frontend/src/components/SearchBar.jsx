import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="flex items-center border border-gray-700 py-2 px-3 rounded-l-full rounded-r-full"
      >
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <button type="submit">
          <CiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
