const path = require('path');

const { DocTemplate } = require('../helper');

exports.getIndex = (_req, res) => {
  res.render('index', {
    render: 'main',
    documentName: '',
  });
};

exports.getForm = (req, res) => {
  const { type } = req.query;
  let render = '';
  const EJS = ['skj', 'sktm', 'skd'];
  EJS.forEach((e, i) => {
    if (i + 1 == type) {
      render = e;
    }
  });
  res.render('index', {
    render,
    documentName: '',
  });
};

exports.getDownload = (req, res) => {
  try {
    const { filename } = req.query;
    res.render('index', {
      render: 'download',
      documentName: filename,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getDownloadFile = (req, res) => {
  try {
    const { filename } = req.query;
    res.download(path.join(__dirname, '..', `public/doc/out/${filename}.docx`));
  } catch (err) {
    console.log(err);
  }
};

exports.postSKJ = (req, res) => {
  try {
    const {
      name,
      plate,
      amount,
      destination,
      lengths,
      width,
      height,
      nameOfGoods,
      vehicleType,
      description,
    } = req.body;

    DocTemplate('skj', 'Surat_Keterangan_Jalan', {
      nameOfGoods: nameOfGoods,
      size: `${width} x ${lengths} x ${height}`,
      amount,
      vehicle: vehicleType,
      license_plate: plate,
      destination,
      description,
      name: name,
    });

    res.redirect('/download?filename=Surat_Keterangan_Jalan');
  } catch (err) {
    console.log(err);
  }
};

exports.postSKTM = (req, res) => {
  try {
    const {
      nik,
      name,
      gender,
      placeOfBirth,
      dateOfBirth,
      citizen,
      religion,
      job,
      marriedStatus,
      address,
      purpose,
    } = req.body;

    DocTemplate('sktm', 'Surat_Keterangan_Tidak_Mampu', {
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
    });

    res.redirect('/download?filename=Surat_Keterangan_Tidak_Mampu');
  } catch (err) {
    console.log(err);
  }
};

exports.postSKD = (req, res) => {
  try {
    const {
      name,
      gender,
      placeOfBirth,
      dateOfBirth,
      citizen,
      religion,
      job,
      marriedStatus,
      address,
    } = req.body;

    DocTemplate('skd', 'Surat_Keterangan_Domisili', {
      name,
      gender,
      placeOfBirth,
      dateOfBirth,
      citizen,
      religion,
      job,
      marriedStatus,
      address,
    });

    res.redirect('/download?filename=Surat_Keterangan_Domisili');
  } catch (err) {
    console.log(err);
  }
};
