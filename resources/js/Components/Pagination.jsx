const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-5">
            <div className="flex items-center gap-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`text-sm ${
                        currentPage === 1 ? "text-gray-400" : "text-blue-600"
                    }`}
                >
                    Sebelumnya
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 rounded ${
                            page === currentPage
                                ? "bg-blue-700 text-white font-semibold"
                                : "text-blue-600 hover:bg-gray-200"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === lastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`text-sm ${
                        currentPage === lastPage
                            ? "text-gray-400"
                            : "text-blue-600"
                    }`}
                >
                    Selanjutnya
                </button>
            </div>
        </div>
    );
};

export default Pagination;
