import multer from 'multer';

module.exports = {
  storage: multer.memoryStorage(),
  limits: {
    // Determinar o tamanho dos arquivos, quantos uploads pode ser feito
    fileSize: 7 * 1024 * 1024, // determinou 6 mb de tamanho
  },
  fileFilter: (req, file, cb) => {
    // filtra upload de arquivos .. cb seria callback
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de imagem invalida.'));
    }
  },
};
