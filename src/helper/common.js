// @ts-nocheck
import Service from "./../services/request";
import api from "../constants/api";
import queryString from "query-string";
import REGEX from "../constants/regex";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

export const getQueryString = (query) => {
  const result = queryString.stringify(query);

  if (!result) return "";
  return `?${result}`;
};

export const debounced = (delay, fn) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};
export const getMoneyByLang = (lang) => {
  let money;
  if (lang == "vn") {
    money = "VND";
  } else if (lang == "jp") {
    money = "円";
  } else {
    money = "$";
  }
  return money;
};
export const capitalizeFirstLetter = (stringText) => {
  return stringText.charAt(0).toUpperCase() + stringText.slice(1);
};

export const getParameterByName = (name, url) => {
  if (!url) url = "";
  // eslint-disable-next-line
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const isEquivalent = (a, b) => {
  // Create arrays of property names
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  // If we made it this far, objects
  // are considered equivalent
  return true;
};

export const xoa_dau = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

export const number_to_price = (v) => {
  if (v === 0) {
    return "0";
  }

  if (!v || v === "") {
    return v;
  }
  v = v.toString();

  v = v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  v = v.split(",").join("*").split(".").join(",").split("*").join(".");
  return v;
};

export const price_to_number = (v) => {
  if (!v) {
    return 0;
  }
  v = v.split(",").join("");
  v = v.split(".").join(",");

  return Number(v);
};

export function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePass(pass) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  return passw.test(pass);
}

export function validateNumberPhone(number) {
  let c1 = number.substring(0, 4);
  if (c1 === "+855") {
    return true;
  }
  c1 = number.substring(0, 3);
  return c1 === "+60" || c1 === "+84";
}

export function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
export function convertFileToBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () =>
      resolve(new Blob([reader.result], { type: file.type }));
    reader.onerror = reject;
  });
}
export function convertBase64ToFile(dataurl) {
  return new Promise((resolve, reject) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new File([u8arr], { type: mime }));
  });
}
export async function uploadImage(data, fileImage) {
  if (fileImage?.size > 40485760) {
    toast.error(<FormattedMessage id="Maximum image size is only 40MB" />);
    return null;
  }

  return await Service.send({
    method: api.UPLOAD_IMAGE.method,
    path: api.UPLOAD_IMAGE.path,
    data,
  });
}

export async function uploadVideo(data, fileImage) {
  // if (fileImage?.size > 400485760) {
  //   toast.error(<FormattedMessage id="Maximum image size is only 400MB" />);
  //   return null;
  // }

  return await Service.send({
    method: api.UPLOAD_IMAGE.method,
    path: api.UPLOAD_IMAGE.path,
    data,
  });
}

export async function uploadVideoChunk(
  chunk,
  chunkIndex,
  totalChunks,
  uuId,
  type
) {
  const formData = new FormData();
  formData.append("chunk", chunk);
  formData.append("chunkIndex", chunkIndex);
  formData.append("totalChunks", totalChunks);
  formData.append("uuId", uuId);
  formData.append("type", type);

  try {
    return await Service.send({
      method: api.UPLOAD_VIDEO_CHUNK.method,
      path: api.UPLOAD_VIDEO_CHUNK.path,
      data: formData,
    });
  } catch (error) {
    console.error(error);
  }
}

export function formatPhone(value) {
  if (value?.charAt(0) == "+") {
    return value?.substring(1, value?.length);
  }
  return value;
}
export function formatRole(value) {
  if (value == "MANAGE_SYSTEM") {
    return "Management System";
  } else if (value == "MANAGE_USER") {
    return "User";
  } else if (value == "MANAGE_STAFF") {
    return "Staff";
  }
  return "Product";
}

export function validateEditor(product_description) {
  const check =
    product_description && REGEX.CHECK_SPACE_EDITOR?.test(product_description);
  const checkFullSpace = product_description
    ?.split("<p></p>\n")
    ?.find((item) => {
      return item != "";
    });
  if (check || !checkFullSpace) {
    return true;
  }
  if (
    product_description == " " ||
    (product_description == null) | (product_description == undefined)
  ) {
    return true;
  }
  return false;
}
