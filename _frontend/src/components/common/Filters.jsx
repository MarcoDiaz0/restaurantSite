import Checkbox from "../common/Checkbox";
import { useFiltersStore } from "../../Store/filters";

const Filters = () => {
  const foodType = ["Plate", "Fastfood", "Drink", "Dessert", "All"];
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
  const { filters, setFilter } = useFiltersStore();

  return (
    <div>
      <div className="flex w-full flex-col gap-1">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Food Type</h2>
          <div>
            {foodType.map((type) => (
              <div key={type}>
                <Checkbox
                  check={
                    type === "All"
                      ? filters.foodType.length === foodType.length
                      : filters.foodType.includes(type)
                  }
                  onCheck={(isChecked) => {
                    let updatedFoodTypes = [...filters.foodType];

                    if (type === "All") {
                      updatedFoodTypes = isChecked ? [...foodType] : [];
                    } else {
                      if (isChecked) {
                        updatedFoodTypes.push(type);
                      } else {
                        updatedFoodTypes = updatedFoodTypes.filter(
                          (item) => item !== type
                        );
                      }

                      if (updatedFoodTypes.length !== foodType.length) {
                        updatedFoodTypes = updatedFoodTypes.filter(
                          (item) => item !== "All"
                        );
                      }

                      if (
                        updatedFoodTypes.length === foodType.length - 1 &&
                        !updatedFoodTypes.includes("All")
                      ) {
                        updatedFoodTypes.push("All");
                      }
                    }
                    setFilter("foodType", updatedFoodTypes);
                  }}
                  text={type}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          {Object.keys(Categories).map((category) => (
            <div key={category} className="mb-2">
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  check={category in filters.category}
                  onCheck={(isChecked) => {
                    if (isChecked) {
                      setFilter("category", {
                        ...filters.category,
                        [category]: [Categories[category][0]],
                      });
                    } else {
                      setFilter(
                        "category",
                        Object.fromEntries(
                          Object.entries(filters.category).filter(
                            (k) => k[0] != category
                          )
                        )
                      );
                    }
                  }}
                  text={category}
                />
              </div>

              {category in filters.category && (
                <div className="grid md:grid-cols-2 gap-2 ml-4 mt-3 mb-6">
                  {Categories[category].map((healthCondition) => (
                    <div
                      key={healthCondition}
                      className="flex items-center space-x-2 min-w-full"
                    >
                      <Checkbox
                        key={healthCondition}
                        check={Object.keys(filters.category).find((key) =>
                          filters.category[key].includes(healthCondition)
                        )}
                        onCheck={(isChecked) => {
                          let updatedHealthCondition = [
                            ...filters.category[category],
                          ];
                          if (isChecked) {
                            updatedHealthCondition = [
                              ...filters.category[category],
                              healthCondition,
                            ];
                          } else {
                            updatedHealthCondition =
                              updatedHealthCondition.filter(
                                (item) => item !== healthCondition
                              );
                            if (filters.category[category].length == 1) {
                              alert(
                                `You must select at least one ${category}.`
                              );
                              return;
                            }
                          }
                          setFilter("category", {
                            ...filters.category,
                            [category]: updatedHealthCondition,
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
      </div>
    </div>
  );
};

export default Filters;
