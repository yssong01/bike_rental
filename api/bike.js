// api/bike.js

export default async function handler(req, res) {
  // 서울시 공공데이터 인증키
  const API_KEY = "4a69654859736a6f3737424a556a48";

  // 쿼리에서 start, end 가져오기 (기본값 1~1000)
  const { start = "1", end = "1000" } = req.query;

  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/${start}/${end}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Seoul API error: " + response.status);
    }

    const data = await response.json();

    // GitHub Pages 등 다른 도메인에서도 접근할 수 있도록 CORS 허용
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}
