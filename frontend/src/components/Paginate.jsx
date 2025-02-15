import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  //   if (pages <= 1) return null; // Hide pagination if only one page exists

  return (
    pages > 1 && (
      <nav className="flex justify-center mt-6">
        <ul className="flex items-center">
          {[...Array(pages).keys()].map((x) => {
            const pageNumber = x + 1;
            const linkTo = !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${pageNumber}`
                : `/page/${pageNumber}`
              : `/admin/productlist/${pageNumber}`;

            return (
              <li key={pageNumber} className="rounded-l-md">
                <Link
                  to={linkTo}
                  className={`px-4 py-2 border text-sm font-medium transition-all 
                    ${
                      pageNumber === page
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
};

export default Paginate;
