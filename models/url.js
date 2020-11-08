const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Schema for the url collection
const urlSchema = new Schema({
    url: String,
    shortened_url: String
});

module.exports = mongoose.model("URL", urlSchema);