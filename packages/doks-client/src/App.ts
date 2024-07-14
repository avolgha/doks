import DrawSpinner from "./components/DrawSpinner";
import DrawApp from "./components/DrawApp";

export default async function App(root: HTMLDivElement) {
  const disableSpinner = DrawSpinner(root, (element) => {
    element.classList.add("main-spinner");
  });

  DrawApp(root);

  disableSpinner();
}
