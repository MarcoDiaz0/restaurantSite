import { useState } from "react";
import Button from "../common/Button";
import { useModal } from "../../Store/modal";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";
import { authSlice } from "../../Store/user";
import { usePassRecover } from "../../hooks/useAuth";

function RecoverPassModal() {
  const [Email, setEmail] = useState("");
  const { setModal } = useModal();
  const { isOwner, setOwner } = authSlice();
  const { GetPass } = usePassRecover();

  const HandleChange = (e) => {
    setEmail(e.target.value);
  };

  const HandleConfirmation = () => {
    GetPass(Email);
    setModal();
  };GetPass;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg">We will Send You A New Password Via Email</h1>
      <Input
        placeholder="Enter Your Email"
        value={Email}
        onChange={HandleChange}
      />
      <Checkbox
        check={isOwner}
        onCheck={setOwner}
        text="I am a Restaurant Owner"
      />
      <Button onClick={HandleConfirmation} className="p-2 bg-prime rounded-lg">
        Receive New Password
      </Button>
    </div>
  );
}

export default RecoverPassModal;
