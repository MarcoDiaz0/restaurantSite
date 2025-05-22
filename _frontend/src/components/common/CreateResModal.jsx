import { CiImageOn } from "react-icons/ci";
import Button from "./Button";
import { FileInput } from "./FileInput";
import Input from "./Input";
import { LocationButton } from "./LocationButton";
import { useNavigate } from "react-router-dom";
import { useCreateRestaurant } from "../../hooks/useRestaurant";
import { useState } from "react";
import { useModal } from "../../Store/modal";

const CreateResModal = () => {
  const navigate = useNavigate();
  const { setModal } = useModal();

  const [credentials, setCredentials] = useState({
    restaurantName: "",
    location: "",
    coverPicture: "",
  });
  const { CreateRestaurant, err } = useCreateRestaurant();
  const handleCreate = async () => {
    const credentialsCOPY = { ...credentials };
    const success = await CreateRestaurant(credentialsCOPY);
    if (success) {
      setModal();
      navigate("/restaurantHome/page");
    }
  };
  return (
    <div className="md:w-xl w-xs p-3 bg-light rounded-2xl">
      <div className=" overflow-hidden relative">
        <article className=" aboslute w-full aspect-4/2 object-cover flex justify-center items-center rounded-2xl ">
          {credentials.coverPicture ? (
            <img
              className="rounded-2xl"
              src={URL.createObjectURL(credentials.coverPicture)}
            />
          ) : (
            <FileInput
              type={"image/*"}
              title="Upload Your Cover Picture"
              icon={<CiImageOn className="inline-flex w-10 h-10 " />}
              className="border-dashed w-full h-full border-2 "
              onChange={(e) => {
                setCredentials({
                  ...credentials,
                  coverPicture: e.target.files[0],
                });
              }}
            />
          )}
        </article>

        <article className="flex flex-col md:flex-row items-center my-2 gap-1">
          <Input
            err={err}
            onChange={(e) =>
              setCredentials({ ...credentials, restaurantName: e.target.value })
            }
            value={credentials.restaurantName}
            placeholder={"Your Restaurant Name "}
          />
          <LocationButton
            credentials={credentials}
            setlocation={setCredentials}
            className="bg-dark text-light flex justify-center items-center w-full   hover:bg-prime duration-500 rounded-lg p-2 "
          />
        </article>
      </div>
      <div className="w-full flex justify-end">
        <Button
          onClick={handleCreate}
          className={" rounded-lg m-2 p-2 tracking-wider bg-prime"}
          disabled={
            credentials.restaurantName.length < 8 || !credentials.location
          }
        >
          Confirme
        </Button>
      </div>
    </div>
  );
};

export default CreateResModal;
