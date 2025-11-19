// api/bike.js
export default async function handler(req, res) {
  // 1) Vercel 환경 변수에서 읽기
  const API_KEY = process.env.SEOUL_API_KEY;

  if (!API_KEY) {
    // 키가 설정 안 되어 있을 때 에러를 보기 쉽게
    console.error("!! SEOUL_API_KEY 환경 변수가 설정되어 있지 않습니다.");
    return res.status(500).json({ error: "SEOUL_API_KEY is not set" });
  }

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

      if (!data.rentBikeStatus || !data.rentBikeStatus.row) {
        console.log("데이터 없음 → 반복 종료");
        break;
      }

      const rows = data.rentBikeStatus.row;
      if (!rows || rows.length === 0) break;

      allRows = allRows.concat(rows);
      start += perPage;
      end += perPage;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ total: allRows.length, rows: allRows });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}
