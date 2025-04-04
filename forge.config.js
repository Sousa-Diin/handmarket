module.exports = {
  packagerConfig: {
    icon: "./public/icon", // Adicione um ícone .ico (Windows) ou .icns (Mac)
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel", // Windows Installer
      config: {},
    },
    {
      name: "@electron-forge/maker-zip", // Mac e Linux ZIP
      platforms: ["darwin", "linux"],
    },
    {
      name: "@electron-forge/maker-deb", // Linux DEB
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm", // Linux RPM
      config: {},
    },
  ],
};
