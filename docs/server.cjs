var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_fs = __toESM(require("fs"), 1);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.post("/api/send-email", async (req, res) => {
    try {
      const { text, subject, to } = req.body;
      const recipient = to || "carolana.lira.s@gmail.com";
      const emailSubject = subject || "Despedida... \u{1F494}";
      const emailText = text || "Foi bom enquanto durou mas agora eu iria virar monge e ir para o tibete ou possivelmente iria engolir uma p\xEDlula em ibiza.";
      console.log("=== SEND EMAIL REQUEST ===");
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body: ${emailText}`);
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      if (smtpUser && smtpPass) {
        const transporter = import_nodemailer.default.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
        await transporter.sendMail({
          from: `"Paulo Taveira" <${smtpUser}>`,
          to: recipient,
          subject: emailSubject,
          text: emailText,
          html: `<div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <p>${emailText.replace(/\n/g, "<br>")}</p>
          </div>`
        });
        console.log("Email sent successfully via SMTP.");
        res.json({ success: true, mode: "real", message: "Email enviado com sucesso!" });
      } else {
        console.warn("SMTP credentials not configured. Simulating email dispatch inside container.");
        res.json({
          success: true,
          mode: "simulated",
          message: "Email simulado e logado no console com sucesso! (Configure SMTP_USER e SMTP_PASS para envio real)"
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message || "Erro interno ao processar o email." });
    }
  });
  app.post("/api/parse-drive-folder", async (req, res) => {
    try {
      const { folderUrl } = req.body;
      if (!folderUrl) {
        return res.status(400).json({ success: false, error: "Link da pasta \xE9 obrigat\xF3rio." });
      }
      const match = folderUrl.match(/folders\/([-\w]{25,})/);
      if (!match) {
        return res.status(400).json({ success: false, error: "Formato de link do Google Drive inv\xE1lido." });
      }
      const folderId = match[1];
      console.log(`[Google Drive Sync] Parsing public folder ID: ${folderId}`);
      const response = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        }
      });
      if (!response.ok) {
        throw new Error(`Google Drive returned HTTP status ${response.status}`);
      }
      const html = await response.text();
      const fileIds = [];
      const matches = html.matchAll(/\"([-\w]{28,34})\"/g);
      for (const m of matches) {
        const id = m[1];
        if (id && id !== folderId && !id.startsWith("root") && !fileIds.includes(id)) {
          fileIds.push(id);
        }
      }
      const uniqueIds = Array.from(new Set(fileIds)).slice(0, 10);
      const images = uniqueIds.map((id) => ({
        id,
        url: `https://lh3.googleusercontent.com/d/${id}`
      }));
      console.log(`[Google Drive Sync] Successfully extracted ${images.length} images from folder ${folderId}`);
      res.json({ success: true, images });
    } catch (error) {
      console.error("[Google Drive Sync] Error parsing folder:", error);
      res.status(500).json({ success: false, error: error.message || "Erro ao sincronizar pasta do Google Drive." });
    }
  });
  app.use("/images", import_express.default.static(import_path.default.join(process.cwd(), "src/assets/images")));
  app.get("/api/download-apk", (req, res) => {
    let apkPath = import_path.default.join(process.cwd(), "src/assets/app/meu_bem.apk");
    if (!import_fs.default.existsSync(apkPath)) {
      apkPath = import_path.default.join(process.cwd(), "app-release.apk");
    }
    console.log(`[APK Download] Serving APK from: ${apkPath}`);
    if (import_fs.default.existsSync(apkPath)) {
      const stats = import_fs.default.statSync(apkPath);
      res.writeHead(200, {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": "attachment; filename=meubem.apk",
        "Content-Length": stats.size,
        "Content-Transfer-Encoding": "binary",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0"
      });
      const stream = import_fs.default.createReadStream(apkPath);
      stream.pipe(res);
    } else {
      console.warn("[APK Download] APK not found at:", apkPath);
      res.status(404).json({ success: false, error: "Arquivo APK n\xE3o encontrado no servidor." });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
