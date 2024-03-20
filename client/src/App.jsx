import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Layout from "./components/Layout"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import PrivateRoutes from "./components/PrivateRoutes"
import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import Search from "./pages/Search"
import About from "./pages/About"



function App() {

  return (

    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/listing/:listingId" element={<Listing />} />
              <Route element={<PrivateRoutes />} >
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/update-listing/:listingId" element={<UpdateListing />} />
              </Route>
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App
