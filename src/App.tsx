import './App.scss'
import { Home } from "./pages/Home";
import { Footer } from "./layout/Footer";
import { Header } from './layout/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="body-content">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
