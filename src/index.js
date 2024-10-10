/* this file is called index.js because webpack which is the module bundler in this project expects the entry point to be called index.js */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/* here we have an array of objects where each object is one pizza and to render this as a list we will take this array and for each of these pizza objects we want to automatically create one pizza component in the UI */
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

/* creating a component called 'App' and it is called App as it is a convention */
function App() {
  return (
    /* we can directly add these components to the root div and not add a div container to root by using react fragments */
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px" };
  // style = {style}
  return (
    <header className="header">
      <h1>Pizza Palette</h1>;
    </header>
  );
}

/* here we are gonna pass the data from this component to pizza component */
function Menu() {
  /* we only want to render this menu only when the data exists so we can do it in two ways but the advantage of using ternary is that then we can display some alternative text */
  const pizzas = pizzaData;
  // const pizzas = []; // empty array is still a truthy value
  const nunPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* JSX expressios must have one parent element as in the rules of JSX, a piece of JSX no matter where it is defined can only have one root element, and whenever we want to return two elements we wrap them in a div or other element but below we don't want to render just one element being parent of the two but two elements separately so we use react fragments which lets us group some elements without leaving any trace in the HTML tree (in the dom) */}
      {nunPizzas > 0 /* && */ ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzas.map((pizza) => (
              /* as each time we render a new list with map method each items that gets rendered needs a unique key property and key here is basically a prop that is internal to react which it needs in order for some performance optimizations */
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        /* null */
        <p>We are still working on our menu. Please come back later.</p>
      )}

      {/* instead of calling pizza component one by one manually we will now do it dynamically */}
      {/*<Pizza
        name="Pizza Spinaci" || {pizza.name}
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      /> */}
    </main>
  );
}

/* destructuring the props object and doing it this way we will immediately know which props the component receives and if we try to destructure a property that does not exist then it simply returns undefined */
function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null;

  return (
    /* setting text and classes conditionally */
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>${pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : `${pizzaObj.price}$`}</span>
      </div>
    </li>
  );
}

/* in react we write new components using functions, in react there are two important rules when we write components as functions, first the function name needs to start with uppercase letter and second the function needs to return some markup in the form of JSX but we can even return nothing by writing null, and each component can return only one element so we wrap our elements inside a div element */
function Footer() {
  // return React.createElement("footer", null, "We are currently open ");
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  /* the problem in this case is that we are no longer rendering the footer element around this p element so if we want to do the exact same thing we will have to write the footer element again, usually we use the third way when we want to render entire components conditionally but not just some pieces of JSX
  if (!isOpen) return <p>Closed</p>; */

  return (
    /* we want to render something in the footer only if the restaurant is open so we use conditional rendering with && operator */
    <footer className="footer">
      {isOpen /* && */ ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

/* as the above component was getting a little bit too big so we simply extract it into its own component */
function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We are open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

/* we select the element with the id root so react can render our application inside of this div */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /* we wrap the app inside strict mode because during development it will render all components twice in order to find certain bugs and check if we are using outdated parts of react API */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* when we say nesting components it means we call one component into another component and we should never nest a component declaration itself */

/* all assets of the app will go into the public folder because webpack will automatically get them from there */

/* we can each piece of the UI or components multiple times in the main component hence reusing them */

/* whenever we create a new project with create-react-app it will automatically set the project up as a github repo */

/* settings -> diff decorations -> none */

/* in the actual HTML rendered on browser we will no longer see the name of our components because once react renders everything into the dom it only renders the elements themselves like h1, div, and the dom doesn't know that the elements come from components */

/* here each component does not contain its own styles but simply uses the global styles that are in 'index.css' but later we will use styled components in which certain css will only belong to one single component */

/* props are essentially how we pass data between components and in particular from parent components to child components, to define props we do it in two steps, first we pass the props into the main component and then second we receive props in the component that we pass them into */

/* props are short for property and the order in which we pass in the props in completely irrelevant */

/* rendering lists is one of the most common things that we do in all react apps and it means when we have an array and we want to create one component for each element of the array */

/* we are gonna learn about three ways of rendering JSX or even an entire component based on a condtion, first one is and operator, second one is ternary operator and the third one is by using multiple returns */

/* we should use the ternary operator whenever we need to return some piece of JSX based on a condition */

/* as we know each time that we pass some props into a component then it will receive objects of props and actually all components receive the props objects even when we do not pass so they exist but are empty */

/* react fragment is a simple concept that allows us to have more than just one element inside a piece of JSX and sometimes we need to add a key to a react fragment when we use it to render a list then we have to write it in a slightly different way 
<React.Fragment key = ''></React.Fragment> */
