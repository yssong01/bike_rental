// api/bike.js

export default async function handler(req, res) {
  // 서울시 공공데이터 인증키 (프론트에 이미 노출돼 있으니 일단 그대로 사용)
  const API_KEY = "4a69654859736a6f3737424a556a48";

  // 쿼리 파라미터에서 start, end 받기 (없으면 기본값)
  const { start = "1", end = "1000" } = req.query;

  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/${start}/${end}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Seoul API error: " + response.status);
    }

    const data = await response.json();

    // GitHub Pages 같은 다른 도메인에서도 호출할 수 있게 CORS 허용
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}
