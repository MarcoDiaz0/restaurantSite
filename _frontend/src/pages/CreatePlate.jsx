import { useState } from "react";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import Checkbox from "../components/common/Checkbox";
import { FileInput } from "../components/common/FileInput";
import { CiImageOn } from "react-icons/ci";
import Input from "../components/common/Input";
import { IoMdPricetag } from "react-icons/io";
import { MdTitle } from "react-icons/md";
import { useCreatePlate } from "../hooks/usePlate";

export const CreatePlate = () => {
  const types = ["Plate", "Fastfood", "Drink", "Dessert"]; 
  const Categories = {
    Diets: [
      "Vegetarian",
      "Low-sodium",
      "Vegan",
      "Keto",
      "Paleo",
      "Mediterranean",
      "Low-Carb",
      "High-Protein",
      "Low-Fat",
      "Pescatarian",
      "Flexitarian",
      "Intermittent Fasting",
    ],
    Sensitivities: [
      "Gluten-Free",
      "Lactose-Free",
      "Nut-Free",
      "Soy-Free",
      "Egg-Free",
      "Shellfish-Free",
      "Sesame-Free",
      "Corn-Free",
      "Sulfite-Free",
      "FODMAP-Friendly",
    ],
    Diseases: [
      "Diabetes-Friendly",
      "Heart-Healthy",
      "Hypertension-Friendly",
      "Kidney-Friendly",
      "Low-Cholesterol",
      "Low-Purine",
      "Celiac-Friendly",
      "Gastrointestinal-Friendly",
    ],
  };

  const [plate, setPlate] = useState({
    name: "",
    description: "",
    picture: "",
    price: "",
    type: "Plate",
    category: {},
  });

  const { createPlate } = useCreatePlate();
  const handleAddPlate = () => {
    createPlate(plate);
  };
  return (
    <div className="w-full min-h-[80vh] flex  flex-col-reverse md:flex-row ">
      <article className="bg-dark/80 p-3 text-light md:w-1/3 w-full overflow-scroll ">
        <h1 className="m-auto text-3xl">Create Plate</h1>
        <Select
          options={types}
          value={plate.type}
          title="Type"
          id="type"
          onchange={(value) => setPlate({ ...plate, type: value })}
        />

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          {Object.keys(Categories).map((category) => (
            <div key={category} className="mb-2">
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  check={category in plate.category}
                  onCheck={(isChecked) => {
                    if (isChecked) {
                      setPlate({
                        ...plate,
                        category: {
                          ...plate.category,
                          [category]: [Categories[category][0]],
                        },
                      });
                    } else {
                      setPlate({
                        ...plate,
                        category: Object.fromEntries(
                          Object.entries(plate.category).filter(
                            (k) => k[0] != category
                          )
                        ),
                      });
                    }
                  }}
                  text={category}
                />
              </div>

              {category in plate.category && (
                <div className="grid md:grid-cols-2 gap-2 ml-4 mt-3 mb-6">
                  {Categories[category].map((healthCondition) => (
                    <div
                      key={healthCondition}
                      className="flex items-center space-x-2 min-w-full"
                    >
                      <Checkbox
                        key={healthCondition}
                        check={Object.keys(plate.category).find((key) =>
                          plate.category[key].includes(healthCondition)
                        )}
                        onCheck={(isChecked) => {
                          let updatedHealthCondition = [
                            ...plate.category[category],
                          ];
                          if (isChecked) {
                            updatedHealthCondition = [
                              ...plate.category[category],
                              healthCondition,
                            ];
                          } else {
                            updatedHealthCondition =
                              updatedHealthCondition.filter(
                                (item) => item !== healthCondition
                              );
                            if (plate.category[category].length == 1) {
                              alert(
                                `You must select at least one ${category}.`
                              );
                              return;
                            }
                          }
                          setPlate({
                            ...plate,
                            category: {
                              ...plate.category,
                              [category]: updatedHealthCondition,
                            },
                          });
                        }}
                      />
                      <span className="text-left text-sm whitespace-normal">
                        {healthCondition}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
      <div className="cursor-pointer flex flex-col lg:flex-row  justify-center gap-3 p-3">
        {plate.picture instanceof Blob ? (
          <img
            className="rounded-2xl w-96 h-96 border aspect-square"
            src={URL.createObjectURL(plate.picture)}
          />
        ) : (
          <FileInput
            type={"image/*"}
            title="Upload Your Cover Picture"
            icon={<CiImageOn className="inline-flex w-10 h-10 " />}
            className="border-dashed w-96 h-96 border-2 rounded-2xl "
            onChange={(e) => {
              setPlate({
                ...plate,
                picture: e.target.files[0],
              });
            }}
          />
        )}

        <div className="flex flex-col gap-3 h-96">
          <Input
            className="!w-96"
            icon={<MdTitle />}
            placeholder={"Name"}
            value={plate.name}
            onChange={(e) =>
              setPlate((ls) => ({ ...ls, name: e.target.value }))
            }
          />
          <Input
            type="number"
            className="!w-96"
            icon={<IoMdPricetag />}
            placeholder={"Price"}
            value={plate.price}
            onChange={(e) =>
              setPlate((ls) => ({ ...ls, price: e.target.value }))
            }
          />
          <label htmlFor="description">description</label>
          <textarea
            value={plate.description}
            onChange={(e) =>
              setPlate((ls) => ({ ...ls, description: e.target.value }))
            }
            name="description"
            id="description"
            className={` w-96 p-3 border rounded-lg grow tracking-wider bg-transparent placeholder:tracking-widest placeholder:text-dark/50 outline-none text-dark`}
          />
        </div>
      </div>

      <Button
        onClick={handleAddPlate}
        className="fixed right-15 bottom-15 bg-prime p-3 rounded-2xl hover:scale-[110%] border-light border-2 hover:bg-dark text-light"
      >
        Add Plate
      </Button>
    </div>
  );
};
