document.getElementById("lookForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const color = document.getElementById("outfitColor").value;
    const style = document.getElementById("makeupStyle").value;

    if (color && style) {
        const query = ` ${style}  ${color} makeup`; // Combine color and style for search
        const apiKey = 'AIzaSyCPU9DGLGSaTBmY-g9QYQBjbN1hogwWuCs';
        const cx = '74e5d2e97958548b0';

        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${apiKey}&cx=${cx}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const imagesContainer = document.getElementById("suggestedLooks");
            imagesContainer.innerHTML = ""; // Clear previous results

            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const imgElement = document.createElement("img");
                    imgElement.src = item.link;
                    imgElement.alt = `${style} makeup look`;
                    imagesContainer.appendChild(imgElement);
                });
            } else {
                imagesContainer.innerHTML = "<p>No results found. Please try different keywords.</p>";
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            document.getElementById("suggestedLooks").innerHTML = "<p>Something went wrong. Please try again later.</p>";
        }
    } else {
        alert("Please select both outfit color and makeup style!");
    }
});