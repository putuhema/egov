const fs = require("fs");
const path = require("path");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

exports.DocTemplate = (docname, output, value) => {
  const paths = path.join(__dirname, "..", `public/doc/input/${docname}.docx`);
  const content = fs.readFileSync(paths, "binary");

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const date = new Date();

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const roman = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  const dateToday = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  value.month = roman[date.getMonth()];
  value.year = date.getFullYear();
  value.date = dateToday;

  doc.render(value);
  const buf = doc.getZip().generate({ type: "nodebuffer" });

  fs.writeFileSync(
    path.join(__dirname, "..", `public/doc/out/${output}.docx`),
    buf
  );
};
