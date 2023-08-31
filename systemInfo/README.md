# <center> SenkaSystemInfo</center>

## Usage

```js
import { getSystemInfo, logSystemLogoAndInfo } from "@senka/systeminfo";
/**
 * Commonjs
 * const { getSystemInfo, logSystemLogoAndInfo } = require("@senka/systeminfo")
 */
await getSystemInfo().then((data) => console.log(data));
/* Example:
 {
    os: data.distro,
    version: data.release,
    arch: data.arch,
    platform: data.platform,
    totalram: `${Math.round(totalmem() / 1024 / 1024 / 1024)}GB`,
    freeram: `${Math.round(freemem() / 1024 / 1024 / 1024)}GB`,
}
 */
logSystemLogoAndInfo();
/* Example
   ⠀ ⣤⣴⣾⣿⣿⣿⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡄
    ⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢰⣦⣄⣀⣀⣠⣴⣾⣿⠃      OS: Microsoft Windows 11 Pro
    ⢸⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⠀      Version: 10.0.22621
⠀   ⣼⣿⡿⠿⠛⠻⠿⣿⣿⡇⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀      Arch: x64
⠀    ⠉⠀⠀⠀ ⠀⠀⠀⠈⠁⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⠇       Platform: Windows
⠀  ⣠⣴⣶⣿⣿⣿⣷⣶⣤⠀⠀⠀⠈⠉⠛⠛⠛⠉⠉⠀⠀⠀       Computer: Scripter
⠀ ⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⣶⣦⣄⣀⣀⣀⣤⣤⣶⠀⠀⠀⠀     Used Ram:: 54%
  ⣾⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀
⢠⣿⡿⠿⠛⠉⠉⠉⠛⠿⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀
⠘⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⣿⣿⣿⣿⣿⠿⠛⠀⠀⠀ 
*/
```
