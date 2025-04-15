import { CiImageOn } from "react-icons/ci";
import Input from "../common/Input.jsx";
import Button from "../common/Button";
import { useState } from "react";
import {
  useCreateRestaurant,
  useGetRestaurant,
} from "../../hooks/useRestaurant.jsx";
import { FileInput } from "../common/FileInput.jsx";
import { LocationButton } from "../common/LocationButton.jsx";
import { useModal } from "../../Store/modal.js";
export const CreateRestaurant = () => {
  const btnclass = " rounded-lg m-2 p-2 tracking-wider bg-prime";
  const { getRestaurantData } = useGetRestaurant();

  const [credentials, setCredentials] = useState({
    restaurantName: "",
    location: "",
    coverPicture: "",
  });
  const { setModal } = useModal();

  const { CreateRestaurant, err } = useCreateRestaurant();
  const handleCreate = async () => {
    const credentialsCOPY = {...credentials}
    const success = await CreateRestaurant(credentialsCOPY);
    if (success) setModal();
    getRestaurantData();
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
            title={"Restaurant Location"}
            setState={setCredentials}
            className="bg-dark text-light flex justify-center items-center w-full   hover:bg-prime duration-500 rounded-lg p-2 "
          />
        </article>
      </div>
      <div className="w-full flex justify-end">
        <Button
          onClick={handleCreate}
          className={btnclass}
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
