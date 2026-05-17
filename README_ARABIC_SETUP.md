# DeepTutor Setup and Arabic Language Guide

This guide is for the public Arabic-enabled fork:

```text
https://github.com/Ahmed-Anwar-PMO/DeepTutor
```

Arabic support is included on the default `main` branch. The web UI can run in Arabic with right-to-left layout, and chat/book/question flows pass Arabic language instructions to the LLM.

## Requirements

Install these before starting:

| Tool | Version | Check |
| --- | --- | --- |
| Git | Any recent version | `git --version` |
| Python | 3.11 or newer | `python --version` |
| Node.js | 20.9 or newer | `node --version` |
| npm | Bundled with Node.js | `npm --version` |

You also need an API key for at least one LLM provider. Knowledge Base and RAG features also need an embedding provider.

## Option A: Guided Setup

Use this path for a first local install.

```bash
git clone https://github.com/Ahmed-Anwar-PMO/DeepTutor.git
cd DeepTutor
```

Create a Python environment.

macOS or Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

Windows PowerShell:

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

Run the setup wizard:

```bash
python scripts/start_tour.py
```

When the wizard asks for language, choose `العربية`. This writes the interface language to:

```text
data/user/settings/interface.json
```

Start the web app:

```bash
python scripts/start_web.py
```

Open the frontend URL printed in the terminal. The default URL is:

```text
http://localhost:3782
```

## Option B: Manual Setup

Use this path if you prefer to run each command yourself.

```bash
git clone https://github.com/Ahmed-Anwar-PMO/DeepTutor.git
cd DeepTutor
```

Create and activate a Python environment using the same commands from Option A, then install backend dependencies:

```bash
python -m pip install --upgrade pip
python -m pip install -e ".[server]"
```

Install frontend dependencies:

```bash
cd web
npm install
cd ..
```

Create your environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Edit `.env` and fill in at least these fields:

```dotenv
BACKEND_PORT=8001
FRONTEND_PORT=3782

LLM_BINDING=openai
LLM_MODEL=gpt-4o-mini
LLM_API_KEY=sk-xxx
LLM_HOST=https://api.openai.com/v1

EMBEDDING_BINDING=openai
EMBEDDING_MODEL=text-embedding-3-large
EMBEDDING_API_KEY=sk-xxx
EMBEDDING_HOST=https://api.openai.com/v1/embeddings
```

Do not commit real API keys.

Start both backend and frontend:

```bash
python scripts/start_web.py
```

## Arabic Language Setup

There are three supported ways to enable Arabic.

### 1. During setup

Run:

```bash
python scripts/start_tour.py
```

Choose `العربية` when prompted for language.

### 2. From the web UI

1. Open DeepTutor in the browser.
2. Go to `Settings`.
3. In `Language`, select `العربية`.

The app saves the setting immediately and switches the document to:

```html
<html lang="ar" dir="rtl">
```

### 3. By editing the local settings file

Create or edit:

```text
data/user/settings/interface.json
```

Use:

```json
{
  "theme": "light",
  "language": "ar"
}
```

Then restart:

```bash
python scripts/start_web.py
```

## Arabic CLI Usage

For one-shot CLI runs, pass Arabic explicitly:

```bash
deeptutor run chat "اشرح لي مفهوم التعلم العميق ببساطة" --language ar
```

The accepted Arabic language aliases include:

```text
ar
ara
arabic
العربية
ar-SA
```

## What Arabic Support Covers

Arabic support in this fork includes:

- Arabic UI strings under `web/locales/ar/`.
- Right-to-left layout for the web app when Arabic is selected.
- Arabic language persistence in local settings.
- Arabic prompt directives for chat, notebook analysis, summaries, book generation, quiz context, and session context.
- Arabic fallback behavior for prompt bundles that do not yet have a dedicated Arabic YAML file.
- Arabic deterministic labels for generated book blocks and empty states.

Arabic answer quality still depends on the LLM provider and model you configure. Use a model with strong multilingual and Arabic capability for best results.

## Verification

Run these checks after setup or after pulling updates:

```bash
python -m compileall -q deeptutor scripts tests
```

```bash
cd web
npm run i18n:parity
npx tsc --noEmit
npm run test:node
cd ..
```

To smoke-test the Arabic UI manually:

1. Start DeepTutor with `python scripts/start_web.py`.
2. Open `http://localhost:3782/settings`.
3. Select `العربية`.
4. Confirm the page is Arabic and right-to-left.

## Updating

From the repository root:

```bash
python scripts/update.py
```

If dependencies changed, reinstall:

```bash
python -m pip install -e ".[server]"
cd web
npm install
cd ..
```

## Troubleshooting

If the UI does not switch to Arabic:

- Confirm the fork is up to date: `git pull`.
- Confirm `web/locales/ar/app.json` exists.
- Confirm `data/user/settings/interface.json` contains `"language": "ar"`.
- Restart the app with `python scripts/start_web.py`.
- Refresh the browser page.

If chat responds in English:

- Confirm the web language is Arabic in Settings.
- For CLI, pass `--language ar`.
- Check that the configured LLM model supports Arabic well.
- Make sure custom system prompts or user instructions are not asking for English.

If ports are busy:

```bash
python scripts/stop_web.py
```

Then start again:

```bash
python scripts/start_web.py
```

## Rollback

To return the UI to English, select English in Settings or edit:

```text
data/user/settings/interface.json
```

Set:

```json
{
  "theme": "light",
  "language": "en"
}
```
