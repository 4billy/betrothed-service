const mongoose = require('mongoose');
const states = require('./us_states');

const eventSchema = new mongoose.Schema(
  {
    coupleName1: {
      type: String,
      required: true,
    },
    coupleName2: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: states,
    },
    zip: {
      type: String,
      required: true,
      match: /^[0-9]{5}(?:-[0-9]{4})?$/,
    },
    guestLimit: {
      type: Number,
      require: false,
    },
    rsvpDeadline: {
      type: Date,
      required: true,
    },
    inviteMessage: {
      type: String,
      required: true,
    },
    dashboardPhotoURL: {
      type: String,
      required: false,
      match:
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    },
    bannerPhotoURL: {
      type: String,
      required: false,
      match:
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    },
    galleryPhotos: {
      type: Map,
      of: {
        type: String,
        match:
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
      },
      required: false,
      default: {},
    },
    colors: {
      type: Map,
      of: { type: String, match: /^#([0-9a-f]{6}|[0-9a-f]{3})$/i },
      required: false,
      default: {},
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, id: false }
);

eventSchema.virtual('guests', {
  ref: 'Guest',
  localField: '_id',
  foreignField: 'event',
});

eventSchema.virtual('gifts', {
  ref: 'Gift',
  localField: '_id',
  foreignField: 'event',
});

module.exports.Event = mongoose.model('Event', eventSchema);
