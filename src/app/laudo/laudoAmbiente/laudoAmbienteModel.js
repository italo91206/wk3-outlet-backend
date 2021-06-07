import {
  CredentialsExistenteException,
  DataNotFoundException,
} from '../../../utils/exceptions';
import path from 'path';
import { format } from 'util';
// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
  keyFilename: path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'storageGoogle.json'
  ),
  projectId: 'inspired-parsec-280622',
});

const coolFilesBucker = storage.bucket('lautec');

// const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
const connection = require('../../../database/connection');

export default {
  async insertLaudoAmbiente(req, next) {
    const body = { ...req.body };

    req.files.map(item => {
      const blob = coolFilesBucker.file(item.originalname);

      const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
      });

      blobStream.on('error', err => {
        next(err);
      });

      let publicUrl = '';

      blobStream.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP.
        publicUrl = format(
          `https://storage.cloud.google.com/${coolFilesBucker.name}/${blob.name}`
        );

        const localAmbiente = {
          laudo_id: body.laudoId,
          ambiente_id: body.ambienteId,
          planta_imagem: publicUrl,
        };

        await connection('laudos_ambientes')
          .returning('laudo_ambiente_id')
          .insert(localAmbiente);
      });

      blobStream.end(item.buffer);
    });

    return {
      success: true,
      message: 'Laudo Ambiente inserido com sucesso',
    };
  },
};
