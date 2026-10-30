// ============================================================================
// AI URBAN FLOOD & TRAFFIC MONITOR - FRONTEND CLIENT
// Author: Nguyen Van Luan (Luan2004) & SYNEXAN
// ============================================================================

// DOM Elements - Navigation & Settings
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const backendStatusBadge = document.getElementById("backendStatusBadge");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const noApiBanner = document.getElementById("noApiBanner");
const btnBannerConfig = document.getElementById("btnBannerConfig");

const btnOpenSettings = document.getElementById("btnOpenSettings");
const btnCloseSettings = document.getElementById("btnCloseSettings");
const settingsModal = document.getElementById("settingsModal");
const inputApiUrl = document.getElementById("inputApiUrl");
const btnPasteUrl = document.getElementById("btnPasteUrl");
const btnTestApi = document.getElementById("btnTestApi");
const btnSaveApi = document.getElementById("btnSaveApi");
const testConnectionBox = document.getElementById("testConnectionBox");

// DOM Elements - Kích hoạt Kaggle GPU Tự Động
const btnAutoStartKaggle = document.getElementById("btnAutoStartKaggle");
const btnAutoStartText = document.getElementById("btnAutoStartText");

// DOM Elements - Tab 1: Flood
const floodDropzone = document.getElementById("floodDropzone");
const floodFileInput = document.getElementById("floodFileInput");
const floodUploadPlaceholder = document.getElementById("floodUploadPlaceholder");
const floodPreviewContainer = document.getElementById("floodPreviewContainer");
const floodPreviewImg = document.getElementById("floodPreviewImg");
const btnRemoveFloodImg = document.getElementById("btnRemoveFloodImg");
const btnAnalyzeFlood = document.getElementById("btnAnalyzeFlood");
const btnSampleFlood = document.getElementById("btnSampleFlood");

const floodEmptyState = document.getElementById("floodEmptyState");
const floodLoadingState = document.getElementById("floodLoadingState");
const floodResultState = document.getElementById("floodResultState");
const floodResultImg = document.getElementById("floodResultImg");
const floodComputeTime = document.getElementById("floodComputeTime");

const resFloodDepth = document.getElementById("resFloodDepth");
const resFloodMethod = document.getElementById("resFloodMethod");
const resFloodAlertBadge = document.getElementById("resFloodAlertBadge");
const resFloodAlertDesc = document.getElementById("resFloodAlertDesc");
const resFloodCoverage = document.getElementById("resFloodCoverage");
const resFloodAdviceText = document.getElementById("resFloodAdviceText");

// DOM Elements - Tab 2: Traffic
const trafficDropzone = document.getElementById("trafficDropzone");
const trafficFileInput = document.getElementById("trafficFileInput");
const trafficUploadPlaceholder = document.getElementById("trafficUploadPlaceholder");
const trafficPreviewContainer = document.getElementById("trafficPreviewContainer");
const trafficPreviewImg = document.getElementById("trafficPreviewImg");
const btnRemoveTrafficImg = document.getElementById("btnRemoveTrafficImg");
const btnAnalyzeTraffic = document.getElementById("btnAnalyzeTraffic");
const btnSampleTraffic = document.getElementById("btnSampleTraffic");

const trafficEmptyState = document.getElementById("trafficEmptyState");
const trafficLoadingState = document.getElementById("trafficLoadingState");
const trafficResultState = document.getElementById("trafficResultState");
const trafficResultImg = document.getElementById("trafficResultImg");
const trafficComputeTime = document.getElementById("trafficComputeTime");

const cntMotorbike = document.getElementById("cntMotorbike");
const cntCar = document.getElementById("cntCar");
const cntTruck = document.getElementById("cntTruck");
const cntBus = document.getElementById("cntBus");
const resLosTitle = document.getElementById("resLosTitle");
const resLosDesc = document.getElementById("resLosDesc");
const resLosBadge = document.getElementById("resLosBadge");
const resPcuScore = document.getElementById("resPcuScore");
const resTotalVehicles = document.getElementById("resTotalVehicles");

