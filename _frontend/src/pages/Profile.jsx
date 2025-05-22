import axios from "axios";
import { authSlice } from "../Store/user";
import LOGO from "../images/LOGO dark.svg";
import { IoIosMail, IoMdKey } from "react-icons/io";
import Input from "../components/common/Input";
import { FaRegCircleUser, FaShop } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import { FileInput } from "../components/common/FileInput";
import { useAlert } from "../Store/Alert";
import { useUploadImage } from "../hooks/useImage";
import { CiImageOff } from "react-icons/ci";


const Profile = () => {
  const { Alert } = useAlert();
  const { uploadImage } = useUploadImage();
  const [err, setErr] = useState({ username: "", restaurantName: "" });
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    restaurantName: "",
    coverPicture: "",
  });
  const [Changes, setChanges] = useState(false);
  const getInfo = async (_id) => {
    try {
      const res = await axios.get(`/api/auth/getUser/${_id}`);
      setInfo(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const SaveChanges = async (_id) => {
    try {
      setErr({ username: "", restaurantName: "" });
      let imgURL = info.coverPicture;
      if (typeof imgURL != "string") imgURL = await uploadImage(imgURL);
      const res = await axios.put("/api/auth/update", {
        ...info,
        coverPicture: imgURL,
        _id,
      });
      Alert(res.data.message, res.data.success);
      setChanges(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403)
        setErr({ username: "this username already exist", restaurantName: "" });
      if (error.response.status === 406)
        setErr({
          username: "",
          restaurantName: "this restaurant name already exist",
        });
    }
  };
  useEffect(() => {
    if (_id) {
      getInfo(_id);
    }
  }, [_id]);
  return (
    <div className="md:w-7/10 min-h-[70vh] mx-auto py-2 ">
      <div className="flex-col-reverse flex  sm:flex-row rounded-2xl p-2 ">
        <div className="flex md:w-1/2  flex-col gap-3  ">
          <Input
            onChange={(e) => {
              setInfo((ls) => ({ ...ls, email: e.target.value }));
              setChanges(true);
            }}
            value={info.email}
            title={"Email"}
            icon={<IoIosMail />}
            disabled={true}
          />
          <Input
            onChange={(e) => {
              setInfo((ls) => ({ ...ls, username: e.target.value }));
              setChanges(true);
            }}
            err={err.username}
            value={info.username}
            title={"Username"}
            icon={<FaRegCircleUser />}
          />

          <Input
            onChange={(e) => {
              setInfo((ls) => ({ ...ls, password: e.target.value }));
              setChanges(true);
            }}
            value={info.password}
            title={"Password"}
            type="password"
            icon={<IoMdKey />}
          />
          {isOwner && info.restaurantName && (
            <Input
              onChange={(e) => {
                setInfo((ls) => ({ ...ls, restaurantName: e.target.value }));
                setChanges(true);
              }}
              err={err.restaurantName}
              value={info.restaurantName}
              title={"Restaurant Name"}
              icon={<FaShop />}
            />
          )}
        </div>
        {isOwner ? (
          <div className="w-1/2 flex flex-col gap-1 items-center justify-center">
            {info.coverPicture ? (
              <img
                src={
                  typeof info.coverPicture == "string"
                    ? info.coverPicture
                    : URL.createObjectURL(info.coverPicture)
                }
                className=" w-10/11 rounded-lg "
              />
            ) : (
              <CiImageOff className=" w-9/10 h-full rounded-lg " />
            )}
            <FileInput
              type={"image/*"}
              title="Upload New Picture"
              className="border w-10/11 duration-300 rounded-lg p-3 hover:bg-dark hover:text-light"
              onChange={(e) => {
                setChanges(true);
                setInfo({
                  ...info,
                  coverPicture: e.target.files[0],
                });
              }}
            />
          </div>
        ) : (
          <div className="flex items-center m-auto gap-0 ">
            <img src={LOGO} className="h-12 w-12 mx-2 " />
            <h1
              style={{ fontFamily: "Signika Negative" }}
              className="text-2xl flex flex-col  text-center font-bold "
            >
              <span className="text-prime">NEARBY</span>
              <p>FOOOD.</p>
            </h1>
          </div>
        )}
      </div>

      <Button
        disabled={!Changes}
        onClick={() => SaveChanges(_id)}
        className="fixed right-10 bottom-20 bg-prime p-3 rounded-2xl hover:scale-[110%] border-light border-2 hover:bg-dark text-light"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default Profile;
