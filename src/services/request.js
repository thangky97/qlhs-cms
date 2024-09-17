// @ts-nocheck
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { getQueryString } from "../helper/common";
import { FORMAT_ERROR } from "./../constants/status";
import HOST from "./../constants/url";

function send({
  method = "get",
  path,
  data = null,
  query = null,
  headers = {},
  newUrl,
}) {
  return new Promise((resolve, reject) => {
    let url = HOST + `${path}${getQueryString(query)}`;

    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`;
    }
    let token = window.localStorage.getItem("accessToken");
    if (token) {
      const newToken = token.replace(/"/g, "");
      headers.Authorization = `Bearer ${newToken}`;
    }
    axios({
      method,
      url,
      data,
      headers,
    })
      .then((result) => {
        const data = result.data;
        return resolve(data);
      })
      .catch((error) => {
        const { response = {} } = error;
        const result = response.data ? response.data : null;
        if (result) {
          const { statusCode, message } = result;

          if (statusCode === 500) {
            toast.warn(
              <FormattedMessage
                id={FORMAT_ERROR?.[result?.error] || result?.message}
              />
            );
            if (result?.error == "NOT_ALLOWED") {
              setTimeout(() => {
                window.localStorage.clear();
                window.location.href = "/";
              }, 2000);
            }
            return reject(result);
          }
          if (statusCode === 505 || statusCode === 401 || statusCode === 403) {
            window.localStorage.clear();
            window.location.href = "/";
          } else if (statusCode == 400) {
            return reject(result);
          } else {
            return resolve(result.data);
          }
        }
      });
  });
}
export default {
  send,
};
