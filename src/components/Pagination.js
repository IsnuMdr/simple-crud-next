export const Pagination = ({ employeesPerPage, totalEmployees, paginate, paginateFront, paginateBack, currentPage }) => {
  const totalPages = Math.ceil(totalEmployees / employeesPerPage)
  const pageNeighbours = Math.max(0, Math.min(0, 2))
  const totalNumbers = pageNeighbours * 2 + 3
  const totalBlocks = totalNumbers + 2

  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";

  const pageNumbers = (from, to, step = 1) => {
    let i = from;
    const pageNumbers = [];
  
    while (i <= to) {
      pageNumbers.push(i);
      i += step;
    }
  
    return pageNumbers;
  }

  const fetchPageNumbers = () => {
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = pageNumbers(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = pageNumbers(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = pageNumbers(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }

    return pageNumbers(1, totalPages);
  }

  const pages = fetchPageNumbers()
  const handleMoveLeft = () => paginate(currentPage - (pageNeighbours * 2) - 1);
  const handleMoveRight = () => paginate(currentPage + (pageNeighbours * 2) + 1)

  return (
    <div className='mt-3 text-center'>
      <div>
        <p className='text-sm text-gray-700'>
          Showing
          <span className='font-medium'> {(currentPage * employeesPerPage) - (employeesPerPage - 1)} </span>
          to
          <span className='font-medium'> {(currentPage * employeesPerPage) > totalEmployees ? totalEmployees : currentPage * employeesPerPage} </span>
          of
          <span className='font-medium'> {totalEmployees} </span>
          results
        </p>
      </div>
      <div className="mt-1">
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
          aria-label='Pagination'
        >
          {
            (currentPage == 1) ? <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-200 text-sm font-medium text-gray-500">Previous</button> : 
            <a
              onClick={() => {
                paginateBack();
              }}
              href='#'
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-600 hover:text-white'
            >
              <span>Previous</span>
            </a>
          }
          <li className="list-none">
            { pages.map((page, i) => {
                if (page === LEFT_PAGE) return (
                    <a key={i} onClick={handleMoveLeft} className="bg-white text-gray-500 hover:bg-indigo-600 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                );

                if (page === RIGHT_PAGE) return (
                    <a key={i} onClick={handleMoveRight} className="bg-white text-gray-500 hover:bg-indigo-600 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                );

                return (
                  <a
                  onClick={() => {
                    paginate(page);
                  }}
                  key={i}
                  href='#'
                  className={
                    currentPage === page
                      ? "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      : "bg-white text-gray-500 hover:bg-indigo-600 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    }
                  >
                  {page}
                </a>
                )
              }
            )}
          </li>
          {
            (totalPages - currentPage == 0) ? <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-200 text-sm font-medium text-gray-500">Next</button> : 
            <a
              onClick={() => {
                paginateFront();
              }}
              href='#'
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-indigo-600 hover:text-white'
            >
              <span>Next</span>
            </a>
          }
        </nav>
      </div>
    </div>
  );
}