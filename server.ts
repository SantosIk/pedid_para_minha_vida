import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to send farewell email when clicking "Não" on the popup
  app.post("/api/send-email", async (req, res) => {
    try {
      const { text, subject, to } = req.body;
      const recipient = to || "carolana.lira.s@gmail.com";
      const emailSubject = subject || "Despedida... 💔";
      const emailText = text || "Foi bom enquanto durou mas agora eu iria virar monge e ir para o tibete ou possivelmente iria engolir uma pílula em ibiza.";

      console.log("=== SEND EMAIL REQUEST ===");
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Body: ${emailText}`);

      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Paulo Taveira" <${smtpUser}>`,
          to: recipient,
          subject: emailSubject,
          text: emailText,
          html: `<div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <p>${emailText.replace(/\n/g, '<br>')}</p>
          </div>`,
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
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message || "Erro interno ao processar o email." });
    }
  });

  // API Route to parse public Google Drive folder links and extract image IDs
  app.post("/api/parse-drive-folder", async (req, res) => {
    try {
      const { folderUrl } = req.body;
      if (!folderUrl) {
        return res.status(400).json({ success: false, error: "Link da pasta é obrigatório." });
      }

      // Extract folder ID using regex
      const match = folderUrl.match(/folders\/([-\w]{25,})/);
      if (!match) {
        return res.status(400).json({ success: false, error: "Formato de link do Google Drive inválido." });
      }

      const folderId = match[1];
      console.log(`[Google Drive Sync] Parsing public folder ID: ${folderId}`);

      // Fetch public Google Drive folder page to scan for file IDs
      const response = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`Google Drive returned HTTP status ${response.status}`);
      }

      const html = await response.text();
      
      // Simple scan for possible Google Drive file IDs
      // Standard IDs are 33 characters, containing letters, numbers, hyphens, and underscores.
      // We extract alphanumeric strings of length 28-34 from the source HTML.
      const fileIds: string[] = [];
      const matches = html.matchAll(/\"([-\w]{28,34})\"/g);
      for (const m of matches) {
        const id = m[1];
        if (id && id !== folderId && !id.startsWith("root") && !fileIds.includes(id)) {
          fileIds.push(id);
        }
      }

      // Filter and pick up to 10 unique IDs, convert to direct high-resolution viewing URLs
      const uniqueIds = Array.from(new Set(fileIds)).slice(0, 10);
      const images = uniqueIds.map(id => ({
        id,
        url: `https://lh3.googleusercontent.com/d/${id}`,
      }));

      console.log(`[Google Drive Sync] Successfully extracted ${images.length} images from folder ${folderId}`);
      res.json({ success: true, images });
    } catch (error: any) {
      console.error("[Google Drive Sync] Error parsing folder:", error);
      res.status(500).json({ success: false, error: error.message || "Erro ao sincronizar pasta do Google Drive." });
    }
  });

  // Serve local uploaded images statically on /images for absolute client-side references
  app.use("/images", express.static(path.join(process.cwd(), "src/assets/images")));

  // API Route to download the real Android APK file (from our saved app-release.apk)
  app.get("/api/download-apk", (req, res) => {
    const apkPath = path.join(process.cwd(), "app-release.apk");
    console.log(`[APK Download] Serving APK from: ${apkPath}`);
    if (fs.existsSync(apkPath)) {
      res.setHeader("Content-Disposition", "attachment; filename=meubem.apk");
      res.setHeader("Content-Type", "application/vnd.android.package-archive");
      res.sendFile(apkPath);
    } else {
      console.warn("[APK Download] app-release.apk not found at:", apkPath);
      res.status(404).json({ success: false, error: "Arquivo APK não encontrado no servidor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
