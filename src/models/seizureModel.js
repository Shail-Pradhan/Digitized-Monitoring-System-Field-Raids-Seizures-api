import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SeizureSchema = new Schema({
  // Contact information
  verifyingOfficerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  
  // Location details
  district: {
    type: String,
    required: true,
    enum: ['GANGTOK', 'PAKYONG', 'NAMCHI', 'SORENG', 'GYALSHING', 'MANGAN'] 
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  
  // Seizure information
  seizureDate: {
    type: Date,
    required: true
  },
  
  // Accused details
  nameOfAccused: {
    type: String,
    required: true,
    trim: true
  },
  exciseLicenseNo: {
    type: String,
    trim: true,
    required: true
  },
  detailsOfAccused: {
    type: String,
    required: true,
    trim: true
  },
  
  // Seizure details
  detailsOfSeizure: {
    type: String,
    required: true,
    trim: true
  },
  
  // Legal information
  actRulesGoverningTheSeizure: {
    type: String,
    required: true,
    enum: [
      'UNAUTHORISED SALE -SECTION 34(A) OF SIKKIM EXCISE ACT 1992',
      'DRY DAY VOILATION - SECTION 21 (A) OF SIKKIM EXCISE ACT 1992',
      'NO SALESMAN/ BARMAN- SECTION 20 OF SIKKIM EXCISE ACT 1992',
      'SALE TO UNDER AGE',
    ]
  },
  
  // Fine details
  fineImposed: {
    type: String,
    required: true,
    trim: true
  },
  bankReceiptDetails: {
    type: String,
    required: true,
    trim: true
  },
  bankReceiptDate: {
    type: Date,
    required: true
  },
  
  // Supporting documentation
seizureMemos: [
  {
    imageUrl: {
      type: String, // Local path or remote URL
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }
],


  // Additional comments
  remarks: {
    type: String,
    trim: true
  },
  
  // Acknowledgement 
  acknowledgement: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Seizure', SeizureSchema);