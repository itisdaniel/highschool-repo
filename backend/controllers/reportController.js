const ReportModel = require("../models/reportsModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/photos");
  },

  filename: function (req, file, cb) {
    const name = path
      .extname(file.originalname)
      .toLowerCase()
      .split(" ")
      .join("_");
    cb(null, Date.now() + name);
   
  },

});

//DONE
var upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
}).single("images");

// var multipleUpload = multer({ storage: storage }).array("files");

exports.createReport = async (req, res) => {

  upload(req, res, function (err) {

      console.log("Testttt", req.file);

    if (err) {
      console.log(err);
      res.json({ status: err.message });
    } else {

      const url = req.protocol + "://" + req.get("host");
      const newReport = new ReportModel({
        title: req.body.title,
        description: req.body.description,
        imageName: req.body.imageName,
        // images: {
        //     data: JSON.stringify(req.file),
        //     contentType: "image/png" || "image/jpeg" || "image/jpg",
        // },
        images : url + '/uploads/photos/' + req.file.filename,

        createdAt: Date.now(),
        postedBy: req.body.postedBy,
      });

      console.log("Test", newReport);

      newReport
        .save()
        .then(() =>
          res.json({
            status: "success",
            path: req.file,
            data: newReport,
          })  
        )
        .catch((err) => res.json({ status: "error", message: err.message }));
    }
  });
};

exports.getAll = async (req, res) => {
  ReportModel.find({}, (err, report) => {
    if(err) {
      return res.json({ status: "error", message: err.message });
    } else{ 
     return res.json({ status: "success", data: report });
    }  
  });

 
};
