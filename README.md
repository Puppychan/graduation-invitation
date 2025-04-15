<img width="1512" alt="image" src="https://github.com/user-attachments/assets/2c0847df-0711-424d-8e9a-1398a882ad73" /><img width="1512" alt="image" src="https://github.com/user-attachments/assets/13a7fa35-7309-4cb2-ac4e-9fc37977a3ca" /># 🎓 Graduation Invitation

A beautiful, interactive 3D web-based graduation invitation built with React Three Fiber, combining immersive design, animations, and real-time 3D effects to create a memorable digital celebration experience.

- 🎞️ [Demo Link](https://youtu.be/tBg4vugtb3o) - In dark mode only
- 🌟 [Live Link](https://nhung-graduation-invitation.netlify.app/)


## 🌟 Features

- ✨ Fully 3D Invitation Scene using `@react-three/fiber` and `@react-three/drei`
- Dark mode and light mode themes
- 📸 Photo gallery & ambient effects
- 💡 Real-time lighting, camera motion, and postprocessing (Bloom)
- 📱 Responsive HTML overlays styled with TailwindCSS
- 🎨 Customizable thank you message (based on url path: `lec_<name>` - lecturer, `toho_<name>` - Tourism Hospitality club, `capstone_<name>` - Capstone team, `best_<name>` - My best friends)
- [🌐 Live Link](https://nhung-graduation-invitation.netlify.app/)
- [🎞️ Demo Video](https://youtu.be/tBg4vugtb3o)

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
    ├── 🖼️ assets/      – storing images
    ├── 🖌️ fonts/       – storing font mappings
    ├── 🔖 models/      – storing 3D model files
    └── 🌌 textures/    – storing textures for 3D models and scenes
    
    📁 src/
    ├── 📦 components/
    │   ├── 🧱 3d-models/     – models generated from .glb files
    │   ├── 🌀 3d-shapes/     – 3D shapes created with R3F and drei
    │   ├── 🌠 3d-scenes/     – components for structure, loading, and controls of scenes
    │   └── 🧩 ./             – non-3D related shared components
    ├── 🧠 context/          – context files for global state (e.g., theme)
    ├── 🖥️ screens/          – screen components (e.g., Home, Thank You)
    ├── 🎯 sections/         – 3D sections used in Home screen
    └── 🛠️ utils/            – utility/helper functions
    
    📜 App.tsx              – Main React component
    🎨 App.css              – Main CSS file (e.g., Tailwind import)
    🧷 index.tsx            – React DOM entry point
    🔧 main.tsx             – App bootstrap/logic entry point

## ⚙️ Getting Started

### 1. Clone the repo
``` bash
git clone https://github.com/Puppychan/graduation-invitation
cd graduation-invitation
```

### 2. Install dependencies

`npm install`

### 3. Start the dev server

`npm run dev`

## 🖼 Screenshots

<table>
  <tr>
    <td align="center"></td>
    <td align="center"><strong>🌚 Dark Mode</strong></td>
    <td align="center"><strong>🌝 Light Mode</strong></td>
  </tr>
    <tr>
    <td align="center">Thank You Screen</td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/d6b4b350-bc4e-4a59-bf0a-db1bbc16da0a" />
    </td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/90127e48-34ed-4846-bad8-e3106c230154" />
    </td>
    </tr>
    <tr>
    <td align="center">Instruction</td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/163f66b0-fd8d-4cbb-8846-3d700a4fe94f" />
    </td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/82c5471c-76a2-4d9a-8d8b-1f59fd9c58cf" />
    </td>
    </tr>
  <tr>
    <td align="center">3D - Welcome</td>
    <td align="center">
      <img width="1512" alt="Screenshot 2025-04-13 at 10 15 28" src="https://github.com/user-attachments/assets/2ecbb528-651d-447e-8408-2514531c8d6c" />
    </td>
    <td align="center">
      <img width="1506" alt="image" src="https://github.com/user-attachments/assets/da205787-4b57-40d2-8562-e7f978846895" />
    </td>
  </tr>
      <tr>
    <td align="center">3D - Subtitle</td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/7ab37d5c-2038-494d-99a7-4773017332f6" />
    </td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/9f28fb62-afc8-4867-9898-6daa55fca3a4" />
    </td>
  </tr>
     <tr>
    <td align="center">3D - University Info</td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/aed82169-ad8a-42ad-bc8e-e2e52955e374" />
    </td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/63937ebc-2a98-43cd-aa3b-daadb57f1946" />
    </td>
  </tr>
  <tr>
    <td align="center">3D - Invitation Info</td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/00224beb-62ba-4979-a5ae-a9b05c8cb39e" />
    </td>
    <td align="center">
      <img width="1512" alt="image" src="https://github.com/user-attachments/assets/5e46c56c-d184-442e-b8b8-86c0c4527ee0" />
    </td>
  </tr>
</table>

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

This project uses a dual licensing structure:

- 🧠 Source code: [MIT License](LICENSE)
- 🎨 Design and layout: [CC BY-NC 4.0](LICENSE-CC-BY-NC.md)

  Shield: [![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

  This work is licensed under a
  [Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

  [![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

  [cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
  [cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
  [cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg

### Attribution Requirements

If you use this code or design elements in your project, please include the following attribution:

```
Based on work by [Tran Mai Nhung] (https://github.com/Puppychan/graduation-invitation)
```

See [NOTICE.md](NOTICE.md) for asset attributions and third-party licenses.
