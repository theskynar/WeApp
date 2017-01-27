const mkdirp = require('mkdirp-promise');
const  multer  = require('multer');
const path = require('path');
const _ = require('underscore');

let obj = {};
let storage, upload;
let counter = 1;

module.exports = (fileSizeLimitMB, maxFiles) => {
  obj.uploadFiles = (type, crypto, name) => {
    upload = multer({
      storage : multer.diskStorage({
            destination: function(req, file, cb) {
              mkdirp(`public/uploads/${new Date().getFullYear()}/${type}/${name}/${crypto}/${new Date().getFullYear()}`).then(dirCreated => {
                if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
                  cb(null, `public/uploads/${new Date().getFullYear()}/${type}/${name}/${crypto}/${new Date().getFullYear()}`);
                return false;
              }).catch(err => {
                console.err(err);
                throw new Error("Houve um erro ao criar um caminho para este arquivo.");
              })
            },
            filename: function(req, file, cb) {
              if(file.fieldname === 'images') {
                cb(null, `${name}-${counter}${path.extname(file.originalname)}`);
                counter++;
              }
              return false;
            }
      }),
      limits: { fileSize: fileSizeLimitMB },
      fileFilter: function (req, file, cb) {
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) return cb(null, true);
        cb("Extensões de arquivos válidas: " + filetypes);
    }
    }).fields([
      {name:'images', maxCount: maxFiles}
    ]);
    return upload;
  }
  return obj;
}



/*module.exports = (app, db, _, io) => {

  api.create = (req, res) => {
    upload(req, res, function(err) {
      if(err || Object.keys(req.files).length <= 0) {
        err = err || 'O upload de arquivos é obrigatório. Nenhum arquivo encontrado em request.files ou dados do curso em request.body.'
        return res.status(400).send({Erro: err});
      }
      if(Object.keys(req.files).length > 0 && Object.keys(req.body).length > 0) {
        db.curso.findOne({
          where: {
            edicao: req.body.edicao
          }
        }).then(curso => {
          if(!!curso) {
            return curso.updateAttributes({
              qtd_fotos: req.files.fotos.length
            }).then(cursoAtualizado => {
                return res.status(200).send({Files: req.files, body: req.body});
            }).catch(err => {
                return res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors})
            })
          }
        })
      }
    })
  }*/
