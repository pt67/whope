
# 🚁 Battleground Game Module

This is a mini interactive game built with **React** and **TypeScript** where a helicopter (shoulder unit) is released to fly over an enemy village, dodging enemy fire, and earning coins if it survives for 15 seconds.

---

## 📦 Features

- Dynamic helicopter movement
- Random enemy positions
- Real-time collision detection
- Time-based gameplay (15 seconds)
- Coin reward system
- Game over logic if hit by enemies

---

## 🧰 Tech Stack

- React (TypeScript)
- CSS Modules for scoped styles
- Functional components and hooks (`useState`, `useEffect`)

---

## 📁 File Structure

```
/fightingGround
├── fightingGround.module.css   # Styling for the battle arena
├── fightingGround.tsx          # Main battleground component
├── helicoptor.png              # Helicopter asset
```

---

## 🧑‍💻 Usage

### 1. Import and Mount

```tsx
import FightingGround from './fightingGround/FightingGround';

<FightingGround onClose={() => setShowBattle(false)} />
```

### 2. Props

| Prop Name | Type       | Description                  |
|-----------|------------|------------------------------|
| `onClose` | `() => void` | Function to close the module |

---

## 🎮 Gameplay Flow

1. **Start**: Click "Release Shoulder" to begin.
2. **Movement**: Helicopter randomly moves around the village.
3. **Enemies**: If it hits an enemy (👾), the game ends.
4. **Victory**: If it survives 15 seconds, coins are rewarded.
5. **UI**:
   - 🏠 Houses
   - 👾 Enemies
   - 🚁 Animated Helicopter
   - 💀 Game Over / 🏆 Victory dialogs

---

## 🧠 Logic Summary

- `setInterval` for:
  - Target position change every 2s
  - Helicopter moves every 100ms
- `setTimeout` for:
  - Ending the battle after 15s
- `Math.hypot()` to calculate distance between helicopter and enemies

---

## 📸 Preview

*(Add a GIF or screenshot here)*

---

## ✅ To-Do (Optional Enhancements)

- Add spark/missile animations
- Add sound effects
- Enemy shooting mechanics
- Scoreboard or levels

---

## 🧼 Cleanup

All intervals and timeouts are cleaned up using `clearInterval` and `clearTimeout` to prevent memory leaks.

---

## 📄 License

This game module is part of a personal or experimental project. Feel free to fork and enhance it for learning or development purposes.
