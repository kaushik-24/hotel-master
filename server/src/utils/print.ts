import chalk from "chalk";
import { DotenvConfig } from "../config/env.config";
import { Environment } from "../constant/enum";

const log = console.log;
class Print {
    static error(message: string): void {
        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            log(chalk.red("ERROR", message));
    }

    static info(message: string): void {
        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            log(chalk.green("INFO", message));
    }
}

export default Print;
