# 🎓 TMM Proto (Terminal Mastery Mentor)

> **Master your terminal, one command at a time.**

**TMM Proto** is a lightweight AI companion for your command line. It doesn't just give you a "copy-paste" answer; it detects your specific OS and Shell to provide the exact syntax you need, explained by a "Mentor" who wants you to understand the *why* behind the *what*.

---

## 🔥 Why TMM?

* **Context Awareness:** Automatically detects if you are on **Manjaro (Linux)**, **Windows (PowerShell/CMD)**, or **macOS**.
* **Hybrid Intelligence:** Uses **Groq** for lightning-fast cloud answers and **Ollama** as an automatic offline fallback.
* **High Contrast UI:** Designed for visibility on all terminal themes (Dark/Light).
* **Learning Memory:** Tracks every command you've learned in a local hidden history file.

---

## 🛠️ Installation & Setup

### 1. Prerequisites

* **Node.js** (v18 or higher)
* **Groq API Key** (Get one for free at [console.groq.com](https://console.groq.com))
* **Ollama** (Optional, for offline use)

### 2. Clone and Install

```bash
git clone https://github.com/your-username/tmm-proto.git
cd tmm-proto
npm install

```

### 3. Configure Secrets

Create a `.env` file in the project root:

```bash
GROQ_API_KEY=your_key_here

```

### 4. Global Access

Make the `tmm` command work from any directory:

```bash
# On Linux/macOS
sudo npm link

# On Windows (Run PowerShell as Admin)
npm link

```

---

## 🚀 Usage

Simply type `tmm` followed by your question:

```bash
tmm "how do I find all logs in /var/log?"

```

### **Mastery Commands**

* **Offline Mode:** *Just start `ollama serve` and TMM will automatically switch to local mode if your internet drops.*

---

## 💻 Cross-Platform Support

TMM understands the difference between your systems:

| Feature | Linux (Zsh/Bash) | Windows (PowerShell) |
| --- | --- | --- |
| **Pathing** | `/home/user/` | `C:\Users\user\` |
| **Formatting** | Rounded ANSI Boxes | High-Contrast PowerShell Boxes |
| **Logic** | Uses `xdg-open` | Uses `Start-Process` |

---

## 🤝 Contributing

TMM is an open-source experiment. Pull requests for new "Senses" (detecting more shells) or "Mastery" features (like Challenge Mode) are welcome!

---

## ✨ Author

<div align="center">

**Patrick** · *Terminal Enthusiast & Builder of TMM*  
Made with curiosity, clarity, and a love for great CLI UX.

</div>

---

## 🛡️ License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

