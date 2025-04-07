
import Checkbox from "../common/Checkbox";
import { useFiltersStore } from "../../Store/filters";


const Filters = () => {
    const foodType = ["All", "Plate", "Fastfood", "Drink", "Dessert"];
    const Categorie = {
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
        "Intermittent Fasting"
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
        "FODMAP-Friendly"
      ],
      Diseases: [
        "Diabetes-Friendly",
        "Heart-Healthy",
        "Hypertension-Friendly",
        "Kidney-Friendly",
        "Low-Cholesterol",
        "Low-Purine",
        "Celiac-Friendly",
        "Gastrointestinal-Friendly"],
    };
    const { filters, setFilter } = useFiltersStore();

    return (
      <div>
        <div className="flex w-full flex-col gap-1">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Food Type</h2>
            {foodType.map((type) => (
             <div key={type} className="flex items-center space-x-2">
              <Checkbox
                key={type}
                check={type === "All" ? filters.foodType.length === foodType.length : filters.foodType.includes(type)}
                onCheck={(isChecked) => {
                  let updatedFoodTypes = [...filters.foodType];
  
                  if (type === "All") {
                    updatedFoodTypes = isChecked ? [...foodType] : [];
                  } else {
                    if (isChecked) {
                      updatedFoodTypes.push(type);
                    } else {
                      updatedFoodTypes = updatedFoodTypes.filter((item) => item !== type);
                    }
  
                    if (updatedFoodTypes.length !== foodType.length) {
                      updatedFoodTypes = updatedFoodTypes.filter((item) => item !== "All");
                    }
  
                    if (updatedFoodTypes.length === foodType.length - 1 && !updatedFoodTypes.includes("All")) {
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
  
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            {Object.keys(Categorie).map((category) => (
              <div key={category} className="mb-2">
                <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  check={filters.categorie?.includes(category) || false}
                  onCheck={(isChecked) => {
                    if (isChecked) {
                      setFilter("categorie", [...filters.categorie, category]);
                      if (!filters[category] || filters[category].length === 0) {
                        setFilter(category, [Categorie[category][0]]);
                      }
                    } else {
                      setFilter("categorie", filters.categorie?.filter((c) => c !== category) || []);
                      setFilter(category, []);
                    }
                  }}
                  text={category}
                />
                </div>
  
                {filters.categorie?.includes(category) && (
                  <div className="grid md:grid-cols-2 gap-2 ml-4 mt-3 mb-6">
                    {Categorie[category].map((subCategory) => (
                     <div key={subCategory} className="flex items-center space-x-2 min-w-full">
                      <Checkbox
                        key={subCategory}
                        check={filters[category]?.includes(subCategory) || false}
                        onCheck={(isChecked) => {
                          let updatedSubCategories = filters[category] || [];
                          if (isChecked) {
                            updatedSubCategories = [...updatedSubCategories, subCategory];
                          } else {
                            updatedSubCategories = updatedSubCategories.filter((item) => item !== subCategory);
                            if (updatedSubCategories.length === 0) {
                              alert(`You must select at least one ${category}.`);
                              return;
                            }
                          }
                          setFilter(category, updatedSubCategories);
                        }}
                        
                      />
                      <span className="text-left text-sm whitespace-normal">{subCategory}</span>
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
}

export default Filters
