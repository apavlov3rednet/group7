import { useCallback, useState, useEffect } from "react";
import schema from "../../../../back/modules/fetchServer/schema/index.js";
import './style.css';

export default function Form({nameForm}) {
    const shemaForm = schema[nameForm];
}