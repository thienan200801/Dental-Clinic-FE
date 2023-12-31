import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import SidebarAccountStyle from "./SidebarAccountStyle.css";
import { useStore, actions } from "../../store";
const cx = classNames.bind(SidebarAccountStyle);

function SidebarAccount({ handleCLick }) {
  const [state, dispath] = useStore();
  const [account, setaccount] = useState([]);
  const url = "http://localhost:3001/api/authentication/get-profile";
  const data = {
    username: state.userName,
  };
  const option = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  useEffect(() => {
    fetch(url, option)
      .then((response) => response.json())
      .then((account) => {
        setaccount(account.data);
      });
  }, []);
  return (
    <nav className={cx("sidebar-account")}>
      <ul className={cx("menu")}>
        <li className={cx("header-sidebar")}>
          <BsPersonCircle className={cx("avatar-sidebar")} />
          <span>{account.name}</span>
        </li>
        <li>
          <Link className={cx("option")} to="#">
            Thông tin tài khoản
          </Link>
        </li>
        <li>
          <Link className={cx("option")} to="#">
            Lịch sửa đặt lịch
          </Link>
        </li>
        <li>
          <Link className={cx("option")} to="/account/history-make-appointment">
            Lịch sử khám bệnh
          </Link>
        </li>
        <li onClick={handleCLick} className={cx("option")}>
          Đăng xuất <RiLogoutBoxRLine />
        </li>
      </ul>
    </nav>
  );
}
export default SidebarAccount;
