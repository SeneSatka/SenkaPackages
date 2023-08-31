# <center> SenkaLogger</center>

## Usage

```js
import { Logger } from "@senka/logger";
/**
 * Commonjs
 * const { Logger } = require("@senka/logger")
 */
const logger = new Logger();
logger.warn("npm i @senka/logger");
logger.error("You still haven't downloaded @senka/logger");
logger.log("Thanks for downloading");
logger.discord("Jack: Hi");
```

<img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AITFw-xJRfUfy_EE-B1HsnthDMN2Cyzha4Q5vey9_Wkn8JrPmZPKZ_EeC2P06DxYYFczUwKtiw_E9m3dQsHRK2VJlgFvg7JP=w1239-h571"/>

## Logger Options

```js
const loggerOptions={
    discordColor: string;/* default  #645cff */
    defaultColor: string;/* default  #0f0 */
    defaultErrorColor: string;/* default  #f00 */
    defaultWarningColor: string;/* default  #ff0 */
    discordTextColor: string;/* default  #625cff */
    defaultTextColor: string;/* default  #0f5 */
    defaultTextErrorColor: string;/* default  #f05 */
    defaultTextWarningColor: string;/* default  #ff5 */
    time: boolean;/* default false */
    }


    const logger= new Logger({time:true})
    // Adds [HH:MM:SS]> to the beginning of the line
```

## Loading

```js
import { Logger } from "@senka/logger";
const logger = new Logger();
logger.loading({
  time: 1500,
  changeTime: 500,
  loadArr: [".", "..", "..."],
  before: "Loading",
});
//or
logger.loading({
  time: 1500,
  changeTime: 500,
  loadArr: ".",
  repeat: true,
  before: "Loading",
});
/**
 *  Loading.
 *  Loading..
 *  Loading...
 *  Note: The line is refreshed,
 *  it does not write to more than one line.
 */
```

### Loading Options

```js
const loadingoptions={
  time: number;//required
  changeTime: number;//required
  loadArr: any;/* default ["\\", "|", "/", "-"] */
  repat: boolean;/* default false */
  before: string | number;
  after: string | number;
}
const logger = new Logger();
logger.loading({
    time:4000,
    changeTime:500,
    before:"Loading [ ",
    after:" ]"
    })
/**
 *  Loading [ \ ]
 *  Loading [ | ]
 *  Loading [ / ]
 *  Loading [ - ]
 *  Loading [ \ ]
 *  Loading [ | ]
 *  Loading [ / ]
 *  Loading [ - ]
 * Note: The line is refreshed,
 * it does not write to more than one line.
 */
```

<a href="https://discord.com/users/812347817602842624">Discord</a>
