import React, { Component, useState, useEffect } from "react";

//function to adjust tempo based on X sessions of practice
function TempoAlgorithm(start, end, sessions){
    var diff = end - start;
    var subdivide = diff / sessions;
    var rounded=0;

    if (subdivide > 0) {
        rounded = Math.ceil(subdivide/4.0) * 4;
        return("Increase tempo by ", rounded, " until goal tempo is reached.");
    } else {
        return("Invalid tempo selections.");
    }
}