// api/bike.js
export default async function handler(req, res) {
  const API_KEY = "4a69654859736a6f3737424a556a48";

  // 기본 구간 (1~1000)
  const perPage = 1000;
  let start = 1;
  let end = perPage;

  let allRows = [];

  try {
    while (true) {
      const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/${start}/${end}/`;

      console.log("요청:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Seoul API error: " + response.status);
      }

      const data = await response.json();

      // 데이터 형식 체크
      if (!data.rentBikeStatus || !data.rentBikeStatus.row) {
        console.log("데이터 없음 → 반복 종료");
        break;
      }

      const rows = data.rentBikeStatus.row;

      if (!rows || rows.length === 0) {
        console.log("0개 응답 → 종료");
        break;
      }

      allRows = allRows.concat(rows);

      // 다음 구간으로 이동
      start += perPage;
      end += perPage;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      total: allRows.length,
      rows: allRows,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}
