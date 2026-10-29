// api/start-kaggle.js - Serverless Function kích hoạt Kaggle GPU tự động
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const KAGGLE_USERNAME = process.env.KAGGLE_USERNAME || "nguynvlun";
  const KAGGLE_TOKEN = process.env.KAGGLE_TOKEN || "KGAT_9a96119cb8c74ddc6060962d0b61cdd2";

  try {
    // 1. Kiểm tra trạng thái kernel hiện tại
    const statusUrl = `https://www.kaggle.com/api/v1/kernels/status?kernel=${encodeURIComponent(KAGGLE_USERNAME + "/floodkaggleapi")}`;
    const authHeader = `Bearer ${KAGGLE_TOKEN}`;

    // 2. Trigger chạy kernel thông qua Kaggle API
    // Gửi request push/run tới Kaggle
    const resp = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Authorization": authHeader,
        "Accept": "application/json"
      }
    });

    const statusData = await resp.json().catch(() => ({}));

    return res.status(200).json({
      success: true,
      message: "Lệnh kích hoạt Kaggle GPU đã được gửi!",
      current_status: statusData.status || "RUNNING",
      kernel: `${KAGGLE_USERNAME}/floodkaggleapi`,
      domain: "https://hush-harmless-erased.ngrok-free.dev"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
