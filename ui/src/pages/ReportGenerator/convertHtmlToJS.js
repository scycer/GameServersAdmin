var fs = require("fs");

fs.unlinkSync("test-report.ts");
fs.appendFileSync(
  "test-report.ts",
  `export const htmlReport = (data: { participant: string, brandGuid: string, reportGenerated: string, testplan: any, }) => \``
);

const htmlFileString = fs.readFileSync("./test-report.html").toString();

const firstHalf = htmlFileString.split("// *****DATA START*****")[0];
const firstHalfWithBackticksEscaped = firstHalf.replace(/`/g, "\\`");
fs.appendFileSync("test-report.ts", firstHalfWithBackticksEscaped);

fs.appendFileSync("test-report.ts", "var data = JSON.parse(${data})");

const secondHalf = htmlFileString.split("// *****DATA END*****")[1];
const secondHalfWithBackticksEscaped = secondHalf.replace(/`/g, "\\`");
fs.appendFileSync("test-report.ts", secondHalfWithBackticksEscaped);
fs.appendFileSync("test-report.ts", "`");
