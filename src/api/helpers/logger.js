import winston from "winston";
const colorizer = winston.format.colorize();
const logger = new winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
    winston.format.align(),
    winston.format.printf((info) =>
      colorizer.colorize(
        info.level,
        `[✨ LOGGER ✨] => ${info.timestamp} - ${info.level}: ${
          info.message
        } \n${
          info.stack != undefined
            ? "[✨ ERROR-STACK ✨] => " + info.stack + "\n"
            : ""
        }`
      )
    )
  ),
});

export default logger;
