const path = require("path");

const { DocTemplate } = require("../helper");

exports.getIndex = (_req, res) => {
  res.render("index", {
    render: "main",
    filename: "",
  });
};

exports.getForm = (req, res) => {
  const type = req.query.type;
  let render = "";
  const EJS = ["skj", "sktm", "skd"];
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

    const value = {
      nameOfGoods: nameOfGoods,
      size: `${width} x ${length} x ${height}`,
      amount: amount,
      vehicle: vehicle,
      license_plate: plate,
      destination: destination,
      description: description,
      name: name,
    };

    DocTemplate("skj", "Surat_Keterangan_Jalan", value);

    res.redirect("/download?filename=Surat_Keterangan_Jalan");
  } catch (err) {
    console.log(err);
  }
};

exports.postSKTM = (req, res) => {
  try {
    const nik = req.body.nik;
    const name = req.body.name;
    const gender = req.body.gender;
    const placeOfBirth = req.body.place;
    const dateOfBirth = req.body.date;
    const citizen = req.body.citizen;
    const religion = req.body.religion;
    const job = req.body.work;
    const marriedStatus = req.body.mariage;
    const address = req.body.address;
    const purpose = req.body.purpose;

    const value = {
      name,
      nik,
      gender,
      placeOfBirth,
      dateOfBirth,
      citizen,
      religion,
      job,
      marriedStatus,
      address,
      purpose,
    };

    DocTemplate("sktm", "Surat_Keterangan_Tidak_Mampu", value);

    res.redirect("/download?filename=Surat_Keterangan_Tidak_Mampu");
  } catch (err) {
    console.log(err);
  }
};

exports.postSKD = (req, res) => {
  try {
    const name = req.body.name;
    const gender = req.body.gender;
    const placeOfBirth = req.body.place;
    const dateOfBirth = req.body.date;
    const citizen = req.body.citizen;
    const religion = req.body.religion;
    const job = req.body.work;
    const marriedStatus = req.body.mariage;
    const address = req.body.address;

    const value = {
      name,
      gender,
      placeOfBirth,
      dateOfBirth,
      citizen,
      religion,
      job,
      marriedStatus,
      address,
    };

    DocTemplate("skd", "Surat_Keterangan_Domisili", value);

    res.redirect("/download?filename=Surat_Keterangan_Domisili");
  } catch (err) {
    console.log(err);
  }
};
