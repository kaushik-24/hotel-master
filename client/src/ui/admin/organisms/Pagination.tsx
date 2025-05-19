import { IPagination } from "@interface/global.interface";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";

interface PaginationProps {
    totalPages: IPagination;
    setTotalPages: React.Dispatch<React.SetStateAction<IPagination>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const options = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
];
const Pagination: React.FC<PaginationProps> = ({ totalPages, setTotalPages, setRefresh, rowsPerPage, setRowsPerPage, }) => {

    const handlePrevious = () => {
        if (totalPages.currentPage > 1) {
            setTotalPages((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
            }));
            setRefresh((prev) => !prev);
        }
    };

    const handleNext = () => {
        if (totalPages.currentPage < totalPages.totalPages) {
            setTotalPages((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
            }));
            setRefresh((prev) => !prev);
        }
    };

    const handleFirst = () => {
        setTotalPages((prev) => ({
            ...prev,
            currentPage: 1,
        }));
        setRefresh((prev) => !prev);
    };

    const handleLast = () => {
        setTotalPages((prev) => ({
            ...prev,
            currentPage: totalPages.totalPages,
        }));
        setRefresh((prev) => !prev);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setRefresh((prev) => !prev);
    };

    const handlePages = (pageNumber: number) => {
        setTotalPages({ ...totalPages, currentPage: pageNumber });
        setRefresh((prevRefresh) => !prevRefresh);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const siblingCount = 1;
        const totalPageCount = totalPages.totalPages;
        const currentPage = totalPages.currentPage;

        const startPage = Math.max(1, currentPage - siblingCount);
        const endPage = Math.min(totalPageCount, currentPage + siblingCount);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-1 ${i === currentPage ? 'font-bold' : ''}`}
                    onClick={() => handlePages(i)}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(<span key="start" className="px-1">...</span>);
            pageNumbers.unshift(
                <button
                    key={1}
                    className={`px-1 ${1 === currentPage ? 'font-bold' : ''}`}
                    onClick={() => handlePages(1)}
                >
                    1
                </button>
            );
        }

        if (endPage < totalPageCount) {
            pageNumbers.push(<span key="end" className="px-1">...</span>);

            pageNumbers.push(
                <button
                    key={totalPageCount}
                    className={`px-1 ${totalPageCount === currentPage ? 'font-bold' : ''}`}
                    onClick={() => handlePages(totalPageCount)}
                >
                    {totalPageCount}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-between items-center px-2 py-2">
            {/* Rows per page select option */}
            <div className="flex items-center">
                <label htmlFor="rowsPerPage" className=" pr-1 focus:outline-none">Rows per page</label>
                <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="border rounded px-2 py-1"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col justify-center items-center">
                <div className="space-x-2 flex">
                    <button
                        onClick={handleFirst}
                        className={`border-2 border-black px-2 ${totalPages.currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                    >
                        <MdOutlineFirstPage />
                    </button>
                    <button
                        onClick={handlePrevious}
                        className={`border-2 border-black px-2 ${totalPages.currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                    >
                        -
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={handleNext}
                        className={`border-2 border-black px-2 ${totalPages.currentPage === totalPages.totalPages ? 'cursor-not-allowed' : ''}`}
                    >
                        +
                    </button>
                    <button
                        onClick={handleLast}
                        className={`border-2 border-black px-2 ${totalPages.currentPage === totalPages.totalPages ? 'cursor-not-allowed' : ''}`}
                    >
                        <MdOutlineLastPage />
                    </button>
                </div>
                <div>
                    <span>{`Page ${totalPages.currentPage} of ${totalPages.totalPages}`}</span>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
