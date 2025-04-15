# 🎓 Graduation Invitation
A beautiful, interactive 3D web-based graduation invitation built with React Three Fiber, combining immersive design, animations, and real-time 3D effects to create a memorable digital celebration experience.
[Live Demo](https://nhung-graduation-invitation.netlify.app/)


## 🌟 Features
- ✨ Fully 3D Invitation Scene using `@react-three/fiber` and `@react-three/drei`
- Dark mode and light mode themes
- 📸 Photo gallery & ambient effects
- 💡 Real-time lighting, camera motion, and postprocessing (Bloom)
- 📱 Responsive HTML overlays styled with TailwindCSS
- 🎨 Customizable thank you message (based on url path: `lec_<name>` - lecturer, `toho_<name>` - Tourism Hospitality club, `capstone_<name>` - Capstone team, `best_<name>` - My best friends)
- [🌐 Live Demo](https://nhung-graduation-invitation.netlify.app/)

## 🚀 Technologies Used
- React + TypeScript + Vite
- TailwindCSS – For elegant, fast UI styling

### For 3D Rendering and Graphics
- three - Core 3D library
- @react-three/fiber – WebGL renderer for React
- @react-three/drei – Helpers and abstractions
- @react-three/cannon - Physics engine for 3D objects
- @react-three/postprocessing – Postprocessing, ambient light and glow effects

### Supporting Libraries
- maath – For smooth animation transitions
- lodash - For utility functions
- react-responsive - For responsive design
- react-icons - For icons
- tailwind-merge - For merging Tailwind classes

## 📂 Folder Structure

    📁 public/
        🖼️ assets/ - storing images
        🖌️ fonts/ - storing font mappings
        🔖 models - storing 3d model files
        🌌 textures/ - storing textures when rendering 3d models and scenes
    
    📁 src/
        📦 components/
            3d-models/ - storing models generated from 3d glb files
            3d-shapes/ - storing 3d shapes created with react-three-fiber and drei
            3d-scenes/ - storing components for loading, building structure and controls the 3d scenes
            ./ - storing other components, which are not 3d related
    context/
        ./ - storing context files for managing global states (Theme)
    screens/
        ./ - storing screen components, including thank you screen and home screen
    sections/
        ./ - storing 3d sections inside Home screen
    utils/
        ./ - storing utility functions
    📜 App.tsx
    App.css - Main CSS file for importing TailwindCSS
    index.tsx - Main entry point for the React app
    main.tsx - Main entry point for the React app

📜 index.html

## ⚙️ Getting Started
### 1. Clone the repo
git clone https://github.com/Puppychan/graduation-invitation
cd graduation-invitation

### 2. Install dependencies
npm install

### 3. Start the dev server
npm run dev

## 🖼 Screenshots
Light Mode | Dark Mode
<img width="1512" alt="Screenshot 2025-04-13 at 10 15 28" src="https://github.com/user-attachments/assets/2ecbb528-651d-447e-8408-2514531c8d6c" />  | <img width="1506" alt="image" src="https://github.com/user-attachments/assets/da205787-4b57-40d2-8562-e7f978846895" />
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/00224beb-62ba-4979-a5ae-a9b05c8cb39e" /> | <img width="1512" alt="image" src="https://github.com/user-attachments/assets/5e46c56c-d184-442e-b8b8-86c0c4527ee0" />


			
## 🧠 Inspiration
This project was born from a vision to transform the traditional graduation announcement into something extraordinary. Moving beyond simple text messages or static designs, I wanted to create an immersive, interactive experience that would make my invitation truly memorable.

My goal was to transport friends and family into a captivating 3D world where they could explore and interact with the invitation like a game. I imagined a space where loved ones could not only feel the excitement and joy of graduation but also feel honored as significant participants in my journey.

Having just begun my exploration of 3D rendering, Blender, and WebGL a month ago, this represents only my second venture into 3D creation. It's both a celebration invitation and a milestone in my developing skills. I hope you enjoy experiencing it as much as I enjoyed creating it!

## 🎨 Design
- All 3D models are taken from [Sketchfab](https://sketchfab.com/)
- Gradient texture is taken from [uiGradients](https://uigradients.com/)
- Gummy texture is taken from [MatCaps](https://github.com/emmelleppi/matcaps)
- Font is taken from [Google Fonts](https://fonts.google.com/)
- Text design is inspired by [Sandbox](https://codesandbox.io/p/sandbox/r3f-drei-3d-text-de86ih)

## 🤝 Contributing
Have ideas or feedback? Feel free to open an issue or submit a PR!

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.



