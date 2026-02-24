# Velora | Premium Digital Invitations

Velora is a sophisticated event invitation platform designed for creating stunning, animated digital invites. From elegant weddings to handcrafted scrapbook birthdays, Velora turns every invitation into a memorable experience.

![Preview](https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=1200&q=80)

## ✨ Unique Features

- **Exclusive Scrapbook Theme**: Handcrafted birthday collages featuring dual photo uploads, hand-drawn elements, and a handcrafted "Happy Birthday" title.
- **High-Resolution Exports**: Download your cards in crisp, high-quality PNG format at 2x resolution—perfect for sharing or printing.
- **Pixel-Perfect Rendering**: Precision-engineered layouts that look identical in the browser and in the final download, thanks to our specialized rendering engine.
- **Modern Tech-Infused UI**: Sleek Aurora Red and Sunset Gold themes with advanced glassmorphism and animations.
- **Dynamic Mini-Calendar**: An beautifully styled interactive calendar that dynamically highlights your event date.
- **Mobile-Optimized Experience**: A fully responsive interface with a seamless "Floating Island" navigation system.

## 🛠️ Performance Tech Stack

- **Framework**: [React 19](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Image Generation**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Routing**: [React Router](https://reactrouter.com/)

## 🚀 Installation & Setup

1.  **Clone build:**
    ```bash
    git clone https://github.com/Kashif-Khokhar/Calender.git
    cd Calender
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch dev environment:**
    ```bash
    npm run dev
    ```

4.  **Production build:**
    ```bash
    npm run build
    ```

## 📂 Design Architecture

Velora's architecture is focused on visual consistency and export fidelity:

- `src/pages/Editor.jsx`: The heart of the app, featuring multiple layout engines including the high-fidelity Scrapbook system.
- `src/index.css`: Modern global theme definitions using Tailwind v4's high-performance CSS variables.
- Specialized Inline Rendering: Critical components use sanitized inline styles to ensure zero-distortion during SVG/PNG conversion.

## 📄 License

This project is licensed under the MIT License.

---
*Developed with ❤️ by [Kashif Khokhar](https://github.com/Kashif-Khokhar)*
