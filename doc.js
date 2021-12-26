const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(
  path.resolve(__dirname, "surat.docx"),
  "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});

doc.render({
  month: "XII",
  year: 2021,
  thing_name: "Batu Belah",
  size: "40 x 30 x 40",
  amount: 40,
  type: "Truk DAM",
  license_plate: "DC 0323 MM",
  destination:
    "Jl Ngurah Rai, Desa Tommo, Kecamatan Tommo, Kabupaten Mamuju, Provinsi Sulawesi Barat",
  about: "Mengangkut pasir",
  date: "24 Desember 2021",
  name: "JUFRI ALFAUZAN",
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
