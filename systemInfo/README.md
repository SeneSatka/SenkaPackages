# <center> SenkaLogger</center>

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
  os: 'Microsoft Windows 11 Pro',
  version: '10.0.22621',
  arch: 'x64',
  platform: 'Windows',
  ram: '16GB'
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
⠀ ⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⣶⣦⣄⣀⣀⣀⣤⣤⣶⠀⠀⠀⠀     RAM: 16GB
  ⣾⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀
⢠⣿⡿⠿⠛⠉⠉⠉⠛⠿⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀
⠘⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⣿⣿⣿⣿⣿⠿⠛⠀⠀⠀ 
*/
```
