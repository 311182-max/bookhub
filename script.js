const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", searchBook);

async function searchBook() {

    const keyword = searchInput.value.trim();

    if (keyword === "") {
        alert("請輸入書名！");
        return;
    }

    result.innerHTML = "<h2>搜尋結果</h2><p>搜尋中...</p>";

    try {

        const url =
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}`;

        const response = await fetch(url);

        const data = await response.json();

        if (!data.items) {
            result.innerHTML =
                "<h2>搜尋結果</h2><p>找不到相關書籍。</p>";
            return;
        }

        const book = data.items[0];

        const info = book.volumeInfo;

        result.innerHTML = `
            <h2>搜尋結果</h2>

            <img src="${info.imageLinks?.thumbnail || ""}" alt="封面">

            <h3>${info.title}</h3>

            <p><b>作者：</b>${info.authors?.join(", ") || "未知"}</p>

            <p><b>出版社：</b>${info.publisher || "未知"}</p>

            <p><b>出版日期：</b>${info.publishedDate || "未知"}</p>

            <p><b>簡介：</b>${info.description || "沒有資料"}</p>
        `;

    } catch (error) {

        result.innerHTML =
            "<h2>搜尋結果</h2><p>發生錯誤。</p>";

        console.error(error);

    }

}
