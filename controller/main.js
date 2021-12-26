const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

exports.getIndex = (_req, res) => {
  res.render("index", {
    render: "main",
    filename: "",
  });
};

exports.getForm = (req, res) => {
  const type = req.query.type;
  let render = "";
  const EJS = ["skj", "sktm"];
  EJS.forEach((e, i) => {
    if (i + 1 == type) {
      render = e;
    }
  });
  res.render("index", {
    render,
    filename: "",
  });
};

exports.getDownload = (req, res) => {
  try {
    const filename = req.query.filename;
    res.render("index", {
      render: "download",
      filename: filename,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getDownloadFile = (req, res) => {
  try {
    const filename = req.query.filename;
    res.download(path.join(__dirname, "..", `public/doc/out/${filename}.docx`));
  } catch (err) {
    console.log(err);
  }
};

exports.postSKJ = (req, res) => {
  try {
    const name = req.body.name;
    const plate = req.body.plate;
    const amount = req.body.amount;
    const destination = req.body.destination;
    const length = req.body.lengths;
    const width = req.body.width;
    const height = req.body.height;
    const nameOfGoods = req.body.nameOfGoods;
    const vehicle = req.body.vehicle;
    const description = req.body.description;

    const paths = path.join(__dirname, "..", "public/doc/input/skj.docx");
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
    doc.render({
      month: roman[date.getMonth()],
      year: 2021,
      nameOfGoods: nameOfGoods,
      size: `${length} x ${width} x ${height} Cm`,
      amount: amount,
      type: vehicle,
      license_plate: plate,
      destination: destination,
      description: description,
      date: dateToday,
      name: name,
    });

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    fs.writeFileSync(
      path.join(__dirname, "..", "public/doc/out/skj.docx"),
      buf
    );

    res.redirect("/download?filename=skj");
  } catch (err) {
    console.log(err);
  }
};

exports.postSKTM = (req, res) => {
  try {
    const nik = req.body.nik;
    const name = req.body.name;
    const gender = req.body.gender;
    const place = req.body.place;
    const date = req.body.date;
    const citizen = req.body.citizen;
    const religion = req.body.religion;
    const work = req.body.work;
    const mariage = req.body.mariage;
    const address = req.body.address;
    const purpose = req.body.purpose;
  } catch (err) {
    console.log(err);
  }
};
