# 🎮 2048 Game

A polished, browser-based implementation of the classic 2048 puzzle game, built with Next.js and TypeScript. Swipe or use arrow keys to merge tiles and reach 2048!

**[Play Now →](https://jucish2019-a11y.github.io/game-2048)**

---

## ✨ Features

- 🎯 **Classic 2048 gameplay** - Merge tiles to reach 2048
- ⌨️ **Keyboard controls** - Arrow keys for desktop
- 📱 **Touch/swipe support** - Works great on mobile
- 🏆 **Score tracking** - Current score + best score (saved locally)
- ↩️ **Undo moves** - Made a mistake? Go back!
- 🌙 **Dark mode** - Easy on the eyes
- 🎨 **Smooth animations** - Satisfying tile transitions
- 📊 **Responsive design** - Looks great on all screen sizes

---

## 🚀 Quick Start

### Play Online
Just visit the [live demo](https://jucish2019-a11y.github.io/game-2048) and start playing!

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/game-2048.git
cd game-2048

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play!

---

## 🎮 How to Play

1. **Desktop:** Use arrow keys (↑↓←→) to slide all tiles
2. **Mobile:** Swipe in any direction
3. **Goal:** Merge matching tiles to reach **2048**
4. **Rules:**
   - All tiles slide in the chosen direction
   - When two tiles with the same number touch, they merge into one (doubled!)
   - A new tile (2 or 4) appears after every move
   - Game ends when no moves are possible

### Pro Tips
- Keep your highest tile in a corner
- Build in one direction to avoid mess
- Use undo wisely! ↩️

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) |
| UI Library | [React 18](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Touch Gestures | [@use-gesture/react](https://use-gesture.netlify.app/) |

---

## 📸 Screenshots

![2048 Game - Light Mode](./public/screenshots/light-mode.png)
*Light mode gameplay*

![2048 Game - Dark Mode](./public/screenshots/dark-mode.png)
*Dark mode gameplay*

---

## 🏗️ Project Structure

```
game-2048/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/              # Game logic + store
│   └── types/            # TypeScript definitions
├── public/               # Static assets
├── PROJECT.md            # Detailed project documentation
└── README.md             # This file
```

---

## 🎨 Customization

Want to make it your own? Check out `PROJECT.md` for:
- Color palette and design tokens
- Animation timings
- Game logic implementation
- Extension roadmap

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

---

## 🙏 Credits

- **Original 2048 Game:** [Gabriele Cirulli](https://gabrielecirulli.github.io/2048/)
- **Built by:** [Your Name]
- **Made with:** ❤️ and lots of tile merging

---

**Have fun playing! 🎮**
