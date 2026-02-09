# Aniruddha Adak | Animated Portfolio 2026 🚀

> A "Portfolio of the Future" exhibiting the cutting-edge capabilities of **Anime.js v4** and **Next.js**. 
> Designed with an "Engineer-Editorial" aesthetic, featuring fluid physics-based motion, FLIP transitions, and immersive SVG animations.

![Portfolio Preview](https://via.placeholder.com/800x400.png?text=Portfolio+Preview)

## ✨ Features

This portfolio integrates over **50+ Anime.js v4 features** across 7 unique interactive sections:

### 1. **Hero Section**
- **Effect**: Elastic Text Splitting & Mouse Parallax.
- **Tech**: `stagger(grid)`, `spring(1, 80, 10, 0)`, `WAAPI` for hardware-accelerated 3D transforms.

### 2. **About Me**
- **Effect**: Scroll-triggered Animated Stats.
- **Tech**: `onScroll`, `round()` utility for number counting, dynamic color interpolation.

### 3. **Skills (The Periodic Table)**
- **Effect**: Interactive Grid with Shuffle & Regroup.
- **Tech**: `stagger(grid)`, `spring` physics, SVG Logo integration.

### 4. **Experience Timeline**
- **Effect**: Self-drawing SVG path synced to scroll position.
- **Tech**: `createDrawable`, `onScroll` triggers, Diverse Easings (`spring`, `elastic`, `steps`, `quad`).
- **Responsive**: Fully optimized for mobile with adaptive layout.

### 5. **Projects Overlay**
- **Effect**: 3D FLIP Grid & Hover Reveals.
- **Tech**: **`createLayout`** (v4 Layout Module) for seamless filtering transitions, CSS Gradients, Abstract Shape Overlays.

### 6. **The Lab**
- **Effect**: Physics-based Draggable Playground.
- **Tech**: `createDraggable` (v4), `snap` to grid, inertia throwing.

### 7. **Contact**
- **Effect**: Magnetic Buttons & Particle System.
- **Tech**: `mapRange`, `createSeededRandom`, `damp` for smooth cursor tracking.

### ⚡ Global Polish
- **Custom Cursor**: Fluid follower using `lerp` and `damp`.
- **Navigation**: Full-screen curtain reveal using `clipPath` animation.
- **Performance**: Optimized with `will-change` properties and efficient `useEffect` cleanup.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Animation**: [Anime.js v4](https://animejs.com/) (Release Candidate)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/)

---

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/aniruddhaadak80/Portfolio-2026.git
    cd Portfolio-2026
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000) (or 3001/3002 if port is busy).

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

---

## ☁️ Deployment

### Deploying to Vercel (Recommended)

1.  Push your code to GitHub.
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click **"Add New..."** -> **"Project"**.
4.  Import the `Portfolio-2026` repository.
5.  Keep default settings (Next.js preset).
6.  Click **"Deploy"**.

### Deploying to Netlify

1.  Go to [Netlify.com](https://netlify.com).
2.  "Add new site" -> "Import an existing project".
3.  Connect GitHub and select `Portfolio-2026`.
4.  Build command: `npm run build`
5.  Publish directory: `.next` (or let Netlify auto-detect Next.js).

---

## 📄 License

MIT License © 2026 Aniruddha Adak