// DOM Elements - Tab 4: CCTV
const camerasGrid = document.getElementById("camerasGrid");
const btnRefreshCameras = document.getElementById("btnRefreshCameras");

// ============================================================================
// CẤU HÌNH ĐƯỜNG LINK NGROK BACKEND CỐ ĐỊNH (NGROK STATIC DOMAIN)
// ============================================================================
const FIXED_NGROK_URL = "https://hush-harmless-erased.ngrok-free.dev";

// State
let selectedFloodFile = null;
let selectedTrafficFile = null;

// Tự động dọn dẹp các URL ngrok cũ hoặc không hợp lệ từng lưu trong localStorage
let savedUrl = localStorage.getItem("FLOOD_API_URL");
if (!savedUrl || (savedUrl.includes("ngrok") && savedUrl !== FIXED_NGROK_URL)) {
  savedUrl = FIXED_NGROK_URL;
  localStorage.setItem("FLOOD_API_URL", FIXED_NGROK_URL);
}

// Lấy URL cố định làm mặc định
let currentApiUrl = savedUrl || FIXED_NGROK_URL;

// Sample Image base64 or public URLs
const SAMPLE_FLOOD_URL = "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80";
const SAMPLE_TRAFFIC_URL = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80";

// Default Can Tho Cameras fallback
const DEFAULT_CAMERAS = [
  {
    id: "cam-tran-viet-chau",
    name: "Camera Trần Việt Châu",
    address: "Hẻm 38, Đ. Trần Việt Châu, Cần Thơ",
    status: "online",
    url: "rtsp://admin:Mekongpathfinder2026@tvc14738.smartddns.tv:554/cam/realmonitor?channel=1&subtype=1"
  },
  {
    id: "cam-vo-van-kiet",
    name: "Camera Võ Văn Kiệt",
    address: "Hẻm 9 Đ. Phạm Ngọc Hưng, Cần Thơ",
    status: "online",
    url: "rtsp://admin:Mekong2026@mekongpathfinder1pnh.smartddns.tv:554/cam/realmonitor?channel=1&subtype=0"
  },
  {
    id: "cam-nga-tu-3/2-thn",
    name: "Camera Ngã Tư 3/2 - Trần Hoàng Na",
    address: "86 Đ. 3 Tháng 2, An Bình, Tân An, Cần Thơ",
    status: "online",
    url: "rtsp://admin:Mekong2026@mekongpathfinder02thn.smartddns.tv:41003/cam/realmonitor?channel=1&subtype=0"
  },
  {
    id: "cam-tran-hoang-na",
    name: "Camera Trần Hoàng Na",
    address: "Công Ty TAMWIN, Số 54 Đ. A3, KDC 91B, Cần Thơ",
    status: "online",
    url: "rtsp://admin:Mekong2026@mekongpathfinder01thn.smartddns.tv:554/cam/realmonitor?channel=1&subtype=0"
  },
  {
    id: "cam-hem-51",
    name: "Camera Hẻm 51",
    address: "Hẻm 51, Cần Thơ",
    status: "online",
    url: "https://www.youtube.com/watch?v=ABmq2HnzaWk"
  },
  {
    id: "cam-nguyen-de",
    name: "Camera Nguyễn Đệ",
    address: "Đường Nguyễn Đệ, Cần Thơ",
    status: "online",
    url: "https://www.youtube.com/watch?v=srJJVT9j-mI"
  }
];

// ============================================================================
// 1. INITIALIZATION & TABS MANAGEMENT
// ============================================================================
function initApp() {
  inputApiUrl.value = currentApiUrl;
  
  if (!currentApiUrl) {
    setBackendStatus("offline", "Chưa kết nối API");
  } else {
    hideNoApiBanner();
    checkBackendHealth();
  }

  setupEventListeners();
  renderCameras(DEFAULT_CAMERAS);
}

