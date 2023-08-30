import { totalmem, freemem } from "os";
import Colorizer from "string-colorizer";
import { osInfo } from "systeminformation";
interface systemInfo {
  os: string;
  version: string;
  arch: string;
  platform: string;
  totalram: string;
  freeram: string;
}
export async function getSystemInfo(): Promise<systemInfo> {
  const data = await osInfo();

  return {
    os: data.distro,
    version: data.release,
    arch: data.arch,
    platform: data.platform,
    totalram: `${Math.round(totalmem() / 1024 / 1024 / 1024)}GB`,
    freeram: `${Math.round(freemem() / 1024 / 1024 / 1024)}GB`,
  };
}

export async function logSystemLogoAndInfo() {
  const colorizer = new Colorizer();
  colorizer.addCustomHexColor("macos", false, "#6289d5");
  colorizer.addCustomHexColor("macos2", false, "#c4cdf0");
  let c4 = colorizer.ansiCodes.foreground.red;
  let c3 = colorizer.ansiCodes.foreground.green;
  let c1 = colorizer.ansiCodes.foreground.cyan;
  let c5 = colorizer.ansiCodes.foreground.yellow;
  let c2 = colorizer.ansiCodes.foreground.white;
  await osInfo()
    .then((data) => {
      if (data.platform == "Windows")
        console.log(
          `
        ⠀⠀⠀${c4} ⣤⣴⣾⣿⣿⣿⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀${c3}⣠⡄${c2}
        ⠀⠀${c4} ⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀${c3}⢰⣦⣄⣀⣀⣠⣴⣾⣿⠃${c2}      ${colorizer.foregroundColors.cyan(
            "OS:"
          )} ${data.distro}
        ⠀⠀${c4} ⢸⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀${c3}⣼⣿⣿⣿⣿⣿⣿⣿⣿${c2}⠀      ${colorizer.foregroundColors.cyan(
            "Version:"
          )} ${data.release}
        ⠀⠀${c4} ⣼⣿⡿⠿⠛⠻⠿⣿⣿⡇⠀⠀${c3}⣿⣿⣿⣿⣿⣿⣿⣿⡿${c2}⠀      ${colorizer.foregroundColors.cyan(
            "Arch:"
          )} ${data.arch}
        ⠀⠀${c4} ⠉⠀⠀⠀ ⠀⠀⠀⠈⠁⠀${c3}⢰⣿⣿⣿⣿⣿⣿⣿⣿⠇${c2}       ${colorizer.foregroundColors.cyan(
            "Platform:"
          )} ${data.platform} 
        ⠀⠀${c1}⣠⣴⣶⣿⣿⣿⣷⣶⣤⠀⠀⠀${c3}⠈⠉⠛⠛⠛⠉⠉${c2}⠀⠀⠀       ${colorizer.foregroundColors.cyan(
            "Computer:"
          )} ${data.hostname}
        ⠀${c1}⢸⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀${c5}⣶⣦⣄⣀⣀⣀⣤⣤⣶${c2}⠀⠀⠀⠀     ${colorizer.foregroundColors.cyan(
            "Used Ram:"
          )} ${`${Math.round((100 * (totalmem() - freemem())) / totalmem())}%`}
        ⠀${c1}⣾⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀${c5}⢀⣿⣿⣿⣿⣿⣿⣿⣿⡟${c2}⠀⠀     
        ⠀${c1}⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀${c5}⢸⣿⣿⣿⣿⣿⣿⣿⣿⡇${c2}⠀⠀   
        ${c1}⢠⣿⡿⠿⠛⠉⠉⠉⠛⠿⠀⠀${c5}⢸⣿⣿⣿⣿⣿⣿⣿⣿⠁${c2}⠀⠀   
        ${c1}⠘⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀${c5}⠀⠻⢿⣿⣿⣿⣿⣿⠿⠛${c2}⠀⠀⠀
        `,
          colorizer.ansiCodes.foreground.white
        );
      else if (data.platform == "linux")
        console.log(
          `
       ⠀${c4}.---.
       ${c4}/     \\               ${colorizer.foregroundColors.cyan("OS:")} ${
            data.distro
          }
       ${c4}\\.@-@./               ${colorizer.foregroundColors.cyan(
            "Version:"
          )} ${data.release}
       ${c4}/\`\\_/\`\\               ${colorizer.foregroundColors.cyan(
            "Arch:"
          )} ${data.arch}
      ${c4}//  _  \\\\              ${colorizer.foregroundColors.cyan(
            "Platform:"
          )} ${data.platform} 
      ${c4}| \     )|_             ${colorizer.foregroundColors.cyan(
            "Computer:"
          )} ${data.hostname}
    ${c4}/\`\\_\`>  <_/ \\            ${colorizer.foregroundColors.cyan(
            "Used Ram:"
          )} ${`${Math.floor((100 * (totalmem() - freemem())) / totalmem())}%`}
 ${c4}   \\__/'---'\\__/
        `,
          colorizer.ansiCodes.foreground.white
        );
      else if (data.platform == "darwin")
        console.log(`
            ${colorizer.foregroundColors.cyan("OS:")} ${data.distro}
            ${colorizer.foregroundColors.cyan("Version:")} ${data.release}
            ${colorizer.foregroundColors.cyan("Arch:")} ${data.arch}
            ${colorizer.foregroundColors.cyan("Platform:")} ${data.platform} 
            ${colorizer.foregroundColors.cyan("Computer:")} ${data.hostname}
            ${colorizer.foregroundColors.cyan("Used Ram:")} ${`${Math.floor(
          (100 * (totalmem() - freemem())) / totalmem()
        )}%`}
         `);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log();
}
