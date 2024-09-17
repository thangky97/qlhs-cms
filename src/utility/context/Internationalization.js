import { createContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import messagesEn from "@assets/data/locales/en.json";
import messagesJp from "@assets/data/locales/jp.json";
import messagesVi from "@assets/data/locales/vi.json";
import userMessagesEn from "@src/assets/data/locales/en.json";
import userMessagesJp from "@src/assets/data/locales/jp.json";
import userMessagesVi from "@src/assets/data/locales/vi.json";
import { useDispatch } from "react-redux";
import { getLanguage } from "../../redux/actions/common";

const menuMessages = {
  en: { ...messagesEn, ...userMessagesEn },
  vn: { ...messagesVi, ...userMessagesVi },
  jp: { ...messagesJp, ...userMessagesJp },
};
const Context = createContext();
const IntlProviderWrapper = ({ children }) => {
  const [locale, setLocale] = useState("vn");
  const [messages, setMessages] = useState(menuMessages["vn"]);
  const dispatch = useDispatch();
  const switchLanguage = (lang) => {
    setLocale(lang);
    setMessages(menuMessages[lang]);
  };
  useEffect(() => {
    dispatch(getLanguage(locale));
  }, [locale]);
  useEffect(() => {
    setLocale(localStorage.getItem("language"));
  }, []);
  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export { IntlProviderWrapper, Context as IntlContext };