function setupEventListeners() {
  // Cho phép click vào badge trạng thái hoặc ấn Ctrl+Shift+K để mở modal cấu hình nếu cần
  if (backendStatusBadge) {
    backendStatusBadge.style.cursor = "pointer";
    backendStatusBadge.title = "Click hoặc bấm Ctrl+Shift+K để xem cấu hình API Backend";
    backendStatusBadge.addEventListener("click", openSettings);
  }
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === "K" || e.key === "k")) {
      e.preventDefault();
      openSettings();
    }
  });
  if (btnAutoStartKaggle) {
    btnAutoStartKaggle.addEventListener("click", autoStartKaggle);
  }

  // Tabs switching
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.add("hidden"));
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.remove("hidden");
    });
  });

  // Settings Modal
  btnOpenSettings.addEventListener("click", openSettings);
  btnBannerConfig.addEventListener("click", openSettings);
  btnCloseSettings.addEventListener("click", closeSettings);
  settingsModal.addEventListener("click", (e) => {
    if (e.target === settingsModal) closeSettings();
  });

  btnPasteUrl.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) inputApiUrl.value = text.trim();
    } catch {
      inputApiUrl.focus();
    }
  });

  btnTestApi.addEventListener("click", testConnection);
  btnSaveApi.addEventListener("click", saveApiUrl);

  // Flood Event Handlers
  setupDropzone(
    floodDropzone,
    floodFileInput,
    floodUploadPlaceholder,
    floodPreviewContainer,
    floodPreviewImg,
    btnRemoveFloodImg,
    btnAnalyzeFlood,
    file => { selectedFloodFile = file; }
  );

  btnAnalyzeFlood.addEventListener("click", analyzeFlood);
  btnSampleFlood.addEventListener("click", loadSampleFlood);

  // Traffic Event Handlers
  setupDropzone(
    trafficDropzone,
    trafficFileInput,
    trafficUploadPlaceholder,
    trafficPreviewContainer,
    trafficPreviewImg,
    btnRemoveTrafficImg,
    btnAnalyzeTraffic,
    file => { selectedTrafficFile = file; }
  );

  btnAnalyzeTraffic.addEventListener("click", analyzeTraffic);
  btnSampleTraffic.addEventListener("click", loadSampleTraffic);

  // CCTV Refresh
  btnRefreshCameras.addEventListener("click", fetchLiveCameras);

  // Paste image globally
  window.addEventListener("paste", handleGlobalPaste);
}

