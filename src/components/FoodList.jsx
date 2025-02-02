import "../App.css";
import foodsJson from "../foods.json";
import FoodBox from "../components/FoodBox";
import { useState } from "react";
import AddFoodForm from "../components/AddFoodForm";
import { Row, Divider, Card, Button } from "antd";
import Search from "../components/Search";

function FoodList() {
  const [foods, setFoods] = useState(foodsJson); //original
  const [foodsArr, setFoodsArr] = useState(foods); // filtered ARRAY (For immutation)
  // console.log("Foods", foods);
  console.log("FoodsArr", foodsArr);

  const [showForm, setShowAddFoodForm] = useState(false); // show FORM or not

  // If you were to use only foodsArr and modify it directly for filtering or deleting,
  // you would lose the reference to the original data,
  // making it more challenging to reset or manage the data effectively.

  const deleteFood = (foodName) => { //id is wrong, since when adding a food, id value is NOT there!
    const filteredFoods = foods.filter((food) => {
      return food.id !== foodName;
    });

    const filteredFoodArr = foodsArr.filter((food) => {
      return food.id !== id;
    });

    setFoodsArr(filteredFoodArr);
    setFoods(filteredFoods);
    //both are updated (matched)
  };

  const addNewFood = (newFood) => {
    const updatedFoods = [...foods, newFood];

    setFoods(updatedFoods);
    setFoodsArr(updatedFoods);
  };

  // const toggleForm = () => {
  //   setShowAddFoodForm(!showForm);
  // };

  const searchFood = (str) => {
    let searchResult;
    console.log("search", { str });
    if (str === "") {
      searchResult = foods;
    } else {
      searchResult = foods.filter((food) => {
        return food.name.toLowerCase().includes(str.toLowerCase());
      });
    }

    setFoodsArr(searchResult);
  };

  return (
    <div className="FoodList">
      <Divider>Food List</Divider>
      <Search key="search-food" searchFood={searchFood} />
      <div className="Add Food">
        {/* {showForm ? (
          <Button type="primary" onClick={toggleForm}>
          Add New Food
        </Button>
         
        ) : (
          <Card>
          <AddFoodForm key="Add-Food" addNewFood={addNewFood} />
        </Card>
        )} */}

        {/* with Toggle, Added the hide the form button */}
        {/* <Button type="link" onClick={toggleForm}>
          {showForm ? "Hide the Form" : "Add New Food"}
        </Button> */}

        <Button onClick={() => setShowAddFoodForm(!showForm)}> {showForm ? "Hide the Form" : "Add the Food"} </Button>
        {showForm && (
          <Card>
            <AddFoodForm key="Add-Food" addNewFood={addNewFood} />
          </Card>
        )}
      </div>
      <Row style={{ width: "100%", justifyContent: "center" }}>
        {foodsArr.map((food) => {
          return (
            <>
              <FoodBox
                key={food.id}
                food={food} // const{food}=props (in FoodBox jsx)
                deleteFood={deleteFood}
                //IF you WANT...
                // name={food.name}
                // calories={food.calories}
                // servings={food.servings}
                //then, you need destructure the props in FoodBox jsx like this:
                // const { name, calories, servings } = props;
              />
            </>
          );
        })}
      </Row>
      {!foodsArr.length && <p> 🤪 Opps! No more content to show</p>}
    </div>
  );
}

export default FoodList;
