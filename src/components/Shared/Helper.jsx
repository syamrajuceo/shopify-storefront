const highlightSearchQuery = (title, searchQuery) => {
    if (!searchQuery) return title;

    const regex = new RegExp(`(${searchQuery})`, "gi"); // Create a case-insensitive regex
    const parts = title?.trim().split(regex); // Split the title into matching and non-matching parts
    return parts?.map((part, index) => 
        regex.test(part) ? (
            <span key={index} className="text-blue-500">
                {part}
            </span>
        ) : (
            part
        )
    );
};
export default highlightSearchQuery