// ============================================================================
// 2. BACKEND CONNECTION & HEALTH CHECK
// ============================================================================
async function checkBackendHealth() {
  if (!currentApiUrl) currentApiUrl = FIXED_NGROK_URL;
  setBackendStatus("checking", "Đang kết nối Kaggle GPU...");

  try {
    const start = performance.now();
    const res = await fetch(`${currentApiUrl}/`, {
      method: "GET",
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    const latency = Math.round(performance.now() - start);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "online") {
        const devName = data.device ? ` (${data.device})` : "";
        setBackendStatus("online", `🟢 Kaggle GPU Online${devName} [${latency}ms]`);
        hideNoApiBanner();
        fetchLiveCameras();
        return;
      }
    }
  } catch (err) {
    console.warn(`Lỗi kết nối tới ${currentApiUrl}:`, err);
  }

  // Nếu URL hiện tại thất bại mà khác FIXED_NGROK_URL, tự động fallback sang FIXED_NGROK_URL
  if (currentApiUrl !== FIXED_NGROK_URL) {
    try {
      const resFixed = await fetch(`${FIXED_NGROK_URL}/`, {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      if (resFixed.ok) {
        const data = await resFixed.json();
        if (data && data.status === "online") {
          currentApiUrl = FIXED_NGROK_URL;
          localStorage.setItem("FLOOD_API_URL", FIXED_NGROK_URL);
          if (inputApiUrl) inputApiUrl.value = FIXED_NGROK_URL;
          const devName = data.device ? ` (${data.device})` : "";
          setBackendStatus("online", `🟢 Kaggle GPU Online${devName}`);
          hideNoApiBanner();
          fetchLiveCameras();
          return;
        }
      }
    } catch (e2) {}
  }

  setBackendStatus("offline", "Kaggle Offline");
}

async function testConnection() {
  const url = cleanUrl(inputApiUrl.value);
  if (!url) {
    showTestResult(false, "Vui lòng nhập URL Ngrok!");
    return;
  }

  showTestResult(null, "Đang kết nối thử tới Backend...");

  try {
    const start = performance.now();
    const res = await fetch(`${url}/`, {
      method: "GET",
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    const latency = Math.round(performance.now() - start);

    if (res.ok) {
      const data = await res.json();
      showTestResult(true, `✅ Kết nối thành công! Thiết bị: ${data.device || "GPU"} | Phản hồi: ${latency}ms`);
    } else {
      showTestResult(false, `❌ Máy chủ phản hồi mã lỗi: ${res.status}`);
    }
  } catch (err) {
    showTestResult(false, `❌ Không thể kết nối tới Ngrok URL. Kiểm tra xem notebook Kaggle đã chạy chưa!`);
  }
}

function saveApiUrl() {
  const url = cleanUrl(inputApiUrl.value);
  if (!url) {
    alert("Vui lòng nhập URL Ngrok!");
    return;
  }
  currentApiUrl = url;
  localStorage.setItem("FLOOD_API_URL", currentApiUrl);
  closeSettings();
  checkBackendHealth();
}

function setBackendStatus(state, msg) {
  statusText.textContent = msg;
  statusDot.className = "w-2 h-2 rounded-full";

  if (state === "online") {
    statusDot.classList.add("bg-emerald-400", "shadow-[0_0_8px_#34d399]");
    backendStatusBadge.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300";
    if (btnAutoStartKaggle) btnAutoStartKaggle.classList.add("hidden");
  } else if (state === "checking") {
    statusDot.classList.add("bg-amber-400", "animate-ping");
    backendStatusBadge.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-300";
  } else {
    statusDot.classList.add("bg-rose-400");
    backendStatusBadge.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-500/10 border border-rose-500/30 text-rose-300";
    if (btnAutoStartKaggle && !isStartingKaggle) btnAutoStartKaggle.classList.remove("hidden");
  }
}

// ============================================================================
// KÍCH HOẠT KAGGLE GPU TỰ ĐỘNG QUA 1-CLICK
// ============================================================================
let isStartingKaggle = false;
let pollingInterval = null;

async function autoStartKaggle() {
  if (isStartingKaggle) return;
  isStartingKaggle = true;

  btnAutoStartKaggle.disabled = true;
  btnAutoStartText.textContent = "Đang gửi lệnh...";
  setBackendStatus("checking", "Đang khởi động Kaggle GPU...");

  let triggered = false;
  try {
    const apiEndpoints = [
      "/api/start-kaggle",
      "https://fontend-flood.vercel.app/api/start-kaggle"
    ];

    for (const ep of apiEndpoints) {
      try {
        const res = await fetch(ep, { method: "POST" });
        if (res.ok) {
          triggered = true;
          break;
        }
      } catch (e) {
        // Tiếp tục thử fallback
      }
    }
  } catch (err) {
    console.warn("Lỗi gọi Serverless API:", err);
  }

  // Nếu chạy trên GitHub Pages tĩnh (không có Serverless Backend)
  if (!triggered) {
    const kaggleUrl = "https://www.kaggle.com/code/nguynvlun/floodkaggleapi";
    window.open(kaggleUrl, "_blank");
  }

  btnAutoStartText.textContent = "GPU đang nạp model (~30-60s)...";
  setBackendStatus("checking", "Đang chờ Kaggle GPU kết nối...");

  // Bắt đầu quét kết nối ngrok tự động mỗi 3s
  if (pollingInterval) clearInterval(pollingInterval);
  let attempts = 0;
  pollingInterval = setInterval(async () => {
    attempts++;
    const isOnline = await pingBackend();
    if (isOnline) {
      clearInterval(pollingInterval);
      isStartingKaggle = false;
      if (btnAutoStartKaggle) btnAutoStartKaggle.classList.add("hidden");
    } else if (attempts > 50) { // Timeout sau 2.5 phút
      clearInterval(pollingInterval);
      isStartingKaggle = false;
      btnAutoStartKaggle.disabled = false;
      btnAutoStartText.textContent = "Bật Kaggle GPU";
      setBackendStatus("offline", "Kaggle chưa sẵn sàng");
    }
  }, 3000);
}

async function pingBackend() {
  try {
    const res = await fetch(`${currentApiUrl}/`, {
      method: "GET",
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "online") {
        const devName = data.device ? ` (${data.device})` : "";
        setBackendStatus("online", `🟢 Kaggle GPU Online${devName}`);
        fetchLiveCameras();
        return true;
      }
    }
  } catch (e) {
    // Chưa online
  }
  return false;
}

function showNoApiBanner() { noApiBanner.classList.remove("hidden"); }
function hideNoApiBanner() { noApiBanner.classList.add("hidden"); }

function openSettings() {
  testConnectionBox.classList.add("hidden");
  inputApiUrl.value = currentApiUrl;
  settingsModal.classList.remove("hidden");
}

function closeSettings() {
  settingsModal.classList.add("hidden");
}

function showTestResult(isSuccess, msg) {
  testConnectionBox.classList.remove("hidden", "bg-emerald-500/10", "border-emerald-500/30", "text-emerald-300", "bg-rose-500/10", "border-rose-500/30", "text-rose-300", "bg-slate-800", "text-slate-300");
  if (isSuccess === true) {
    testConnectionBox.classList.add("bg-emerald-500/10", "border-emerald-500/30", "text-emerald-300");
  } else if (isSuccess === false) {
    testConnectionBox.classList.add("bg-rose-500/10", "border-rose-500/30", "text-rose-300");
  } else {
    testConnectionBox.classList.add("bg-slate-800", "text-slate-300");
  }
  testConnectionBox.textContent = msg;
}

function cleanUrl(url) {
  if (!url) return "";
  let clean = url.trim();
  if (clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean;
}

// ============================================================================
// 3. DROPZONE & IMAGE HANDLING
// ============================================================================
function setupDropzone(dropzone, fileInput, placeholder, previewContainer, previewImg, btnRemove, btnAction, onFileSelect) {
  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) handleFile(e.target.files[0]);
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  });

  btnRemove.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.value = "";
    previewImg.src = "";
    previewContainer.classList.add("hidden");
    placeholder.classList.remove("hidden");
    btnAction.disabled = true;
    onFileSelect(null);
  });

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      alert("Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP)!");
      return;
    }
    onFileSelect(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      placeholder.classList.add("hidden");
      previewContainer.classList.remove("hidden");
      btnAction.disabled = false;
    };
    reader.readAsDataURL(file);
  }
}

