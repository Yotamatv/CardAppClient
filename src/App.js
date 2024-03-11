import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Layout from "./layout/Layout";
import Router from "./routes/Router";

import ThemeProvider from "./providers/ThemeProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import UserProvider from "./users/providers/UserProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <SnackbarProvider>
          <ThemeProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
