import {Schema, model} from 'mongoose';

const CertificateSchema = new Schema({
    id: {
      // Certificate의 Id  
      type: String,
      required: true,
    },
    userId: {
        // 사용자의 Id
        type: String,
        required: true,
    },

    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    whenDate: {
        type: Date,
        required: true,
    }
});

const CertificateModel = model("Certificate", CertificateSchema);

export {CertificateModel};