function handleGlobalPaste(e) {
  const items = e.clipboardData?.items;
  if (!items) return;
  for (let item of items) {
    if (item.type.startsWith("image")) {
      const file = item.getAsFile();
      // Auto assign to active tab
      const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab;
      if (activeTab === "tab-traffic") {
        selectedTrafficFile = file;
        setPreview(trafficPreviewContainer, trafficUploadPlaceholder, trafficPreviewImg, btnAnalyzeTraffic, file);
      } else {
        selectedFloodFile = file;
        setPreview(floodPreviewContainer, floodUploadPlaceholder, floodPreviewImg, btnAnalyzeFlood, file);
      }
      break;
    }
  }
}

function setPreview(container, placeholder, imgElement, btnAction, file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imgElement.src = e.target.result;
    placeholder.classList.add("hidden");
    container.classList.remove("hidden");
    btnAction.disabled = false;
  };
  reader.readAsDataURL(file);
}

// ============================================================================
// 4. TAB 1: FLOOD DEPTH ANALYSIS
// ============================================================================
async function analyzeFlood() {
  if (!selectedFloodFile) return;
  if (!ensureApiConnected()) return;

  floodEmptyState.classList.add("hidden");
  floodResultState.classList.add("hidden");
  floodLoadingState.classList.remove("hidden");
  btnAnalyzeFlood.disabled = true;

  const formData = new FormData();
  formData.append("file", selectedFloodFile);

  const startTime = performance.now();
  try {
    const res = await fetch(`${currentApiUrl}/api/analyze/flood`, {
      method: "POST",
      body: formData,
      headers: { "ngrok-skip-browser-warning": "true" }
    });

    if (!res.ok) {
      throw new Error(`Kaggle API lỗi ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const computeTime = Math.round(performance.now() - startTime);
    renderFloodResult(data, computeTime);
  } catch (err) {
    alert(`❌ Lỗi phân tích ngập lụt: ${err.message}\n👉 Hãy chắc chắn notebook Kaggle đang chạy và endpoint đã sẵn sàng!`);
    floodEmptyState.classList.remove("hidden");
  } finally {
    floodLoadingState.classList.add("hidden");
    btnAnalyzeFlood.disabled = false;
  }
}

function renderFloodResult(data, computeTime) {
  floodComputeTime.textContent = `⏱️ ${computeTime}ms (GPU)`;
  floodResultImg.src = data.annotated_image || floodPreviewImg.src;

  // Depth
  resFloodDepth.textContent = data.depth_cm !== null ? Number(data.depth_cm).toFixed(1) : "0.0";
  resFloodMethod.textContent = data.method || "Thước đo mốc thủy chuẩn SCSG-Net";

  // Alert Level
  const level = data.alert_level || 0;
  const alertInfo = getAlertLevelInfo(level);
  resFloodAlertBadge.textContent = alertInfo.title;
  resFloodAlertBadge.className = `inline-block px-3 py-1 rounded-lg text-xs font-bold ${alertInfo.badgeClass}`;
  resFloodAlertDesc.textContent = alertInfo.desc;

  // Coverage
  resFloodCoverage.textContent = data.water_coverage_pct !== undefined ? Number(data.water_coverage_pct).toFixed(1) : "15.0";

  // Advice
  resFloodAdviceText.textContent = data.traffic_advice || alertInfo.advice;

  floodResultState.classList.remove("hidden");
}

function getAlertLevelInfo(level) {
  switch (level) {
    case 0:
      return {
        title: "Bình thường (An toàn)",
        badgeClass: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        desc: "Đường khô ráo, không có ngập.",
        advice: "Lưu thông bình thường cho tất cả các loại phương tiện."
      };
    case 1:
      return {
        title: "Ngập nhẹ (5 - 15 cm)",
        badgeClass: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        desc: "Nước xăm xắp mặt đường.",
        advice: "Xe máy và ô tô con chú ý giảm tốc độ để tránh nước bắn vào người khác."
      };
    case 2:
      return {
        title: "Ngập vừa (15 - 25 cm)",
        badgeClass: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        desc: "Nước ngập nửa bánh xe máy.",
        advice: "Người điều khiển xe máy đi đều ga, không nhả ga. Ô tô gầm thấp nên cân nhắc đường vòng."
      };
    case 3:
      return {
        title: "Ngập sâu nguy hiểm (25 - 45 cm)",
        badgeClass: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
        desc: "Ngập ống xả xe máy, ngập bánh ô tô sedan.",
        advice: "Xe máy nguy cơ chết máy cao. Cấm ô tô gầm thấp qua vùng này. Xe tải và xe SUV đi chậm."
      };
    default:
      return {
        title: "Báo động khẩn cấp (> 45 cm)",
        badgeClass: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
        desc: "Ngập lụt cực hạn, dòng nước xiết.",
        advice: "Khuyến cáo CẤM ĐƯỜNG khẩn cấp. Người dân tuyệt đối không di chuyển vào khu vực ngập sâu."
      };
  }
}

async function loadSampleFlood() {
  try {
    const res = await fetch(SAMPLE_FLOOD_URL);
    const blob = await res.blob();
    const file = new File([blob], "sample_flood.jpg", { type: "image/jpeg" });
    selectedFloodFile = file;
    setPreview(floodPreviewContainer, floodUploadPlaceholder, floodPreviewImg, btnAnalyzeFlood, file);
  } catch (err) {
    alert("Không thể tải ảnh mẫu từ CDN!");
  }
}

// ============================================================================
// 5. TAB 2: TRAFFIC CONGESTION ANALYSIS
// ============================================================================
async function analyzeTraffic() {
  if (!selectedTrafficFile) return;
  if (!ensureApiConnected()) return;

  trafficEmptyState.classList.add("hidden");
  trafficResultState.classList.add("hidden");
  trafficLoadingState.classList.remove("hidden");
  btnAnalyzeTraffic.disabled = true;

  const formData = new FormData();
  formData.append("file", selectedTrafficFile);

  const startTime = performance.now();
  try {
    const res = await fetch(`${currentApiUrl}/api/analyze/traffic`, {
      method: "POST",
      body: formData,
      headers: { "ngrok-skip-browser-warning": "true" }
    });

    if (!res.ok) {
      throw new Error(`Kaggle API lỗi ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    const computeTime = Math.round(performance.now() - startTime);
    renderTrafficResult(data, computeTime);
  } catch (err) {
    alert(`❌ Lỗi phân tích giao thông: ${err.message}`);
    trafficEmptyState.classList.remove("hidden");
  } finally {
    trafficLoadingState.classList.add("hidden");
    btnAnalyzeTraffic.disabled = false;
  }
}

function renderTrafficResult(data, computeTime) {
  trafficComputeTime.textContent = `⏱️ ${computeTime}ms (GPU)`;
  trafficResultImg.src = data.annotated_image || trafficPreviewImg.src;

  const counts = data.vehicle_counts || {};
  cntMotorbike.textContent = counts.motorcycle || 0;
  cntCar.textContent = counts.car || 0;
  cntTruck.textContent = counts.truck || 0;
  cntBus.textContent = counts.bus || 0;

  const los = data.los || "B";
  const losMap = {
    "A": { title: "LOS A - Dòng tự do", desc: "Đường thông thoáng hoàn toàn", class: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    "B": { title: "LOS B - Lưu thông tốt", desc: "Dòng xe ổn định, vận tốc tốt", class: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
    "C": { title: "LOS C - Lưu thông ổn định", desc: "Bắt đầu xuất hiện tương tác nhẹ", class: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    "D": { title: "LOS D - Mật độ cao", desc: "Tốc độ giảm, bắt đầu chậm lại", class: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    "E": { title: "LOS E - Rất đông / Cận tắc", desc: "Lưu lượng đạt ngưỡng dung nạp", class: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    "F": { title: "LOS F - Ùn tắc nghiêm trọng", desc: "Dòng xe dừng hẳn, kẹt cứng", class: "bg-rose-500/20 text-rose-400 border-rose-500/30" }
  };

  const losInfo = losMap[los] || losMap["B"];
  resLosTitle.textContent = losInfo.title;
  resLosDesc.textContent = losInfo.desc;
  resLosBadge.textContent = los;
  resLosBadge.className = `w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black border ${losInfo.class}`;

  resPcuScore.textContent = Number(data.pcu_score || 0).toFixed(1);
  resTotalVehicles.textContent = `Tổng cộng: ${data.total_vehicles || 0} phương tiện`;

  trafficResultState.classList.remove("hidden");
}

async function loadSampleTraffic() {
  try {
    const res = await fetch(SAMPLE_TRAFFIC_URL);
    const blob = await res.blob();
    const file = new File([blob], "sample_traffic.jpg", { type: "image/jpeg" });
    selectedTrafficFile = file;
    setPreview(trafficPreviewContainer, trafficUploadPlaceholder, trafficPreviewImg, btnAnalyzeTraffic, file);
  } catch (err) {
    alert("Không thể tải ảnh mẫu từ CDN!");
  }
}

// ============================================================================
// 6. TAB 4: LIVE CAN THO CAMERAS
// ============================================================================
async function fetchLiveCameras() {
  if (!currentApiUrl) {
    renderCameras(DEFAULT_CAMERAS);
    return;
  }

  try {
    const res = await fetch(`${currentApiUrl}/api/cameras`, {
      headers: { "ngrok-skip-browser-warning": "true" }
    });
    if (res.ok) {
      const data = await res.json();
      renderCameras(data.cameras || DEFAULT_CAMERAS);
    } else {
      renderCameras(DEFAULT_CAMERAS);
    }
  } catch {
    renderCameras(DEFAULT_CAMERAS);
  }
}

function renderCameras(cameras) {
  camerasGrid.innerHTML = "";
  cameras.forEach(cam => {
    const card = document.createElement("div");
    card.className = "bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:border-slate-600 transition";
    card.innerHTML = `
      <div>
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ${cam.status.toUpperCase()}
          </span>
          <span class="text-[11px] text-slate-500 font-mono">${cam.id}</span>
        </div>
        <h4 class="font-bold text-slate-100 text-sm">${cam.name}</h4>
        <p class="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
          <i class="fa-solid fa-location-dot text-slate-500"></i>
          <span>${cam.address || "TP. Cần Thơ"}</span>
        </p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-700/60 flex gap-2">
        <button class="btn-primary text-xs flex-1" onclick="captureCamera('${cam.id}', 'flood')">
          <i class="fa-solid fa-water"></i> Quét ngập
        </button>
        <button class="btn-success text-xs flex-1" onclick="captureCamera('${cam.id}', 'traffic')">
          <i class="fa-solid fa-car"></i> Quét xe
        </button>
      </div>
    `;
    camerasGrid.appendChild(card);
  });
}

window.captureCamera = async function(camId, mode) {
  if (!ensureApiConnected()) return;

  alert(`📸 Đang gửi lệnh chụp khung hình thực từ Camera [${camId}] tới Kaggle GPU...`);
  try {
    const res = await fetch(`${currentApiUrl}/api/camera/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ camera_id: camId, mode: mode })
    });

    if (!res.ok) throw new Error(`Lỗi chụp camera: ${res.statusText}`);
    const data = await res.json();

    if (mode === "flood") {
      document.querySelector('[data-tab="tab-flood"]').click();
      renderFloodResult(data, 300);
    } else {
      document.querySelector('[data-tab="tab-traffic"]').click();
      renderTrafficResult(data, 300);
    }
  } catch (err) {
    alert(`Không thể trích xuất khung hình: ${err.message}`);
  }
};

function ensureApiConnected() {
  if (!currentApiUrl) {
    alert("⚠️ Bạn chưa cấu hình địa chỉ Ngrok Backend! Vui lòng bấm vào 'Cấu hình Ngrok' để điền.");
    openSettings();
    return false;
  }
  return true;
}

// Start app
document.addEventListener("DOMContentLoaded", initApp);
