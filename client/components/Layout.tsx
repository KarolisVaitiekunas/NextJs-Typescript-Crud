import { IUser } from "../interfaces";
import { Dispatch, SetStateAction } from "react";
import Navbar from "./Navbar";

interface IProps {
  children?: JSX.Element | JSX.Element[]; //single jsx element | multiple jsx elements
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}
function Layout({ children, user, setUser }: IProps) {
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {children}
    </div>
  );
}

export default Layout;
