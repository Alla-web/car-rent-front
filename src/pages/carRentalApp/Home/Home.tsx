import FilterByDatesForm from "components/FilterByDatesForm/FilterByDatesForm";
import Login from "components/Login/Login";
import CarComponent from "../../../components/CarComponent/CarComponent";
import CarList from "components/CarList/CarList";
import BookingComponent from "components/BookingComponent/BookingComponent"
import BookingForm from "components/BookingForm/BookingForm";

// test image remove later
//import CarImg from "assets/CarImages/corolla-exterieur.jpg"  


function Home() {

  //example car data. later object from Backend

  const cars = [
    {
      image: "/images/tesla-model-s.jpg",
      brand: "Tesla",
      model: "Model S",
      pricePerDay: 120,
      transmission: "Automatic",
      year: 2022,
      fuel: "Electric",
      onMoreDetails: () => console.log("More details about Tesla Model S"),
      onRent: () => console.log("Rent Tesla Model S"),
    },
    {
      image: "/images/bmw-3-series.jpg",
      brand: "BMW",
      model: "3 Series",
      pricePerDay: 90,
      transmission: "Automatic",
      year: 2021,
      fuel: "Petrol",
      onMoreDetails: () => console.log("More details about BMW 3 Series"),
      onRent: () => console.log("Rent BMW 3 Series"),
    },
    {
      image: "/images/mercedes-c-class.jpg",
      brand: "Mercedes-Benz",
      model: "C-Class",
      pricePerDay: 100,
      transmission: "Automatic",
      year: 2021,
      fuel: "Diesel",
      onMoreDetails: () => console.log("More details about Mercedes C-Class"),
      onRent: () => console.log("Rent Mercedes C-Class"),
    },
    {
      image: "/images/audi-a4.jpg",
      brand: "Audi",
      model: "A4",
      pricePerDay: 95,
      transmission: "Automatic",
      year: 2022,
      fuel: "Petrol",
      onMoreDetails: () => console.log("More details about Audi A4"),
      onRent: () => console.log("Rent Audi A4"),
    },
    {
      image: "/images/ford-mustang.jpg",
      brand: "Ford",
      model: "Mustang",
      pricePerDay: 150,
      transmission: "Manual",
      year: 2020,
      fuel: "Petrol",
      onMoreDetails: () => console.log("More details about Ford Mustang"),
      onRent: () => console.log("Rent Ford Mustang"),
    },
    {
      image: "/images/toyota-corolla.jpg",
      brand: "Toyota",
      model: "Corolla",
      pricePerDay: 70,
      transmission: "Automatic",
      year: 2023,
      fuel: "Hybrid",
      onMoreDetails: () => console.log("More details about Toyota Corolla"),
      onRent: () => console.log("Rent Toyota Corolla"),
    },
    {
      image: "/images/honda-civic.jpg",
      brand: "Honda",
      model: "Civic",
      pricePerDay: 80,
      transmission: "Manual",
      year: 2021,
      fuel: "Petrol",
      onMoreDetails: () => console.log("More details about Honda Civic"),
      onRent: () => console.log("Rent Honda Civic"),
    },
    {
      image: "/images/range-rover-evoque.jpg",
      brand: "Range Rover",
      model: "Evoque",
      pricePerDay: 130,
      transmission: "Automatic",
      year: 2022,
      fuel: "Diesel",
      onMoreDetails: () => console.log("More details about Range Rover Evoque"),
      onRent: () => console.log("Rent Range Rover Evoque"),
    },
  ];

  // const carData = {
  //   brand: "Toyota",
  //   model: "Corolla",
  //   year: 2021,
  //   type: "Sedan",
  //   fuelType: "Gasoline",
  //   transmissionType: "Automatic",
  //   carStatus: "Available",
  //   dayRentalPrice: 30,
  //   carImage: CarImg,
  // }




  return (
    <div className="container mx-auto px-4 py-8">
      <FilterByDatesForm />
      <CarList cars={cars} />

      {/* remove later test car data*/}
      {/* <CarComponent
        brand={carData.brand}
        model={carData.model}
        year={carData.year}
        type={carData.type}
        fuelType={carData.fuelType}
        transmissionType={carData.transmissionType}
        carStatus={carData.carStatus}
        dayRentalPrice={carData.dayRentalPrice}
        carImage={carData.carImage}
      /> */}
    </div>
  );
}

export default Home;
