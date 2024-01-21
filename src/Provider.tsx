import { useNavigate, useLocation } from "react-router-dom";
import InputMask from "react-input-mask";
import { useState } from "react";
import { message } from "antd";

const Provider: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validNumber, setValidNubmer] = useState<boolean>(true);
  const [money, setMoney] = useState("");
  const [validMoney, setValidMoney] = useState<boolean>(false);

  const { provider } = location.state;

  function navigateBack() {
    navigate(`/`)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(inputValue);
    if (inputValue.length == 11) {
      setValidNubmer(true);
    } else {
      setValidNubmer(false);
    }
  };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Удаление всех символов кроме цифр
    setMoney(inputValue);

    if (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 1000) {
      setValidMoney(true);
    } else {
      setValidMoney(false);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  function pay() {
    messageApi.open({
      type: 'loading',
      content: 'Переводим деньги...',
      duration: 0,
    });
    setTimeout(messageApi.destroy, 2000);
    setTimeout(random, 2000);
    
  };

  function random() {
    const numb = Math.random()
    if (numb > 0.5) {
      success()
      setTimeout(navigateBack, 1500);
    } else {
      error()
    }
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Успешно, платеж одобрен!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Ошибка, попробуйте еще раз',
    });
  };

  return (
    <div className="provider">
      <p>{provider.name}</p>
      <img src={provider.logo} alt="не загрузилось лого" />
      <div className={validNumber ? 'hidden' : 'notification'}>Введите номер полностью</div>
      <InputMask
        mask="+7 (999) 999-99-99"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="input prov"
      />
      <div className={validMoney ? 'hidden' : 'notification'}>Введите сумму от 1 до 1000 рублей</div>
      <InputMask
        mask="9999 руб"
        maskChar=" "
        value={money}
        onChange={handleMoneyChange}
        className="input prov"
      />
      <button className="btn prov" onClick={navigateBack}>Назад</button>
      <button className="btn prov" disabled={validMoney && validNumber ? false : true} onClick={pay}>
        Оплатить
      </button>
      {contextHolder}
    </div>
  );
};

export default Provider;
